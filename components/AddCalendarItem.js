import { useState, useEffect } from 'react'
import styles from '../styles/components/AddCalendarItem.module.css'

import api from '../services/api'

export default function AddCalendarItem({shown, update}){
  const [ date, setDate ] = useState();
  const [ title, setTitle ] = useState();
  const [ time, setTime ] = useState();

  const [ timeList, setTimeList ] = useState();


  async function handleSubmit(action){
    /*
      0 - Not showing
      1 - Idle (do nothing)
      2 - Discard changes
      3 - Save changes via api
    */
    if (action===2) {
      setDate("")
      setTitle("")
      setTime("")
    } else if (action===3) {
      const data = {date, title, time}
      await api.post('/api/addCalendar', data)
      
      setDate("")
      setTitle("")
      setTime("")
    }

    update()
  }

  useEffect(()=>{
    handleSubmit(shown)
  }, [shown])


  useEffect(()=>{
    let array = []
    for(let i=0;i<24;i++){
      array.push(<option key={i}>{i<=9?"0"+i:i}:00</option>)
    }
    setTimeList(array)
  }, [])

  return (
    <div className={styles.main_container_add_calendar} style={!shown?{}:{display:'none'}}>
      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
      <select value={time} onChange={(e)=>setTime(e.target.value)}>
        { timeList }
      </select>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Insira o evento"/>
    </div>
  )
}