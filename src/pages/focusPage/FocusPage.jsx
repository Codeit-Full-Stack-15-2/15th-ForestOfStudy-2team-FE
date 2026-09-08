import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import icPoint from '@/assets/common/ic_point.svg';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';
import { useFocusPointStore } from '@/stores/useFocusPointStore';
import { useEffect } from 'react';
const DEFAULT_MINS = 25;

function FocusPage() {
  const TEMP_STUDY_ID = 123; //useParams()로 대체 예정
  const point = useFocusPointStore((state)=> state.point);
  const fetchPoint = useFocusPointStore((state)=> state.fetchPoint);

  useEffect(()=>{
    fetchPoint(TEMP_STUDY_ID);
  },[fetchPoint]);

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
          <span>{point}P 획득</span>
        </div>
      </div>

      <Timer totalSeconds={DEFAULT_MINS * 60} />
    </CardContainer>
  );
}

export default FocusPage;