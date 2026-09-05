import styles from './StudyCard.module.css';

function StudyCard() {
  return (
    <li className={styles.studyCard}>
      <article className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>이유디의 UX 스터디</h3>
          <span className={styles.pointBadge}>🌿 310P 획득</span>
        </div>

        <p className={styles.studyProcess}>62일째 진행 중</p>
        <p className={styles.studyDescription}>
          Slow And Steady Wins The Race!!
        </p>

        <div className={styles.reactions}>
          <span>🧑🏻 37</span>
          <span>🔥 26</span>
          <span>🤍 14</span>
        </div>
      </article>
    </li>
  );
}

export default StudyCard;
