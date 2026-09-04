import styles from "@/components/Toast.module.css"

function Toast(props) {
  return <button className={styles.toast}>`🚨{props.text}`</button>;
}

export default Toast;
