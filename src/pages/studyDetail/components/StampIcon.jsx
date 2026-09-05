import icnActive from '@/assets/subtract_active.svg';
import icnDefault from '@/assets/subtract_default.svg';
import styles from './StampIcon.module.css';

function StampIcon({ isCompleted }) {
  return (
    <div className={styles.container}>
      {isCompleted ? <img src={icnActive} /> : <img src={icnDefault} />}
    </div>
  );
}

export default StampIcon;
