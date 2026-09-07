import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import icPoint from '@/assets/common/ic_point.svg';
import Timer from './components/Timer';

function FocusPage() {
  const TEMP_STUDY_ID = 123; //useParams()로 대체 예정

  return (
    <section className={styles.timerSection}>
      <div className={styles.titleContainer}>
        <h3>연우의 개발공장</h3>
        <div className={styles.buttonContainer}>
          <ArrowButton to={`/studies/${TEMP_STUDY_ID}/habits`}>
            오늘의 습관
          </ArrowButton>
          <ArrowButton to={`/studies/${TEMP_STUDY_ID}`}>홈</ArrowButton>
        </div>
      </div>

      <div className={styles.pointContainer}>
        <p>현재까지 획득한 포인트</p>
        <div className={styles.pointAmount}>
          <img src={icPoint} alt="포인트 아이콘" />
          <span>310P 획득</span>
        </div>
      </div>

      <Timer totalSeconds={25 * 60} />
    </section>
  );
}

export default FocusPage;
