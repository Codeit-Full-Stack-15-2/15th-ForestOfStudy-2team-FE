import { useState } from 'react';
import styles from './HabitInput.module.css';

function HabitForm({ onAddTempHabit }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    if (e.nativeEvent.isComposing) return;

    e.preventDefault();
    const habitName = inputValue.trim();
    if (!habitName) return;

    onAddTempHabit(habitName);
    setInputValue('');
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      maxLength={15}
      className={styles.habitInput}
      placeholder="추가하고 싶은 습관 입력 후 엔터"
    />
  );
}

export default HabitForm;
