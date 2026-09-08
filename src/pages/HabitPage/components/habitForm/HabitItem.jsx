import { useState } from 'react';
import clsx from 'clsx';
import styles from './HabitForm.module.css';
import btnDeterminate from '@/assets/habitPage/btn_determinate.svg';

function HabitItem({ habit, isCheckMode, onDeleteHabit, onCheckHabit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editHabit, setEditHabit] = useState(habit.name);

  const handleEditKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    const habitName = editHabit.trim();

    if (!habitName) return;

    // 나중에 Patch 부분
    console.log('수정:', habit.id, habitName);

    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isCheckMode) {
      setIsEditing(true);
      return;
    }

    onCheckHabit(habit.id);
  };

  return (
    <li className={styles.habitItem}>
      {isEditing ? (
        <input
          value={editHabit}
          onChange={(e) => setEditHabit(e.target.value)}
          onKeyDown={handleEditKeyDown}
          autoFocus
          className={styles.habitInputEdit}
        />
      ) : (
        <div
          className={clsx(styles.habit, habit.isCompleted && styles.checked)}
          onClick={handleClick}
        >
          {habit.name}
        </div>
      )}
      {!isCheckMode && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDeleteHabit(habit.id)}
        >
          <img src={btnDeterminate} alt="쓰레기통 이미지" />
        </button>
      )}
    </li>
  );
}

export default HabitItem;
