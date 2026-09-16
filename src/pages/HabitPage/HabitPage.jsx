import { useEffect, useState } from 'react';
import { getStudyDetail } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import {
  getHabits,
  createHabits,
  updateHabits,
  deleteHabits,
  toggleHabitRecord,
} from '@/api/habitApi';
import HabitForm from './components/habitForm/HabitInput';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import CardContainer from '@/components/cardContainer/CardContainer';
import styles from './HabitPage.module.css';
import HabitList from './components/habitForm/HabitList';
import { showToast } from '@/utils/showToast';
import { useParams, useBlocker } from 'react-router';

function HabitPage() {
  const { studyId } = useParams();

  const timeNow = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .split(' ')[0];

  const [isCheckMode, setIsCheckMode] = useState(true);
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [initialHabits, setInitialHabits] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isDirty = JSON.stringify(habits) !== JSON.stringify(initialHabits);
  const blocker = useBlocker(isDirty);

  const fetchStudyData = async () => {
    try {
      const studyData = await getStudyDetail(studyId);

      setStudy(studyData);
    } catch (error) {
      console.error('스터디 상세 정보 불러오기 오류:', error);
    }
  };

  const fetchHabitsData = async () => {
    try {
      setIsLoading(true);
      const response = await getHabits(studyId);
      const habitList = Array.isArray(response)
        ? response
        : response.data || response.habits || response.list || [];

      const normalizedHabits = habitList.map((h) => ({
        ...h,
        isCompleted: h.isCompleted ?? h.isComplete ?? false,
      }));

      setHabits(normalizedHabits);
      setInitialHabits(normalizedHabits);
    } catch (error) {
      console.error('습관 목록 불러오기 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabitsData();
  }, [studyId]);

  useEffect(() => {
    fetchStudyData();
  }, [studyId]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const shouldLeave = window.confirm(
        '저장하지 않은 변경사항이 있습니다.\n페이지를 이동하시겠습니까?',
      );

      if (shouldLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isDirty) return;

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  // 엔터 입력 시 화면에만 임시로 추가 (통신X)
  const handleAddTempHabit = (habitTitle) => {
    const trimmedTitle = habitTitle.trim();

    const isDuplicate = habits.some(
      (h) => !h.isDeleted && h.title.trim() === trimmedTitle,
    );

    if (isDuplicate) {
      showToast('이미 존재하는 습관입니다.', 'warning');
      return;
    }

    const newTempHabit = {
      id: `temp-${Date.now()}`,
      title: habitTitle,
      isCompleted: false,
      isTemp: true, // 임시 생성 항목 플래그
    };
    setHabits((prev) => [...prev, newTempHabit]);
  };

  const handleUpdateHabit = (id, newTitle) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== id) return habit;
        if (habit.isTemp) {
          return { ...habit, title: newTitle };
        }
        const isTitleChanged = habit.title !== newTitle;

        return {
          ...habit,
          title: newTitle,
          isUpdated: isTitleChanged ? true : habit.isUpdated,
          isCompleted: isTitleChanged ? false : habit.isCompleted,
        };
      }),
    );
  };

  //삭제 시 임시 항목은 배열 제거, 기존 DB항목은 isDeleted 플래그 추가
  const handleDeleteHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.reduce((acc, habit) => {
        if (habit.id === habitId) {
          if (habit.isTemp) return acc; // 임시 항목은 즉시 삭제
          return [...acc, { ...habit, isDeleted: true }]; // 기존 항목은 플래그만 설정
        }
        return [...acc, habit];
      }, []),
    );
  };

  const handleCheckHabit = async (habitId) => {
    const targetHabit = habits.find((h) => h.id === habitId);
    if (!targetHabit || targetHabit.isTemp) {
      showToast('목록 수정 완료 후 완료 체크가 가능합니다.', 'warning');
      return;
    }
    const nextIsCompleted = !targetHabit.isCompleted;

    const updateHabitState = (prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, isCompleted: nextIsCompleted }
          : habit,
      );

    setHabits(updateHabitState);
    setInitialHabits(updateHabitState);

    try {
      await toggleHabitRecord(studyId, habitId, timeNow);
    } catch (error) {
      console.error('습관 상태 변경 실패', error);
      alert('습관 상태 변경에 실패했습니다.');

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habitId
            ? { ...habit, isCompleted: !nextIsCompleted }
            : habit,
        ),
      );
    }
  };

  const handleForm = async () => {
    if (isSaving) return;
    if (!isCheckMode) {
      const createdHabits = habits.filter((h) => h.isTemp && !h.isDeleted);
      const updatedHabits = habits.filter((h) => h.isUpdated && !h.isDeleted);
      const deletedHabits = habits.filter((h) => h.isDeleted && !h.isTemp);

      const hasChanges =
        createdHabits.length > 0 ||
        updatedHabits.length > 0 ||
        deletedHabits.length > 0;

      if (hasChanges) {
        setIsSaving(true);

        try {
          // 기존 습관 먼저 삭제
          if (deletedHabits.length > 0) {
            const habitIds = deletedHabits.map((h) => Number(h.id));
            await deleteHabits(studyId, habitIds);
          }

          // 추가 API
          if (createdHabits.length > 0) {
            for (const habit of createdHabits) {
              await createHabits(studyId, [habit.title]);
            }
          }

          // 수정 API
          if (updatedHabits.length > 0) {
            const habitsToUpdate = updatedHabits.map((h) => ({
              id: Number(h.id),
              title: h.title,
            }));
            await updateHabits(studyId, habitsToUpdate);
          }

          // API 호출 성공 후 최신 데이터 재조회
          await fetchHabitsData();

          showToast('습관 목록이 저장되었습니다.', 'success');
        } catch (error) {
          console.error('습관 변경 사항 저장 실패:', error);
          showToast('습관 저장 중 오류가 발생했습니다.', 'warning');
          return;
        } finally {
          setIsSaving(false);
        }
      }
    }
    setIsCheckMode((prev) => !prev);
  };

  //삭제 플래그가 붙지 않은 실제 노출 대상
  const visibleHabits = habits.filter((h) => !h.isDeleted);

  return (
    <section className={styles.wrapper}>
      <CardContainer>
        <div className={styles.habitInnerDiv}>
          <div className={styles.habitHead}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                {study ? `${study.nickname}의 ${study.title}` : '스터디'}
              </h2>
              <div className={styles.titleButtons}>
                <ArrowButton to={`/studies/${studyId}`}>대시보드</ArrowButton>
                <ArrowButton to={`/studies/${studyId}/focus`}>
                  오늘의 집중 타이머
                </ArrowButton>
              </div>
            </div>
            <div className={styles.nowTimeDiv}>
              <p className={styles.nowTimeP}>현재날짜</p>
              <div className={styles.timeBox}>
                <p className={styles.time}>{timeNow}</p>
              </div>
            </div>
          </div>
          <div className={styles.todayHabitDiv}>
            <div className={styles.todayHabitInnerDiv}>
              <div className={styles.todayHabitTitle}>
                <p className={styles.todayHabitP}>오늘의 습관</p>
                <button
                  className={styles.listModifyButton}
                  onClick={handleForm}
                >
                  {isSaving ? '저장 중' : isCheckMode ? '목록 수정' : '완료'}
                </button>
              </div>

              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <Spinner />
                </div>
              ) : (
                <>
                  {visibleHabits.length === 0 && isCheckMode && (
                    <div className={styles.todayHabitBoard}>
                      <p>
                        아직 습관이 없어요
                        <br /> 목록 수정을 눌러 습관을 생성해보세요
                      </p>
                    </div>
                  )}

                  {(visibleHabits.length > 0 || !isCheckMode) && (
                    <>
                      <HabitList
                        habits={visibleHabits}
                        isCheckMode={isCheckMode}
                        onDeleteHabit={handleDeleteHabit}
                        onCheckHabit={handleCheckHabit}
                        onUpdateHabit={handleUpdateHabit}
                      />

                      {!isCheckMode && (
                        <HabitForm onAddTempHabit={handleAddTempHabit} />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContainer>
    </section>
  );
}

export default HabitPage;
