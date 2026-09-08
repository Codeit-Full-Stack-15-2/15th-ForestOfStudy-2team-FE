import styles from '@/pages/focusPage/components/timer/Timer.module.css';
import TimerControlButtonsContainer from '@/pages/focusPage/components/timer/timerControlButtonsContainer/TimerControlButtonsContainer';
import icTimer from '@/assets/focusPage/ic_timer.svg';
import { useTimer } from '@/pages/focusPage/hooks/useTimer';
import { useState } from 'react';
import { formatTime } from '@/utils/formatTime';
import { useFocusPointStore } from '@/stores/useFocusPointStore';
import clsx from 'clsx';

const BASE_POINT = 3;
const MINUTES_PER_BONUS_POINT = 10;
const PRESET_TIMES = [15, 25, 35];

function calculateEarnedPoint(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const bonusPoint = Math.floor(minutes / MINUTES_PER_BONUS_POINT);
  return BASE_POINT + bonusPoint;
}

function Timer({ totalSeconds }) {
  const addPoint = useFocusPointStore((state) => state.addPoint);
  const MIN_MINUTES = 15;
  const MIN_DURATION_SECONDS = MIN_MINUTES * 60;
  const [duration, setDuration] = useState(
    Math.max(totalSeconds, MIN_DURATION_SECONDS),
  );

  const handleComplete = () => {
    const earnedPoint = calculateEarnedPoint(duration);
    addPoint(earnedPoint);
  };
  const {
    formattedTime,
    isRunning,
    isPaused,
    isOverTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(duration, handleComplete);

  const adjustTime = (amountInMinutes) => {
    setDuration((prev) => {
      const next = prev + amountInMinutes * 60;
      return Math.max(next, MIN_DURATION_SECONDS);
    });
  };

  const selectPresetTime = (minutes) => {
    setDuration(Math.max(minutes * 60, MIN_DURATION_SECONDS));
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerHeader}>
        <h3>오늘의 집중</h3>
        <span className={styles.timerSettedTimeBadge}>
          <img src={icTimer} alt="" />
          {formatTime(duration)}
        </span>
      </div>

      <span
        className={clsx(
          styles.timerNumber,
          isRunning && styles.timerNumberRunning,
          isOverTime && styles.timerNumberOverTime,
        )}
      >
        {formattedTime}
      </span>

      <div className={styles.timerSettingButtonsContainer}>
        <div
          className={clsx(
            styles.timerPresetContainer,
            isRunning && styles.hidden,
          )}
        >
          {PRESET_TIMES.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={`${styles.timerPresetChip}`}
              onClick={() => selectPresetTime(minutes)}
            >
              {minutes}분
            </button>
          ))}
        </div>

        <div
          className={clsx(
            styles.timerAdjustButtonContainer,
            isRunning && styles.hidden,
          )}
        >
          <button type="button" onClick={() => adjustTime(-5)}>
            - 5
          </button>
          <button type="button" onClick={() => adjustTime(-1)}>
            - 1
          </button>
          <button type="button" onClick={() => adjustTime(+1)}>
            + 1
          </button>
          <button type="button" onClick={() => adjustTime(+5)}>
            + 5
          </button>
        </div>
      </div>

      <TimerControlButtonsContainer
        isRunning={isRunning}
        isPaused={isPaused}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
}

export default Timer;
