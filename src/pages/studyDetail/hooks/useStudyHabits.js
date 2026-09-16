import { toggleHabitRecord } from '@/api/habitApi';
import { getStudyHabits } from '@/api/studyApi';
import dayjs from '@/utils/dayjs';
import { showToast } from '@/utils/showToast';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useStudyHabits = (studyId) => {
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);
  const isEmpty = !isLoading && !hasMore && habits.length === 0;

  const loadHabits = useCallback(
    async (targetPage) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const targetDate = dayjs().format('YYYY-MM-DD');
        const data = await getStudyHabits(studyId, targetDate, {
          page: targetPage,
          pageSize: 7,
        });

        const incomingList = Array.isArray(data) ? data : [];

        setHabits((prev) => {
          const nextList =
            targetPage === 1 ? incomingList : [...prev, ...incomingList];

          if (
            incomingList.length === 0 ||
            (data.totalCount && nextList.length >= data.totalCount)
          ) {
            setHasMore(false);
          }
          return nextList;
        });

        setPage(targetPage + 1);
      } catch (error) {
        console.error('습관 데이터 로딩 실패:', error.message);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [studyId, isLoading],
  );

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadHabits(page);
        }
      },
      { threshold: 0.1 },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [hasMore, isLoading, page, loadHabits]);

  const handleToggleHabit = async ({ habitId, date }) => {
    const today = dayjs().format('YYYY-MM-DD');
    if (today !== date) {
      showToast('오늘 습관만 변경할 수 있습니다.', 'warning');
      return;
    }
    // 스터디 & 습관 존재 유무 검증 단계
    const habitByStudyIdAndHabitId = habits.find(
      (habit) => habit.studyId === Number(studyId) && habit.id === habitId,
    );

    if (!habitByStudyIdAndHabitId) {
      showToast('삭제되었거나 존재하지 않는 습관입니다.');
      return;
    }

    const habitRecordByRecordDate = habitByStudyIdAndHabitId.weeklyRecords.find(
      (record) => record.date === date,
    );

    if (!habitRecordByRecordDate) {
      showToast('습관 상태 변경에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    // 메모리 습관 데이터 업데이트 단계
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        return {
          ...habit,
          weeklyRecords: habit.weeklyRecords.map((recordObj) => {
            if (recordObj.date !== date) return recordObj;

            return {
              ...recordObj,
              record: recordObj.record ? null : true,
            };
          }),
        };
      }),
    );

    // 변경 이전의 습관 상태
    const previousHabits = habits;

    try {
      await toggleHabitRecord(studyId, habitId, date);
      showToast('습관 상태가 변경되었습니다.', 'success');
    } catch (error) {
      console.error('변경에 실패했습니다: ', error.message);
      setHabits(previousHabits);
      showToast('변경에 실패했습니다. 다시 시도해주세요.', 'warning');
    }
  };

  return {
    habits,
    isLoading,
    hasMore,
    isEmpty,
    sentinelRef,
    setHabits,
    handleToggleHabit,
  };
};
