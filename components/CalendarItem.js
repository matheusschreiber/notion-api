import { useEffect } from 'react'
import { FiX  } from 'react-icons/fi';

import styles from '../styles/components/CalendarItem.module.css'

import api from '../services/api'

export default function CalendarItem({id, date, text, update}){

  async function deleteHandler(){
    if (!confirm("Deletar Evento?")) return
    await api.post('/api/deleteTask', {id})
    update()
  }

  useEffect(()=>{
    console.log(text)
  },[])

  return (
    <div className={styles.calendar_item_wrapper}>
      <div className={styles.remove_tag} onClick={deleteHandler}><FiX id={styles.remove_task}/></div>
      <div className={styles.date_time_event} id={styles.date}>{date.split('-')[2]}/{date.split('-')[1]}</div>
      <div className={styles.date_time_event} id={styles.time}>{text.slice(0,5)}</div>
      <div className={styles.date_time_event} id={styles.event}>{text.slice(5).toUpperCase()}</div>
    </div>
  )
}