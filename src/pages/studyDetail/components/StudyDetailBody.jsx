import { getStudyHabits } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useInfiniteScroll } from 'react-infinite-scroll-component';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchHabitsByPage = async (targetPage) => {
    try {
      const data = await getStudyHabits(studyId, new Date(), {
        page: targetPage,
        pageSize: 7,
      });

      const incomingList = Array.isArray(data?.list) ? data.list : [];

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
      console.error('습관 데이터 로딩 실패', error.message);
      setHasMore(false);
    }
  };

  const { sentinelRef, isLoading } = useInfiniteScroll({
    next: () => fetchHabitsByPage(page),
    hasMore,
    dataLength: habits.length,
  });

  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      <HabitTrackerTable habits={habits} />
      <div ref={sentinelRef} aria-hidden="true" />
      {!hasMore && (
        <p className={styles.endMessage}>모든 습관 데이터를 불러왔습니다.</p>
      )}
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Spinner />
        </div>
      )}
    </section>
  );
}

export default StudyDetailBody;
