import styles from './StudyDetailBody.module.css';

function StudyDetailBody() {
  return (
    <section className={styles.bodyContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      {/* <div className={styles.contentDefault}>
        <p>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </p>
      </div> */}
    </section>
  );
}

export default StudyDetailBody;
