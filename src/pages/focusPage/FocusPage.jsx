import logo from '@/assets/logo.svg';
import styles from './FocusPage.module.css';
import { Link } from 'react-router';
import icPoint from '@/assets/todaysFocus/ic_point.svg';
import icStartButton from '@/assets/todaysFocus/ic_start_button.svg';
import icRightArrow from '@/assets/todaysFocus/ic_right_arrow.svg';

import { useTimer } from '@/pages/focusPage/hooks/useTimer';

function FocusPage() {
  const { timeLeft, isRunning, setIsRunning } = useTimer(25 * 60);

  return (
    <>
      <div className={styles.wrapper}>
        <Link to={'/'}>
          <img src={logo} alt="로고 이미지" />
        </Link>
      </div>

      <section className={styles.timerSection}>
        <div className={styles.titleContainer}>
          <h3>연우의 개발공장</h3>
          <div className={styles.buttonContainer}>
            <button type="button">
              오늘의 습관
              <img src={icRightArrow} alt="오른쪽 버튼 아이콘" />
            </button>
            <button type="button">
              홈<img src={icRightArrow} alt="오른쪽 버튼 아이콘" />
            </button>
          </div>
        </div>

        <div className={styles.pointContainer}>
          <p>현재까지 획득한 포인트</p>
          <div className={styles.pointAmount}>
            <img src={icPoint} alt="포인트 아이콘" />
            <span>310P 획득</span>
          </div>
        </div>

        <div className={styles.timerContainer}>
          <h3>오늘의 집중</h3>
          <span className={styles.timerNumber}>{timeLeft}</span>
          <button type="button" onClick={() => setIsRunning(true)}>
            <img src={icStartButton} alt="스타트 아이콘" />
            <span className={styles.timerStartText}>Start!</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default FocusPage;
