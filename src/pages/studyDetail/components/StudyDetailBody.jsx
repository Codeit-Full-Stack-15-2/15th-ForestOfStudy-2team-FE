import { getStudyHabits } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import dayjs from '@/utils/dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
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

        setHabits((prev) =>
          targetPage === 1 ? incomingList : [...prev, ...incomingList],
        );
        setPage(targetPage + 1);

        const totalLoaded =
          targetPage === 1
            ? incomingList.length
            : habits.length + incomingList.length;

        if (incomingList.length === 0 || totalLoaded >= data.totalCount) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('습관 데이터 로딩 실패:', error.message);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [studyId, habits.length, isLoading],
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

  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>

      {isEmpty ? (
        <div className={styles.contentDefault}>
          <p>
            아직 습관이 없어요
            <br />
            [습관 달성 기록하기]에서 습관을 생성해보세요
          </p>
        </div>
      ) : (
        <>
          {habits.length > 0 && <HabitTrackerTable habits={habits} />}

          <div
            ref={sentinelRef}
            style={{ height: '10px' }}
            aria-hidden="true"
          />

          {!hasMore && (
            <p className={styles.endMessage}>
              모든 습관 데이터를 불러왔습니다.
            </p>
          )}

          {isLoading && (
            <div className={styles.loaderContainer}>
              <Spinner />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default StudyDetailBody;
