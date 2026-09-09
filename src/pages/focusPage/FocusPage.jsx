import styles from './FocusPage.module.css';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import Timer from './components/timer/Timer';
import CardContainer from '@/components/cardContainer/CardContainer';
import PointBadge from './components/PointBadge';
import { useFocusPoints } from '@/pages/focusPage/hooks/useFocusPoints';

function FocusPage({ studyId = 123 }) {
  const { points, addPoints } = useFocusPoints(studyId);
  
  return (
    <CardContainer>
      <div className={styles.titleContainer}>
        <h3>연우의 개발공장</h3>
        <div className={styles.buttonContainer}>
          <ArrowButton to={`/studies/${studyId}/habits`}>
            습관 달성 기록하기
          </ArrowButton>
          <ArrowButton to={`/studies/${studyId}`}>대시보드</ArrowButton>
        </div>
      </div>
      <PointBadge points={points} />
      <Timer
        totalSeconds={25 * 60}
        onComplete={(earnedPoints) => addPoints(earnedPoints)}
      />
    </CardContainer>
  );
}

export default FocusPage;
