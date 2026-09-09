import HabitItem from './HabitItem';
import styles from './HabitList.module.css';

function HabitList({
  habits,
  isCheckMode,
  onDeleteHabit,
  onCheckHabit,
  onUpdateHabit,
}) {
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
            onUpdateHabit={onUpdateHabit}
          />
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
