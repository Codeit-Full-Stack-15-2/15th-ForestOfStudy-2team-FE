import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './HabitItem.module.css';
import btnDeterminate from '@/assets/habitPage/btn_determinate.svg';
import { useToast } from '@/components/toast/ToastContext';

function HabitItem({
  habit,
  isCheckMode,
  onDeleteHabit,
  onCheckHabit,
  onUpdateHabit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editHabit, setEditHabit] = useState(habit.name);
  const { showToast } = useToast();

  useEffect(() => {
    if (isCheckMode) {
      setIsEditing(false);
    }
  }, [isCheckMode]);

  const handleEditKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    const habitName = editHabit.trim();

    if (!habitName) return;

    // 나중에 Patch 부분
    onUpdateHabit(habit.id, habitName);

    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isCheckMode) {
      setIsEditing(true);
      return;
    }
    onCheckHabit(habit.id);
    showToast(`${habit.name} 달성을 축하합니다!`, 'success');
  };

  return (
    <li className={styles.habitRow}>
      <div
        className={clsx(styles.habitBox, habit.isCompleted && styles.checked)}
        onClick={handleClick}
      >
        {isEditing ? (
          <input
            value={editHabit}
            onChange={(e) => setEditHabit(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onClick={(e) => e.stopPropagation()}
            className={styles.habitInputEdit}
            autoFocus
          />
        ) : (
          <span
            className={clsx(
              styles.habitText,
              habit.isCompleted && styles.checked,
            )}
            onClick={handleClick}
          >
            {habit.name}
          </span>
        )}
      </div>
      {!isCheckMode && (
        <button
          type="button"
          className={clsx(styles.deleteButton, styles.deleteButtonOuter)}
          onClick={() => onDeleteHabit(habit.id)}
        >
          <img
            src={btnDeterminate}
            alt="쓰레기통 이미지"
            className={styles.habitDeleteButton}
          />
        </button>
      )}
    </li>
  );
}

export default HabitItem;
