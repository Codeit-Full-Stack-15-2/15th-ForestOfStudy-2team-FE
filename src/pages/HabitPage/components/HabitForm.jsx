import { useRef, useState } from "react";
import styles from './HabitForm.module.css';
import btnDeterminate from '/src/assets/btn_determinate.svg';


export function AddHabitForm({habits = [], setHabits}){

  const [habit, setHabit] = useState('');
  const inputRef = useRef(null);


  const resetForm = () => {
     setHabit('');
  }
  
  // const closeForm = () => {s
  //   setBody('');
  //   setIsFormOpen(false);
  // };

const handleSubmit = (e) =>{
   e.preventDefault();
};

  const handleKeyDown = (e) =>{
    if (e.key !== 'Enter') return;
        e.preventDefault();
  
        if(!habit.trim())return;
  
    try {
      setHabits([...habits, habit]);
      resetForm();
    } catch{
    alert('습관 등록에 실패했습니다. 다시 시도해 주세요.');
  console.error('Failed to add post:');
    }

  };

  const handleHabitDelete = (deleteHabit)=>{

   setHabits((prevHabit) => prevHabit.filter((habit) => habit !==deleteHabit));
 
  }

  return (
    <>
    <form
    id="add-habit-form"
    onSubmit={handleSubmit}
    className={styles.habitFormDiv}>
    <div className={styles.habitFormInner}>
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
           onClick={() => handleHabitDelete(habitItem)}
           >
          <img className={styles.habitDeleteButton}
          src={btnDeterminate}
          alt="쓰레기통 이미지"/>
          </button>
          </div>
              </li>
        ))}
        
      </ul>
        <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.habitInput}
        ref={inputRef}
        />
        </div>
  

    </div>
    </div>
    </form>
    </>
  )

}
