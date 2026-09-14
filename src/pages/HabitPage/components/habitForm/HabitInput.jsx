import styles from './HabitInput.module.css';

function HabitForm({ newHabit, setNewHabit }) {
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
  };

  return (
    <input
      value={newHabit}
      onChange={(e) => setNewHabit(e.target.value)}
      onKeyDown={handleKeyDown}
      className={styles.habitInput}
      placeholder="추가하고 싶은 습관 입력 후 엔터"
    />
  );
}

export default HabitForm;
