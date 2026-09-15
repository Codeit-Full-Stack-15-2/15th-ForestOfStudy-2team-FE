import { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import {
  getHabits,
  createHabits,
  updateHabits,
  deleteHabits,
} from '@/api/habitApi';
import HabitForm from './components/habitForm/HabitInput';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import CardContainer from '@/components/cardContainer/CardContainer';
import styles from './HabitPage.module.css';
import HabitList from './components/habitForm/HabitList';

function HabitPage() {
  const TEMP_STUDY_ID = 1;

  const timeNow = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .split(' ')[0];

  const [isCheckMode, setIsCheckMode] = useState(true);
  const [habits, setHabits] = useState([]);

  const fetchHabitsData = async () => {
    try {
      const response = await getHabits(TEMP_STUDY_ID);
      const habitList = Array.isArray(response)
        ? response
        : response.data || response.habits || response.list || [];
      setHabits(habitList);
    } catch (error) {
      console.error('습관 목록 불러오기 오류:', error);
    }
  };
  useEffect(() => {
    fetchHabitsData();
  }, [TEMP_STUDY_ID]);

  // 엔터 입력 시 화면에만 임시로 추가 (통신X)
  const handleAddTempHabit = (habitTitle) => {
    const newTempHabit = {
      id: `temp-${Date.now()}`,
      title: habitTitle,
      isCompleted: false,
      isTemp: true, // 임시 생성 항목 플래그
    };
    setHabits((prev) => [...prev, newTempHabit]);
  };

  // const handleAddHabit = async (habitName) => {
  //   try {
  //     await createHabits(TEMP_STUDY_ID, [habitName]);
  //     await fetchHabitsData();
  //   } catch (error) {
  //     const serverMessage = error.response?.data?.message;
  //     if (serverMessage) {
  //       alert(serverMessage);
  //     } else {
  //       alert('습관 등록 실패: 서버 통신에 실패했습니다.');
  //     }
  //   }
  // }; 문제 없을시 삭제하기

  const handleUpdateHabit = (id, newTitle) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== id) return habit;
        return habit.isTemp
          ? { ...habit, title: newTitle }
          : { ...habit, title: newTitle, isUpdated: true };
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

  const handleCheckHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, isCompleted: !habit.isCompleted }
          : habit,
      ),
    );
  };

  const handleForm = async () => {
    if (!isCheckMode) {
      const createdHabits = habits.filter((h) => h.isTemp && !h.isDeleted);
      const updatedHabits = habits.filter((h) => h.isUpdated && !h.isDeleted);
      const deletedHabits = habits.filter((h) => h.isDeleted && !h.isTemp);

      const hasChanges =
        createdHabits.length > 0 ||
        updatedHabits.length > 0 ||
        deletedHabits.length > 0;

      if (hasChanges) {
        try {
          // 추가 API
          if (createdHabits.length > 0) {
            const habitTitles = createdHabits.map((h) => h.title);
            await createHabits(TEMP_STUDY_ID, habitTitles);
          }

          // 수정 API
          if (updatedHabits.length > 0) {
            const habitsToUpdate = updatedHabits.map((h) => ({
              id: h.id,
              title: h.title,
            }));
            await updateHabits(TEMP_STUDY_ID, habitsToUpdate);
          }

          // 삭제 API
          if (deletedHabits.length > 0) {
            const habitIds = deletedHabits.map((h) => h.id);
            await deleteHabits(TEMP_STUDY_ID, habitIds);
          }

          // API 호출 성공 후 최신 데이터 재조회
          await fetchHabitsData();
        } catch (error) {
          console.error('습관 변경 사항 저장 실패:', error);
          alert('습관 저장 중 오류가 발생했습니다.');
          return;
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
              <h2 className={styles.title}>연우의 개발공장</h2>
              <div className={styles.titleButtons}>
                <ArrowButton to={`/studies/${TEMP_STUDY_ID}`}>
                  대시보드
                </ArrowButton>
                <ArrowButton to={`/studies/${TEMP_STUDY_ID}/focus`}>
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
                  {isCheckMode ? '목록 수정' : '완료'}
                </button>
              </div>

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
            </div>
          </div>
        </div>
      </CardContainer>
    </section>
  );
}

export default HabitPage;
