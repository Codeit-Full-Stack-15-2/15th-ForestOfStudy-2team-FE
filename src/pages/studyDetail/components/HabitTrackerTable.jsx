import React from 'react';
import styles from './HabitTracker.module.css';
import StampIcon from './StampIcon';

const DAYS = ['월', '화', '수', '목', '금', '토', '일 '];

function HabitTrackerTable({ habits }) {
  return (
    <section className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.emptyCorner}></div>
        {DAYS.map((day) => (
          <span key={day} className={styles.dayHeader}>
            {day}
          </span>
        ))}

        {habits.map((habit) => (
          <React.Fragment key={habit.id}>
            <span className={styles.habitTitle}>{habit.title}</span>
            {habit.records.map((record) => (
              <StampIcon key={record.day} isCompleted={record.isCompleted} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default HabitTrackerTable;
