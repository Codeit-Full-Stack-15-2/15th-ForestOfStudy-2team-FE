import { getStudyHabits } from '@/api/studyApi';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const initHabits = async () => {
      try {
        setIsLoading(true);
        const data = await getStudyHabits(studyId, new Date(), {
          page: 1,
          pageSize: 7,
        });
        setHabits(data.list);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    initHabits();
  }, [studyId]);

  if (isLoading) <Spinner />;

  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      {habits.length > 0 ? (
        <HabitTrackerTable habits={habits} />
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
