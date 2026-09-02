import { useRef, useState } from "react";
import styles from './HabitForm.module.css';
import btnDeterminate from '/src/assets/btn_determinate.svg';

export function AddHabitForm(){

 
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState('');
  const inputRef = useRef(null);


  const resetForm = () => {
     setHabit('');
  }
  
  // const closeForm = () => {s
  //   setBody('');
  //   setIsFormOpen(false);
  // };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      
      setHabits([...habits, habit]);
      resetForm();
    } catch{
    alert('습관 등록에 실패했습니다. 다시 시도해 주세요.');
  console.error('Failed to add post:');
    }
  };

  const handleHabitDelete = (e, targetIndex)=>{
    e.stopPropagation();
    setHabits((prevhabits) => prevhabits.filter((_, index) => index !== targetIndex));
  }

  return (
    <>
    <form
    id="add-habit-form"
    onSubmit={handleSubmit}
    className={styles.habitFormDiv}>
    <div className={styles.habitFormInner}>
    <h1 className={styles.habitFormTitle}>
      습관 목록
    </h1>
    <div className={styles.addHabitDiv}>
   <div className= {styles.addHabitInnerDiv}>
      <ul className={styles.habitListField}>
       
        {habits.map((habitItem, index) => (
          <li className={styles.habit} key={index}>
           <div className={styles.habitTitle}>
            {habitItem}
            </div>

             <div className={styles.habitDeleteButtonDiv}>
          <button
          type="button"
          className={styles.deleteButtonWrapper}
           onClick={(e) => handleHabitDelete(e, index)}
           >
          <img className={styles.habitDeleteButton}
          src={btnDeterminate}
          alt="예시 이미지 입니다"/>
          </button>
          </div>
              </li>
        ))}
        
      </ul>
        <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        className={styles.habitInput}
        ref={inputRef}
        />
        </div>
      <div className={styles.buttonDiv}>
        <button className={styles.cancleButton}>
        취소
        </button>
        <button className={styles.fixButton}>
         수정완료
        </button>
      </div>

    </div>
    </div>
    </form>
    </>
  )

}