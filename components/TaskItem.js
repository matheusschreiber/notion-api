import react, { useState, useEffect } from 'react'
import { FiX, FiCircle, FiCheckCircle } from 'react-icons/fi'
import styles from '../styles/components/TaskItem.module.css'

export default function TaskItem({date, title, subtasks, priority, status, done}){
  const [ bgColorPriority, setBgColorPriority ] = useState('var(--red)');
  const [ bgColorStatus, setBgColorStatus ] = useState('var(--red)');
  const [ isDone, setIsDone ] = useState(done);

  useEffect(()=>{
    switch(priority){
      case "🔥":
        setBgColorPriority('var(--red)');
        break;
      case "⛅":
        setBgColorPriority('var(--light_yellow)');
        break;
      case "🧊":
        setBgColorPriority('var(--blue)');
        break;
    }


    switch(status){
      case "⌛":
        setBgColorStatus('var(--red)');
        break;
      case "✅":
        setBgColorStatus('var(--green)');
        break;
      case "✍🏻":
        setBgColorStatus('var(--blue)');
        break;
    }

    if (isDone) {
      setBgColorPriority('var(--dark_gray)');
      setBgColorStatus('var(--dark_gray)');
    }
  }, [isDone])

  return(
    <div className={styles.task_item_wrapper}>
      <div className={styles.tag_container}>
        <div style={{display:'flex'}}>
          <div onClick={()=>setIsDone(!isDone)}>
            <FiCircle id={styles.task_check} style={isDone?{display:'none'}:{}}/>
            <FiCheckCircle id={styles.task_check} style={isDone?{color:'var(--dark_gray)'}:{display:'none'}}/>
          </div>
          <p style={isDone?{color:'var(--dark_gray)'}:{}}>{date}</p>
        </div>
        <div style={{display:'flex'}}>
          <div className={styles.priority_tag} style={{backgroundColor: bgColorPriority}}>{priority}</div>
          <div className={styles.status_tag} style={{backgroundColor: bgColorStatus}}>{status}</div>
          <div className={styles.remove_tag}><FiX id={styles.remove_task}/></div>
        </div>
      </div> 
      <h1 style={isDone?{color:'var(--dark_gray)'}:{}}>{title}</h1>

      <ul style={isDone?{color:'var(--dark_gray)'}:{}}>
        {
          subtasks.map((i)=>(
            <li key={i}>{i}</li>
          ))
        }
      </ul>
    </div>
  )
}