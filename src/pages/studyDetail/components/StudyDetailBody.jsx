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
  // 1. 주간 데이터 훅
  const {
    habits: weeklyHabits,
    isLoading: isWeeklyLoading,
    hasMore: weeklyHasMore,
    isEmpty: isWeeklyEmpty,
    sentinelRef: weeklySentinelRef,
  } = useStudyHabits(studyId);

  // 2. 월간 데이터 훅 (isEmpty를 monthlyIsEmpty로 이름 변경하여 추출)
  const {
    habits: monthlyHabits,
    isLoading: isMonthlyLoading,
    hasMore: monthlyHasMore,
    isEmpty: monthlyIsEmpty,
    sentinelRef: monthlySentinelRef,
  } = useStudyHabitsMonthly(studyId);

  return (
    <section className={styles.bodyContainer}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={styles.title}>습관 기록표</h2>

        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'weekly'
                ? 'bg-white shadow text-black'
                : 'text-gray-500'
            }`}
          >
            7일
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'monthly'
                ? 'bg-white shadow text-black'
                : 'text-gray-500'
            }`}
          >
            30일 잔디
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
              <HabitTrackerTable habits={weeklyHabits} />
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
