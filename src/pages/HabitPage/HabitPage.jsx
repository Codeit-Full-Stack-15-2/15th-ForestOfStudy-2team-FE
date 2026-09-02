
import { useState } from 'react';
import icArrowRight from '/src/assets/ic_arrow_right.svg'
import { AddHabitForm } from './components/habitForm';
import styles from './HabitPage.module.css';

function HabitPage(){

 const timeNow = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', ' ');
 const [isFormOpen, setIsFormOpen] = useState(false);

const handleForm = () =>{
  setIsFormOpen((prev) => !prev);
};
  

return (
<>
<div className={styles.habitPageDiv}>
  <div className={styles.habitInnerDiv}>
    <div className={styles.habitHead}>
      <div className={styles.habitTitle}>
  <h1>연우의 개발공장</h1> 
  <div className={styles.habitTitleButtonDiv}>
    <button className={styles.todayFocusButton}>오늘의 집중
       <img src={icArrowRight} alt='오른쪽 화살표'></img>
    </button>
    <button className={styles.homeButton}>홈
      <img src={icArrowRight} alt='오른쪽 화살표'></img>
    </button>
    </div>
  </div>
  <div className ={styles.nowTimeDiv}>
    <p className={styles.nowTimeP}>현재시간</p>
    <div className ={styles.timeBox}>
    <p className ={styles.time}>{timeNow}</p>
    </div>
     </div>
       </div>
    <div className = {styles.todayHabitDiv}>
      <div className ={styles.todayHabitInnerDiv}>
        <div className={styles.todayHabitTitle}>
          <p className={styles.todayHabitP}>오늘의 습관</p>
           <button className={styles.listModifyP}
           onClick={handleForm}
           >
            목록 수정</button>
            {isFormOpen && (
              <AddHabitForm 
            onClose={() => setIsFormOpen(false)}
            />)}
            </div>
        <div className={styles.todayHabitBoard}>
          <p>아직 습관이 없어요<br/> 목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
       
      </div>

    </div>

 
  </div>

</div>
</>
)
}

export default HabitPage;