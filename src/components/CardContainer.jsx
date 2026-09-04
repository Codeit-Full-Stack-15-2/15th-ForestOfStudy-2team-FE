import styles from '@/components/CardContainer.module.css';

function CardContainer({ children }) {
  return <section className={styles.container}>{children}</section>;
}

export default CardContainer;
