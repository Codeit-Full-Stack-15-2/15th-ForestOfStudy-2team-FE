import { useState } from 'react';
import HabitForm from './components/habitForm/HabitForm';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import CardContainer from '@/components/cardContainer/CardContainer';
import styles from './HabitPage.module.css';
import HabitList from './components/habitForm/HabitList';


function HabitPage() {
  const TEMP_STUDY_ID = 123;

  const timeNow = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .replace(' ', ' ');

  const [isCheckMode, setIsCheckMode] = useState(true);
  const [habits, setHabits] = useState([]);

  const handleAddHabit = (habitName) => {
    setHabits((prevHabits) => [
      ...prevHabits,
      {
        id: Date.now(),
        name: habitName,
        isCompleted: false,
      },
    ]);
  };

const handleUpdateHabit = (id, newName) => {
  setHabits((prevHabits) =>
    prevHabits.map((habit) =>
      habit.id === id
        ? { ...habit, name: newName }
        : habit
    )
  );
};

  const handleDeleteHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId),
    );
  };

  const handleCheckHabit = (habitId) => {
    

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, isCompleted: !habit.isCompleted }
          : habit,
      ),
    );
  };

  const handleForm = () => {
    setIsCheckMode((prev) => !prev);
    return;
  };

  return (
    <section className={styles.wrapper}>
      <CardContainer>
        <div className={styles.habitInnerDiv}>
          <div className={styles.habitHead}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>연우의 개발공장</h2>
              <div className={styles.titleButtons}>
                <ArrowButton to={`/studies/${TEMP_STUDY_ID}`}>
                  대시보드
                </ArrowButton>
                <ArrowButton to={`/studies/${TEMP_STUDY_ID}/focus`}>
                  오늘의 집중
                </ArrowButton>
              </div>
            </div>
            <div className={styles.nowTimeDiv}>
              <p className={styles.nowTimeP}>현재시간</p>
              <div className={styles.timeBox}>
                <p className={styles.time}>{timeNow}</p>
              </div>
            </div>
          </div>
          <div className={styles.todayHabitDiv}>
            <div className={styles.todayHabitInnerDiv}>
              <div className={styles.todayHabitTitle}>
                <p className={styles.todayHabitP}>오늘의 습관</p>
                <button
                  className={styles.listModifyButton}
                  onClick={handleForm}
                >
                  {isCheckMode ? '목록 수정' : '완료'}
                </button>
              </div>

              {habits.length === 0 && isCheckMode && (
                <div className={styles.todayHabitBoard}>
                  <p>
                    아직 습관이 없어요
                    <br /> 목록 수정을 눌러 습관을 생성해보세요
                  </p>
                </div>
              )}
              {(habits.length > 0 || !isCheckMode) && (
                <>
                  <HabitList
                    habits={habits}
                    isCheckMode={isCheckMode}
                    onDeleteHabit={handleDeleteHabit}
                    onCheckHabit={handleCheckHabit}
                    onUpdateHabit={handleUpdateHabit}
                  />
                  {!isCheckMode && <HabitForm onAddHabit={handleAddHabit} />}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContainer>
    </section>
  );
}

export default HabitPage;
