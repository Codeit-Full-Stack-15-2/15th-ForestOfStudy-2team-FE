import { getStudyHabits } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const initHabits = async () => {
      try {
        setIsLoading(true);
        const data = await getStudyHabits(studyId, new Date(), {
          page: 1,
          pageSize: 7,
        });
        setHabits(data.list);
        setPage(1);

        if (data.list.length === 0 || data.list.length >= data.totalCount) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    initHabits();
  }, [studyId]);

  const fetchMore = async () => {
    const nextPage = page + 1;
    try {
      const data = await getStudyHabits(studyId, new Date(), {
        page: nextPage,
        pageSize: 7,
      });
      if (data.list.length === 0) {
        setHasMore(false);
        return;
      }

      setHabits((prev) => [...prev, ...data.list]);
      setPage(nextPage);

      if (habits.length + data.list.length >= data.totalCount) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('추가 습관 데이터 로딩 실패', error.message);
    }
  };

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
        <InfiniteScroll
          dataLength={habits.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className={styles.loaderContainer}>
              <Spinner />
            </div>
          }
          endMessage={
            <p className={styles.endMessage}>
              모든 습관 데이터를 불러왔습니다.
            </p>
          }
        >
          <HabitTrackerTable habits={habits} />
        </InfiniteScroll>
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
