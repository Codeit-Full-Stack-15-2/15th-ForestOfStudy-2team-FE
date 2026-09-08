import styles from '@/pages/focusPage/components/timer/Timer.module.css';
import TimerControlButtonsContainer from '@/pages/focusPage/components/timer/timerControlButtonsContainer/TimerControlButtonsContainer';
import icTimer from '@/assets/focusPage/ic_timer.svg';
import { useTimer } from '@/pages/focusPage/hooks/useTimer';
import { useState } from 'react';
import { formatTime } from '@/utils/formatTime';
import { useToast } from '@/components/toast/ToastContext';
import clsx from 'clsx';

const PRESET_TIMES = [15, 25, 35];
const MIN_MINUTES = 15;

const calculateEarnedPoints = (durationInSeconds) => {
  const BASE_POINT = 3;
  const targetMinutes = Math.floor(durationInSeconds / 60);
  const BONUS_POINT = Math.floor(targetMinutes / 10);

  return BASE_POINT + BONUS_POINT;
};

function Timer({ totalSeconds, onComplete }) {
  const [duration, setDuration] = useState(() =>
    Math.max(totalSeconds || 0, MIN_MINUTES * 60),
  );

  const { showToast } = useToast();

  const handleTimerComplete = () => {
    const earnedPoints = calculateEarnedPoints(duration);
    if (onComplete && earnedPoints > 0) {
      onComplete(earnedPoints);
      showToast(`🎉 ${earnedPoints}포인트를 획득했습니다!`, 'success');
    }
  };

  const {
    formattedTime,
    isRunning,
    isPaused,
    isOverTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(duration, handleTimerComplete);

  const adjustTime = (amountInMinutes) => {
    setDuration((prev) => {
      const next = prev + amountInMinutes * 60;
      return Math.max(next, MIN_MINUTES * 60);
    });
  };

  const selectPresetTime = (minutes) => {
    setDuration(Math.max(minutes, MIN_MINUTES) * 60);
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
