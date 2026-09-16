import Spinner from '@/components/Spinner';
import clsx from 'clsx';
import { useState } from 'react';
import { useStudyHabits } from '../hooks/useStudyHabits';
import { useStudyHabitsMonthly } from '../hooks/useStudyHabitsMonthly';
import HabitGrassCard from './HabitGrassCard';
import HabitTrackerTable from './HabitTrackerTable';
import styles from './StudyDetailBody.module.css';

function StudyDetailBody({ studyId }) {
  const [viewMode, setViewMode] = useState('weekly');

  // 1. 월간 데이터 훅 (viewMode가 'monthly'일 때만 enabled = true)
  const {
    habits: monthlyHabits,
    isLoading: isMonthlyLoading,
    hasMore: monthlyHasMore,
    isEmpty: monthlyIsEmpty,
    sentinelRef: monthlySentinelRef,
    resetMonthlyHabits,
  } = useStudyHabitsMonthly(studyId, viewMode === 'monthly');

  // 2. 주간 데이터 훅
  const {
    habits: weeklyHabits,
    isLoading: isWeeklyLoading,
    hasMore: weeklyHasMore,
    isEmpty: isWeeklyEmpty,
    sentinelRef: weeklySentinelRef,
    handleToggleHabit,
  } = useStudyHabits(studyId, {
    onToggleSuccess: () => {
      resetMonthlyHabits();
    },
  });

  return (
    <section className={styles.bodyContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>습관 기록표</h2>

        <div className={styles.toggleGroup}>
          <button
            onClick={() => setViewMode('weekly')}
            className={`${styles.toggleButton} ${
              viewMode === 'weekly' ? styles.activeButton : ''
            }`}
          >
            이번주
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`${styles.toggleButton} ${
              viewMode === 'monthly' ? styles.activeButton : ''
            }`}
          >
            이전 30일
          </button>
        </div>
      </div>

      {viewMode === 'weekly' ? (
        isWeeklyEmpty ? (
          <div className={styles.contentDefault}>
            <p>
              아직 습관이 없어요
              <br />
              [습관 달성 기록하기]에서 습관을 생성해보세요
            </p>
          </div>
        ) : (
          <>
            {weeklyHabits.length > 0 && (
              <HabitTrackerTable
                habits={weeklyHabits}
                onClick={handleToggleHabit}
              />
            )}
            <div
              ref={weeklySentinelRef}
              style={{ height: '10px' }}
              aria-hidden="true"
            />
            {!weeklyHasMore && (
              <p className={styles.endMessage}>
                모든 습관 데이터를 불러왔습니다.
              </p>
            )}
            {isWeeklyLoading && (
              <div
                className={clsx(
                  weeklyHabits.length === 0 && styles.loaderContainerNothing,
                  styles.loaderContainer,
                )}
              >
                <Spinner />
              </div>
            )}
          </>
        )
      ) : monthlyIsEmpty ? (
        <div className={styles.contentDefault}>
          <p>
            아직 습관이 없어요
            <br />
            [습관 달성 기록하기]에서 습관을 생성해보세요
          </p>
        </div>
      ) : (
        <>
          <HabitGrassCard
            studyId={studyId}
            habits={monthlyHabits}
            isLoading={isMonthlyLoading}
            hasMore={monthlyHasMore}
            sentinelRef={monthlySentinelRef}
          />
          <div
            ref={monthlySentinelRef}
            style={{ height: '10px' }}
            aria-hidden="true"
          />
          {!monthlyHasMore && (
            <p className={styles.endMessage}>
              모든 습관 데이터를 불러왔습니다.
            </p>
          )}
          {isMonthlyLoading && (
            <div
              className={clsx(
                monthlyHabits.length === 0 && styles.loaderContainerNothing,
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
