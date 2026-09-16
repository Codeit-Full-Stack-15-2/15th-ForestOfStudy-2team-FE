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

  const handleToggleHabit = ({ habitId, date }) => {
    const today = dayjs().format('YYYY-MM-DD');
    console.log(habitId);
    if (today !== date) {
      showToast('오늘 습관만 변경할 수 있습니다.', 'warning');
      return;
    }
    // TODO: 습관 변경 로직 개발
    // TODO: UI 업데이트
    // TODO: 데이터 페칭
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
