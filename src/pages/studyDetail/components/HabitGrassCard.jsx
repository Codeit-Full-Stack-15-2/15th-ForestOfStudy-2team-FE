import GrassCell from './GrassCell';
import styles from './HabitGrassCard.module.css';

function HabitGrassCard({ habits }) {
  return (
    <div className={styles.grassContainer}>
      {habits.map((habit) => (
        <div key={habit.id || habit.habitId} className={styles.habitCard}>
          <div className={styles.habitHeader}>
            <h3 className={styles.habitTitle}>{habit.title}</h3>
            <span className={styles.habitNickname}>{habit.nickname}</span>
          </div>

          <div className={styles.grassGrid}>
            {habit.monthlyRecords?.map((recordObj, index) => (
              <GrassCell
                key={index}
                date={recordObj.date}
                record={recordObj.record}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HabitGrassCard;
