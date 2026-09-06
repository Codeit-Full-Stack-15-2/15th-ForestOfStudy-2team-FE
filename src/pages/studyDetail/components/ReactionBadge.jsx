import styles from './ReactionBadge.module.css';

function ReactionBadge({ emoji, count, onClick, isSelected }) {
  const badgeClassName = isSelected
    ? `${styles.badge} ${styles.selected}`
    : styles.badge;

  return (
    <button className={badgeClassName} onClick={onClick}>
      <span>{emoji}</span>&nbsp;{count}
    </button>
  );
}

export default ReactionBadge;
