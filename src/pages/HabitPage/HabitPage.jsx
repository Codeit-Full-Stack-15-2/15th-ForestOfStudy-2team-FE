import styles from './HabitPage.module.css';

function HabitPage() {
  return (
    <>
      <div className={styles.habitPageDiv}>
        <div className={styles.habitInnerDiv}>
          <div className={styles.habitHead}>
            <div className={styles.habitTitle}>
              <h1>연우의 개발공장</h1> <button>오늘의 집중</button>
              <button>홈</button>
            </div>
            <div className={styles.nowTime}>
              <p>현재시간</p>
              <div className={styles.nowTimeBox}>
                <p>시간</p>
              </div>
            </div>
          </div>
          <div className={styles.todayHabitDiv}>
            <div className={styles.todayHabitInnerDiv}>
              <div className={styles.todayHabitTitle}>
                <p>오늘의 습관</p> <button>목록 수정</button>
                <div className={styles.todayHabbitBoard}>
                  <p>
                    아직 습관이 없어요
                    <br /> 목록 수정을 눌러 습관을 생성해보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HabitPage;
