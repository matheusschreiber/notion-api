import { useState, useEffect } from 'react'
import { FiX, FiCircle, FiCheckCircle } from 'react-icons/fi'
import styles from '../styles/components/TaskItem.module.css'

import api from '../services/api'

export default function TaskItem({id, date, title, subtasks, priority, status, done, update}){
  const [ bgColorPriority, setBgColorPriority ] = useState('var(--red)');
  const [ bgColorStatus, setBgColorStatus ] = useState('var(--red)');
  const [ isDone, setIsDone ] = useState(done);

  async function deleteHandler(){
    if (!confirm("Deletar Tarefa?")) return
    await api.post('/api/deleteItem', {id})
    update()
  }

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
          <p style={isDone?{color:'var(--dark_gray)'}:{}}>{date.split('-')[2]}/{date.split('-')[1]}</p>
        </div>
        <div style={{display:'flex'}}>
          <div className={styles.priority_tag} style={{backgroundColor: bgColorPriority}}>{priority}</div>
          <div className={styles.status_tag} style={{backgroundColor: bgColorStatus}}>{status}</div>
          <div className={styles.remove_tag} onClick={deleteHandler}><FiX id={styles.remove_task}/></div>
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