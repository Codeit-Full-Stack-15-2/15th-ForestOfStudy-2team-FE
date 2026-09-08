import { useState } from 'react';
import { AddHabitForm } from './components/habitForm';
import ArrowButton from '@/components/arrowButton/ArrowButton';
import styles from './HabitPage.module.css';
import { useStudyActions } from '../studyDetail/hooks/useStudyActions';

function HabitPage({ studyId, data }) {
  const { handleOpenFocusModal, } = useStudyActions(studyId);

  const timeNow = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .replace(' ', ' ');
  const [isUlOpen, setIsUlOpen] = useState(false);
  const [isIsHabitEmpty, setisIsHabitEmpty] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleForm = () => {
    setIsUlOpen((prev) => !prev);
    setisIsHabitEmpty((prev) => !prev);

    if (habits.length > 0) {
      setIsUlOpen(true);
      setisIsHabitEmpty(true);
      setIsCheckMode((prev) => !prev);
      return;
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.habitPageDiv}>
          <div className={styles.habitInnerDiv}>
            <div className={styles.habitHead}>
              <div className={styles.habitTitle}>
                <h1>연우의 개발공장</h1>
                <div className={styles.habitTitleButtonDiv}>
                  <div className={styles.titleContainer}>
                    <div className={styles.titleButtons}>
                      <ArrowButton onClick={handleOpenFocusModal}>
                        오늘의 집중
                      </ArrowButton>
                      <ArrowButton onClick={handleOpenFocusModal}>
                        오늘의 집중
                      </ArrowButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.nowTimeDiv}>
                <p className={styles.nowTimeP}>현재시간</p>
                <div className={styles.timeBox}>
                  <p className={styles.time}>{timeNow}</p>
                </div>
              </div>
            </div>
            <div className={styles.todayHabitDiv}>
              <div className={styles.todayHabitInnerDiv}>
                <div className={styles.todayHabitTitle}>
                  <p className={styles.todayHabitP}>오늘의 습관</p>
                  <button className={styles.listModifyButton} onClick={handleForm}>
                    목록 수정
                  </button>
                </div>
                {isUlOpen && (
                  <AddHabitForm
                    habits={habits}
                    setHabits={setHabits}
                    isCheckMode={isCheckMode}
                  />
                )}
                {!isIsHabitEmpty && (
                  <div className={styles.todayHabitBoard}>
                    <p>
                      아직 습관이 없어요
                      <br /> 목록 수정을 눌러 습관을 생성해보세요
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HabitPage;
