import { useState } from 'react';
import styles from './HabitInput.module.css';

function HabitForm({ onAddHabit }) {
  const [newHabit, setNewHabit] = useState('');

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    const habitName = newHabit.trim();

    if (!habitName) return;

    onAddHabit(habitName);
    setNewHabit('');
  };

  return (
    <input
      value={newHabit}
      onChange={(e) => setNewHabit(e.target.value)}
      onKeyDown={handleKeyDown}
      className={styles.habitInput}
    />
  );
}

export default HabitForm;
