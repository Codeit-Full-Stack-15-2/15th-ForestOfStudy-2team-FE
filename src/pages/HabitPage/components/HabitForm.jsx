import { useState } from 'react';
import btnDeterminate from '@/assets/habitPage/btn_determinate.svg';
import { useToast } from '@/components/toast/ToastContext';
import styles from './HabitForm.module.css';

export function AddHabitForm({ habits = [], setHabits, isCheckMode }) {
  const { showToast } = useToast();

  const [newhabit, setNewHabit] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editHabit, setEditHabit] = useState('');
  const [checkIndexs, setCheckIndexs] = useState([]);

  const resetForm = () => {
    setNewHabit('');
  };

  // const closeForm = () => {s
  //   setBody('');
  //   setIsFormOpen(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    if (!newhabit.trim()) return;

    try {
      setHabits([...habits, newhabit]);
      resetForm();
    } catch {
      alert('습관 등록에 실패했습니다. 다시 시도해 주세요.');
      console.error('Failed to add post:');
    }
  };

  const handleHabitEdit = (habitItem, index) => {
    setEditingIndex(index);
    setEditHabit(habitItem);
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    if (!editHabit.trim()) return;

    setHabits((prevHabits) =>
      prevHabits.map((habit, habitIndex) =>
        habitIndex === index ? editHabit : habit,
      ),
    );

    setEditingIndex(null);
    setEditHabit('');
  };

  const handleHabitDelete = (deleteHabit) => {
    setHabits((prevHabit) =>
      prevHabit.filter((habit) => habit !== deleteHabit),
    );
  };

  const handleHabitCheck = (habitItem, index) => {
    setCheckIndexs((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }

      return [...prev, index];
    });
    showToast(`🎉 ${habitItem}을 선택하셨습니다.`, 'success');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.addHabitUlDiv}>
          <ul onSubmit={handleSubmit} className={styles.habitListField}>
            {habits.map((habitItem, index) => (
              <li className={styles.habit} key={index}>
                {!isCheckMode && editingIndex === index ? (
                  <input
                    value={editHabit}
                    onChange={(e) => setEditHabit(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, index)}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.habitInputEdit}
                    autoFocus
                  />
                ) : (
                  <div
                    className={`${styles.habit} ${checkIndexs.includes(index) ? styles.checked : ''}`}
                    onClick={() => {
                      if (!isCheckMode) {
                        handleHabitEdit(habitItem, index);
                      } else {
                        handleHabitCheck(habitItem, index);
                      }
                    }}
                  >
                    {habitItem}
                  </div>
                )}
                {!isCheckMode && (
                  <button
                    type="button"
                    className={`${styles.deleteButton} ${styles.deleteButtonOuter}`}
                    onClick={() => handleHabitDelete(habitItem)}
                  >
                    <img
                      className={styles.habitDeleteButton}
                      src={btnDeterminate}
                      alt="쓰레기통 이미지"
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {!isCheckMode && (
            <input
              value={newhabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.habitInput}
            />
          )}
        </div>
      </div>
    </>
  );
}
