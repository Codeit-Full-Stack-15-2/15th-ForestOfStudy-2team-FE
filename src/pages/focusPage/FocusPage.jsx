import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import icPoint from '@/assets/common/ic_point.svg';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';

function FocusPage() {
  const TEMP_STUDY_ID = 123; //useParams()로 대체 예정

  return (
    <CardContainer>
      <div className={styles.titleContainer}>
        <h3>연우의 개발공장</h3>
        <div className={styles.buttonContainer}>
          <ArrowButton to={`/studies/${TEMP_STUDY_ID}/habits`}>
            습관 달성 기록하기
          </ArrowButton>
          <ArrowButton to={`/studies/${TEMP_STUDY_ID}`}>대시보드</ArrowButton>
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
    </CardContainer>
  );
}

export default FocusPage;
