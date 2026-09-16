import styles from './StudyCard.module.css';
import { Link } from 'react-router';
import dayjs from '@/utils/dayjs';

function StudyCard({
  id,
  nickname,
  title,
  point,
  createdAt,
  description,
  emoji,
  background,
  onClick,
}) {
  const days =
    dayjs().startOf('day').diff(dayjs(createdAt).startOf('day'), 'day') + 1;

  const isImageBackground = [
    'forest_path',
    'clouds',
    'beach',
    'mountain_lake',
  ].includes(background);

  return (
    <li
      className={`${styles.studyCard} ${styles[background]} ${
        isImageBackground ? styles.image : ''
      }`}
    >
      <Link to={`/studies/${id}`} className={styles.cardLink} onClick={onClick}>
        <article className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <span className={styles.nickname}>{nickname}</span>의 {title}
            </h3>

            <span className={styles.pointBadge}>🌿 {point}P 획득</span>
          </div>

          <p className={styles.studyProcess}>{days}일째 진행 중</p>

          <p className={styles.studyDescription}>{description}</p>

          <div className={styles.reactions}>
            {[...emoji]
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((reaction) => (
                <span key={reaction.emoji}>
                  {reaction.emoji} {reaction.count}
                </span>
              ))}
          </div>
        </article>
      </Link>
    </li>
  );
}

export default StudyCard;
