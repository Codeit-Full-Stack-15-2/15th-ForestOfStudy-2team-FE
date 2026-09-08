import HabitItem from './HabitItem';
import styles from './HabitForm.module.css';

function HabitList({ habits, isCheckMode, onDeleteHabit, onCheckHabit }) {
  return (
    <div className={styles.addHabitUlDiv}>
      <ul className={styles.habitListField}>
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            isCheckMode={isCheckMode}
            onDeleteHabit={onDeleteHabit}
            onCheckHabit={onCheckHabit}
          />
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
