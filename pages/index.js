import {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'
import CalendarItem from '../components/CalendarItem'
import TaskItem from '../components/TaskItem'
import AddTask from '../components/AddTask'

import { Dots } from "react-activity";
import "react-activity/dist/library.css";

import api from  '../services/api'

import { FiCalendar, FiClipboard, FiX, FiCheck, FiPlus } from 'react-icons/fi'

export default function Home() {
  const [ tasks, setTasks ] = useState([]);
  const [ addingTask, setAddingTask ] = useState(1);
  const [ loading, setLoading ] = useState(false);

  async function getItems(){
    setLoading(true)
    const { data } = await api.get('/api/getItems')
    setTasks(data)
    setLoading(false)
  }

  useEffect(()=>{
    getItems()
  },[])

  return (
    <div>
      <Head>
        <title>Notion</title>
        <meta name="description" content="NOTION API Workflow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>

        <aside className={styles.calendar_container}>
          <div className={styles.calendar_icon_wrapper}>
            <FiCalendar className={styles.icon} id={styles.calendar_icon}/>
            <FiPlus className={styles.icon} id={styles.add_calendar_icon} />
          </div>
          
          <div className={styles.month_wrapper}>
            <h1>MARÇO</h1>
            <CalendarItem date={"28/03"} text={"Evento"}/>
            <CalendarItem date={"28/03"} text={"Outro evento"}/>
          </div>
        </aside>

        
        <aside className={styles.tasks_container} style={!addingTask?{borderColor:'var(--yellow)'}:{}}>
          <div className={styles.tasks_icon_wrapper}>
            <div onClick={()=>setAddingTask(0)}>
              <FiClipboard className={styles.icon} id={styles.tasks_icon} 
                style={addingTask?{}:{display:'none'}}/>
              <FiPlus className={styles.icon}
                id={styles.add_tasks_icon}
                style={addingTask?{}:{display:'none'}}/>
            </div>
            <div style={!addingTask?{display:'flex', fontSize:'20pt'}:{display:'none'}}>
              <div onClick={()=>setAddingTask(2)}><FiX color={'var(--red)'} strokeWidth={4}/></div>
              <div onClick={()=>setAddingTask(3)}><FiCheck color={'var(--green)'} strokeWidth={4}/></div>
            </div>
          </div>

          <Dots className={styles.loading_icon} style={loading?{}:{display:'none'}}/>
          <div className={styles.tasks_inside_container}>
            <AddTask shown={addingTask} update={getItems}/>
            {
              tasks.map((t)=>(
                <TaskItem 
                  key={t.title}
                  id={t.id}
                  date={t.date}
                  title={t.title} 
                  priority={t.priority=="high"?"🔥":t.priority=="medium"?"⛅":"🧊"}
                  status={t.status=="not started"?"⌛":t.status=="started"?"✍🏻":"✅"}
                  subtasks={t.subtasks}
                  done={false}
                  update={getItems}/>
              ))
            }
          </div>
        </aside>

      </main>
    </div>
  )
}
