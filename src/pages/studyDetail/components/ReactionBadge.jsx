import styles from './ReactionBadge.module.css';

function ReactionBadge({ emoji, count }) {
  return (
    <button className={styles.reactionBadge}>
      <span>{emoji}</span>&nbsp;{count}
    </button>
  );
}

export default ReactionBadge;
