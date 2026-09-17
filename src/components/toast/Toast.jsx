import styles from './Toast.module.css';
import clsx from 'clsx';

function Toast({ text, type = 'warning', isExiting = false }) {
  return (
    <button
      className={clsx(styles.toast, styles[type], isExiting && styles.exiting)}
    >
      {text}
    </button>
  );
}

export default Toast;
