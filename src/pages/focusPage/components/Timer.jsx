import icStartButton from '@/assets/focusPage/ic_start_button.svg';
import icPauseButton from '@/assets/focusPage/ic_pause_button.svg';
import styles from '@/pages/focusPage/components/Timer.module.css';
import { useTimer } from '@/pages/focusPage/hooks/useTimer';
import { useState } from 'react';

const MIN_TIME = 1 * 60;
const MAX_TIME = 120 * 60;

function TimerStartButton({ totalSeconds }) {
  const [duration, setDuration] = useState(totalSeconds);
  const { formattedTime, isRunning, setIsRunning } = useTimer(duration);

   const adjustTime = (amountInMinutes) => {
    setDuration((prev) => {
      const next = prev + amountInMinutes * 60;
      return Math.min(Math.max(next, MIN_TIME), MAX_TIME);
    });
  };

  return (
    <div className={styles.timerContainer}>
      <h3>오늘의 집중</h3>
      <span className={styles.timerNumber}>{formattedTime}</span>
      {!isRunning && (
        <div className={styles.timerAdjustButtonContainer}>
          <button type="button" onClick={() => adjustTime(+5)}>+ 5</button>
          <button type="button" onClick={() => adjustTime(-5)}>- 5</button>
          <button type="button" onClick={() => adjustTime(+1)}>+ 1</button>
          <button type="button" onClick={() => adjustTime(-1)}>- 1</button>
        </div>
      )}
      <div className={styles.timerControlButtonsContainer}>
        {isRunning && (
          <button
            className={styles.timerStopButton}
            type="button"
            onClick={() => setIsRunning(false)}
          >
            <img src={icPauseButton} alt="정지 버튼" />
          </button>
        )}

        <button
          className={styles.timerStartButton}
          type="button"
          onClick={() => setIsRunning(true)}
        >
          <img src={icStartButton} alt="스타트 아이콘" />
          <span className={styles.timerStartText}>Start!</span>
        </button>
      </div>
    </div>
  );
}

export default TimerStartButton;
