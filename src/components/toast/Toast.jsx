import styles from './Toast.module.css';

function Toast({ text, type = 'warning', isExiting = false }) {
  return (
    <button
      className={`${styles.toast} ${styles[type]} ${isExiting ? styles.exiting : ''}`}
    >
      {text}
    </button>
  );
}

export default Toast;
