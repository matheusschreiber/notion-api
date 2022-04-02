import { useState, useEffect } from 'react'
import { FiX, FiCircle, FiCheckCircle } from 'react-icons/fi'
import styles from '../styles/components/TaskItem.module.css'

import api from '../services/api'

export default function TaskItem({id, date, title, subtasks, priority, status, done, update }){
  const [ bgColorPriority, setBgColorPriority ] = useState('var(--red)');
  const [ bgColorStatus, setBgColorStatus ] = useState('var(--red)');
  const [ isDone, setIsDone ] = useState(done);
  
  const [ changed, setChanged ] = useState(false);
  const [ priorityState, setPriority ] = useState(priority)
  const [ statusState, setStatus ] = useState(status)

  async function deleteHandler(){
    if (!confirm("Deletar Tarefa?")) return
    await api.post('/api/deleteTask', {id})
    update()
  }

  async function changePriority(){
    setChanged(true)
    if (priorityState=="🔥") { setPriority("⛅"); setBgColorPriority('var(--light_yellow)'); }
    else if (priorityState=="⛅") { setPriority("🧊"); setBgColorPriority('var(--blue)');}
    else if (priorityState=="🧊") { setPriority("🔥"); setBgColorPriority('var(--red)');}
  }

  async function changeStatus(){
    setChanged(true)
    if (statusState=="⌛") { setStatus("✍🏻"); setBgColorStatus('var(--blue)');}
    else if (statusState=="✍🏻") { setStatus("✅"); setBgColorStatus('var(--green)');}
    else if (statusState=="✅") { setStatus("⌛"); setBgColorStatus('var(--red)');}
  }

  async function updateChanges(){
    let task ={
      id,
      title,
      subtasks,
      priority:priorityState=="🔥"?"High":priorityState=="⛅"?"Medium":"Low",
      status:statusState=="⌛"?"Not Started":statusState=="✍🏻"?"In Progress":"Completed",
      done:isDone,
      date
    }
    update(task)
    setChanged(false)
  }
 
  useEffect(()=>{  
    
    if (isDone) {
      setBgColorPriority('var(--dark_gray)');
      setBgColorStatus('var(--dark_gray)');
    } else {
      console.log(priorityState)
      switch(priorityState){
        case "🔥":
          console.log(1)
          setBgColorPriority('var(--red)');
          break;
        case "⛅":
          console.log(2)
          setBgColorPriority('var(--light_yellow)');
          break;
        case "🧊":
          console.log(3)
          setBgColorPriority('var(--blue)');
          break;
      }
    
      switch(statusState){
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
    }
  }, [isDone])

  return(
    <div className={styles.task_item_wrapper}>
      <div className={styles.tag_container}>
        <div style={{display:'flex'}}>
          <div onClick={()=>{setIsDone(!isDone); setChanged(true)}}>
            <FiCircle id={styles.task_check} style={isDone?{display:'none'}:{}}/>
            <FiCheckCircle id={styles.task_check} style={isDone?{color:'var(--dark_gray)'}:{display:'none'}}/>
          </div>
          <p style={isDone?{color:'var(--dark_gray)'}:{}}>{date.split('-')[2]}/{date.split('-')[1]}</p>
        </div>
        <div style={{display:'flex'}}>
          <div className={styles.change_warning} style={changed?{}:{display:'none'}}
            onClick={updateChanges}
            title="Update Changes">⚠️</div>
          
          <div className={styles.priority_tag} style={{backgroundColor: bgColorPriority}}
            onClick={changePriority}>{priorityState}</div>
          
          <div className={styles.status_tag} style={{backgroundColor: bgColorStatus}}
            onClick={changeStatus}>{statusState}</div>


          <div className={styles.remove_tag} onClick={deleteHandler}><FiX id={styles.remove_task}/></div>
        </div>
      </div> 
      <h1 style={isDone?{color:'var(--dark_gray)'}:{}}>{title}</h1>

      <ul style={isDone?{color:'var(--dark_gray)'}:{}}>
        {
          // subtasks.map((i)=>(
          //   <li key={id + i}>{i}</li>
          // ))
        }
      </ul>
    </div>
  )
}