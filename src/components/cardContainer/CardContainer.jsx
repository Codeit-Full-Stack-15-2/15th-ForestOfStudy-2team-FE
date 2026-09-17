import styles from './CardContainer.module.css';

function CardContainer({ children }) {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </section>
  );
}

export default CardContainer;
