import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'
import CalendarItem from '../components/CalendarItem'
import TaskItem from '../components/TaskItem'
import AddTask from '../components/AddTask'

import { FiCalendar, FiClipboard, FiX, FiCheck } from 'react-icons/fi'

export default function Home() {
  const [ addingTask, setAddingTask ] = useState();
  const [ newTaskData, setNewTaskData ] = useState();
  const [ update, setUpdate ] = useState([]);

  function handleSubmit(save){
    let array = update.slice()
    array.push([])
    setUpdate(array)
    setAddingTask(false);
    
    if (!save) return   
    
    PROBLEMA DE ASSINCRONISMO AQUI!!!!!!
  }

  function getData(data){
    setNewTaskData(data);
  }


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
          <div className={styles.calendar_icon_wrapper}><FiCalendar className={styles.icon} id={styles.calendar_icon}/></div>
          
          <div className={styles.month_wrapper}>
            <h1>MARÇO</h1>
            <CalendarItem date={"28/03"} text={"Evento"}/>
            <CalendarItem date={"28/03"} text={"Outro evento"}/>
          </div>
        </aside>


        <aside className={styles.tasks_container}>
          <div className={styles.tasks_icon_wrapper}
            onClick={()=>setAddingTask(true)}>
            
            <FiClipboard className={styles.icon} id={styles.tasks_icon} 
              style={!addingTask?{display:'flex', fontSize:'20pt'}:{display:'none'}}/>

            <div style={addingTask?{display:'flex', fontSize:'20pt'}:{display:'none'}}>
              <div onClick={()=>handleSubmit(false)}><FiX color={'var(--red)'}/></div>
              <div onClick={()=>handleSubmit(true)}><FiCheck color={'var(--green)'}/></div>
            </div>
          </div>

          <div className={styles.tasks_inside_container}>
            <AddTask shown={addingTask} getData={getData} update={update}/>
            <TaskItem 
              date={"28/03"}
              title={"FRONTEND INTROCOMP"} 
              priority={"🔥"}
              status={"✍🏻"}
              subtasks={["Alinhar tal coisa", "Mudar outra coisa", "Mudar isso também"]}
              done={false}/>
            <TaskItem 
              date={"28/03"}
              title={"FRONTEND INTROCOMP"} 
              priority={"🧊"}
              status={"⌛"}
              subtasks={["Alinhar tal coisa", "Mudar outra coisa", "Mudar isso também"]}
              done={false}/>
            <TaskItem 
              date={"28/03"}
              title={"FRONTEND INTROCOMP"} 
              priority={"⛅"}
              status={"⌛"}
              subtasks={["Alinhar tal coisa", "Mudar outra coisa", "Mudar isso também"]}
              done={false}/>
            <TaskItem 
              date={"28/03"}
              title={"FRONTEND INTROCOMP"} 
              priority={"🔥"}
              status={"✅"}
              subtasks={["Alinhar tal coisa", "Mudar outra coisa", "Mudar isso também"]}
              done={false}/>
            <TaskItem 
              date={"28/03"}
              title={"FRONTEND INTROCOMP"} 
              priority={"🔥"}
              status={"⌛"}
              subtasks={["Alinhar tal coisa", "Mudar outra coisa", "Mudar isso também"]}
              done={true}/>
          </div>
        </aside>

      </main>
    </div>
  )
}
