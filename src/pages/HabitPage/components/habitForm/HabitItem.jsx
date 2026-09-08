import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './HabitForm.module.css';
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
    showToast(`${habit.name}을 선택했습니다`, 'success');
  };

  return (
    <li className={styles.habitItem}>
      {isEditing ? (
        <input
          value={editHabit}
          onChange={(e) => setEditHabit(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onClick={(e) => e.stopPropagation()}
          autoFocus
          className={styles.habitInputEdit}
        />
      ) : (
        <div
          className={clsx(
            styles.habitItem,
            habit.isCompleted && styles.checked,
          )}
          onClick={handleClick}
        >
          {habit.name}
        </div>
      )}
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
