import styles from '@/pages/focusPage/components/timer/Timer.module.css';
import TimerControlButtonsContainer from '@/pages/focusPage/components/timer/timerControlButtonsContainer/TimerControlButtonsContainer';
import icTimer from '@/assets/focusPage/ic_timer.svg';
import { formatTime } from '@/utils/formatTime';
import clsx from 'clsx';

function Timer({duration,
  timer,
  presetTimes = [],
  onAdjustTime,
  onSelectPresetTime,}) {
    const {
    formattedTime,
    isRunning,
    isPaused,
    isOverTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = timer;

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
          {presetTimes.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={`${styles.timerPresetChip}`}
              onClick={() => onSelectPresetTime(minutes)}
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
          <button type="button" onClick={() => onAdjustTime(-10)}>
            - 10
          </button>
          <button type="button" onClick={() => onAdjustTime(-5)}>
            - 5
          </button>
          <button type="button" onClick={() => onAdjustTime(+5)}>
            + 5
          </button>
          <button type="button" onClick={() => onAdjustTime(+10)}>
            + 10
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
