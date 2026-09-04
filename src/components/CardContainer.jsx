import styles from '@/components/CardContainer.module.css';

function CardContainer({ children }) {
  return <article className={styles.container}>{children}</article>;
}

export default CardContainer;
