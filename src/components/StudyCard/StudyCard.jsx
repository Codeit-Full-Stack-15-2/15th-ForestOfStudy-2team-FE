import styles from './StudyCard.module.css';

function StudyCard({ title, point, days, description, participants, focusCount, likes  }) {
  return (
    <li className={styles.studyCard}>
      <article className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>

          <span className={styles.pointBadge}>🌿 {point}P 획득</span>
        </div>

        <p className={styles.studyProcess}>{days}일째 진행 중</p>

        <p className={styles.studyDescription}>
          {description}
        </p>

        <div className={styles.reactions}>
          <span>🧑🏻 {participants}</span>
          <span>🔥 {focusCount}</span>
          <span>🤍 {likes}</span>
        </div>
      </article>
    </li>
  );
}

export default StudyCard;
