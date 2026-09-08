import styles from '@/pages/focusPage/components/timer/Timer.module.css';
import TimerControlButtonsContainer from '@/pages/focusPage/components/timer/timerControlButtonsContainer/TimerControlButtonsContainer';
import icTimer from '@/assets/focusPage/ic_timer.svg';
import { useTimer } from '@/pages/focusPage/hooks/useTimer';
import { useState } from 'react';
import { formatTime } from '@/utils/formatTime';

const PRESET_TIMES = [15, 25, 35];

function Timer({ totalSeconds }) {
  const [duration, setDuration] = useState(totalSeconds);
  const {
    formattedTime,
    isRunning,
    isPaused,
    isOverTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(duration);

  const adjustTime = (amountInMinutes) => {
    setDuration((prev) => {
      const next = prev + amountInMinutes * 60;
      return Math.max(next, 0);
    });
  };

  const selectPresetTime = (minutes) => {
    setDuration(minutes * 60);
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
        className={`${styles.timerNumber} ${isRunning ? styles.timerNumberRunning : ''} ${isOverTime ? styles.timerNumberOverTime : ''}`}
      >
        {formattedTime}
      </span>

      <div className={styles.timerSettingButtonsContainer}>
        <div
          className={`${styles.timerPresetContainer} ${isRunning ? styles.hidden : ''}`}
        >
          {PRESET_TIMES.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={`${styles.timerPresetChip} ${duration === minutes * 60 ? styles.timerPresetChipActive : ''}`}
              onClick={() => selectPresetTime(minutes)}
            >
              {minutes}분
            </button>
          ))}
        </div>

        <div
          className={`${styles.timerAdjustButtonContainer} ${isRunning ? styles.hidden : ''}`}
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
