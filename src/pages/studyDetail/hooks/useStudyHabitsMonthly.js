import { getMonthlyHabitRecords } from '@/api/studyApi';
import dayjs from '@/utils/dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useStudyHabitsMonthly = (studyId, enabled = true) => {
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);
  const isEmpty = !isLoading && !hasMore && habits.length === 0;

  const loadHabits = useCallback(
    async (targetPage) => {
      if (isLoading || !enabled) return;
      setIsLoading(true);

      try {
        const targetDate = dayjs().format('YYYY-MM-DD');
        const data = await getMonthlyHabitRecords(studyId, {
          targetDate,
          page: targetPage,
          pageSize: 7,
        });

        const incomingList = Array.isArray(data?.list) ? data.list : [];
        const totalCount = data?.totalCount || 0;

        setHabits((prev) => {
          const nextList =
            targetPage === 1 ? incomingList : [...prev, ...incomingList];

          if (incomingList.length === 0 || nextList.length >= totalCount) {
            setHasMore(false);
          }
          return nextList;
        });

        setPage(targetPage + 1);
      } catch (error) {
        console.error('월간 습관 데이터 로딩 실패:', error.message);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [studyId, isLoading, enabled],
  );

  useEffect(() => {
    if (!enabled || !hasMore || isLoading) return;

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
  }, [enabled, hasMore, isLoading, page, loadHabits]);

  const resetMonthlyHabits = useCallback(() => {
    setHabits([]);
    setPage(1);
    setHasMore(true);
  }, []);
  return {
    habits,
    isLoading,
    hasMore,
    isEmpty,
    sentinelRef,
    setHabits,
    resetMonthlyHabits,
  };
};
