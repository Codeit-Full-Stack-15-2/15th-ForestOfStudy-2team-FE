import React from 'react';
import styles from './HabitTracker.module.css';
import StampIcon from './StampIcon';

const DAYS = ['월', '화', '수', '목', '금', '토', '일 '];

function HabitTrackerTable({ habits, onClick }) {
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
            {habit.weeklyRecords.map((recordObj) => (
              <StampIcon
                key={recordObj.date}
                habitStatus={habit.deletedAt}
                date={recordObj.date}
                habitId={habit.id}
                record={recordObj.record}
                onClick={onClick}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default HabitTrackerTable;
