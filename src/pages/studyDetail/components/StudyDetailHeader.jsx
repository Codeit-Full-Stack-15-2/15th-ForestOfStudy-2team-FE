import point from '@/assets/ic_point.svg';
import ArrowButton from '@/components/ArrowButton';
import { useStudyActions } from '../hooks/useStudyActions';
import StudyActions from './StudyActions';
import styles from './StudyDetailHeader.module.css';
import StudyReactions from './StudyReactions';

function StudyDetailHeader() {
  const { handleStudyShare, handleStudyEdit, handleStudyRemove } =
    useStudyActions();

  const handleNavigateToHabits = () => {
    console.log('hello world');
  };

  const handleNavigateToFocus = () => {
    console.log('hello world');
  };

  return (
    <section className={styles.headerContainer}>
      <div className={styles.controlsContainer}>
        <div className={styles.controls}>
          <StudyActions
            onShare={handleStudyShare}
            onEdit={handleStudyEdit}
            onRemove={handleStudyRemove}
          />
        </div>
        <div className={styles.reaction}>
          <StudyReactions />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>연우의 개발공장</h2>
        <div className={styles.titleButtons}>
          <ArrowButton onClick={handleNavigateToHabits}>
            습관 달성 기록하기
          </ArrowButton>
          <ArrowButton onClick={handleNavigateToFocus}>오늘의 집중</ArrowButton>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.label}>소개</p>
        <p className={styles.description}>
          Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)
        </p>
      </div>
      <div className={styles.pointContainer}>
        <p className={styles.label}>현재까지 획득한 포인트</p>
        <div className={styles.badge}>
          <img src={point} alt="포인트 아이콘" />
          <span>310P 획득</span>
        </div>
      </div>
    </section>
  );
}

export default StudyDetailHeader;
