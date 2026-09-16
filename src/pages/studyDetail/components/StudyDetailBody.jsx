import Spinner from '@/components/Spinner';
import clsx from 'clsx';
import { useStudyHabits } from '../hooks/useStudyHabits';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const { habits, isLoading, hasMore, isEmpty, sentinelRef } =
    useStudyHabits(studyId);
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
            <div
              className={clsx(
                habits.length === 0 && styles.loaderContainerNothing,
                styles.loaderContainer,
              )}
            >
              <Spinner />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default StudyDetailBody;
