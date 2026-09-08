import icStartButton from '@/assets/focusPage/ic_start_button.svg';
import icPauseButton from '@/assets/focusPage/ic_pause_button.svg';
import icRestartButton from '@/assets/focusPage/ic_restart_button.svg';
import styles from './TimerControlButtonsContainer.module.css';

function TimerControlButtonsContainer({
  isRunning,
  isPaused,
  startTimer,
  pauseTimer,
  resetTimer,
}) {
  return (
    <div className={styles.timerControlButtonsContainer}>
      <button
        className={styles.timerPauseButton}
        type="button"
        onClick={pauseTimer}
        disabled={!isRunning || isPaused}
      >
        <img src={icPauseButton} alt="정지 버튼" />
      </button>

      <button
        className={styles.timerStartButton}
        type="button"
        onClick={startTimer}
        disabled={isRunning && !isPaused}
      >
        <img src={icStartButton} alt="스타트 아이콘" />
        <span className={styles.timerStartText}>
          {isRunning && isPaused ? 'Resume' : 'Start!'}
        </span>
      </button>

      <button
        className={styles.timerRestartButton}
        type="button"
        onClick={resetTimer}
        disabled={!isRunning}
      >
        <img src={icRestartButton} alt="타이머 재시작 버튼" />
      </button>
    </div>
  );
}

export default TimerControlButtonsContainer;
