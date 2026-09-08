import { getStudyHabits } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import { useInfiniteScroll } from 'react-infinite-scroll-component';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchHabitsByPage = async (targetPage) => {
    const data = await getStudyHabits(studyId, new Date(), {
      page: targetPage,
      pageSize: 7,
    });
    setHabits((prev) =>
      targetPage === 1 ? data.list : [...prev, ...data.list],
    );
    setPage(targetPage);
    if (
      data.list.length === 0 ||
      habits.length + data.list.length >= data.totalCount
    ) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchHabitsByPage(1);
  }, [studyId]);

  const { sentinelRef, isLoading } = useInfiniteScroll({
    next: () => fetchHabitsByPage(page + 1),
    hasMore,
    dataLength: habits.length,
  });

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      {habits.length > 0 ? (
        <>
          <HabitTrackerTable habits={habits} />
          <div ref={sentinelRef} aria-hidden="true" />
          {isLoading && (
            <div className={styles.loaderContainer}>
              <Spinner />
            </div>
          )}
          {!hasMore && (
            <p className={styles.endMessage}>
              모든 습관 데이터를 불러왔습니다.
            </p>
          )}
        </>
      ) : (
        <div className={styles.contentDefault}>
          <p>
            아직 습관이 없어요
            <br />
            오늘의 습관에서 습관을 생성해보세요
          </p>
        </div>
      )}
    </section>
  );
}

export default StudyDetailBody;
