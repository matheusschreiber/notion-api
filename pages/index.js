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
import AddCalendarItem from '../components/AddCalendarItem'

export default function Home() {
  const [ tasks, setTasks ] = useState([]);
  const [ calendar, setCalendar ] = useState([]);
  const [ months, setMonths ] = useState(["carregando primeiro mês...","carregando segundo mês...","carregando terceiro mês..."]);

  const [ addingTask, setAddingTask ] = useState(1);
  const [ addingCalendar, setAddingCalendar ] = useState(1);

  const [ loadingTasks, setLoadingTasks ] = useState(false);
  const [ loadingCalendar, setLoadingCalendar ] = useState(false);

  async function getTasks(task=undefined){
    setLoadingTasks(true)
    if (task){
      await api.post('/api/updateTask', task)
    }
    const { data } = await api.get('/api/getTasks')

    //The notion api has a sort algorithm, see that later
    data.sort((a,b)=>{
      if (a.done && !b.done) return 1;
      else if (!a.done && b.done) return -1;
      else return 0
    })
    console.log(data)

    setTasks(data)
    setLoadingTasks(false)
  }

  async function getCalendar(){
    setLoadingCalendar(true)

    const {data} = await api.get('/api/getCalendar')
    setCalendar(data) 
    setLoadingCalendar(false)
  }

  function updateMonth(){
    const date = new Date
    let j = date.getMonth()
    let array=[]
    for(let i=0;i<3;i++){
      array.push(j)
      j++;
      if (j==12) j=0
    }
    setMonths(array)
  }

  function integerToMonth(i){
    switch(i){
      case 0: return "JANEIRO";
      case 1: return "FEVEREIRO";
      case 2: return "MARÇO";
      case 3: return "ABRIL";
      case 4: return "MAIO";
      case 5: return "JUNHO";
      case 6: return "JULHO";
      case 7: return "AGOSTO";
      case 8: return "SETEMBRO";
      case 9: return "OUTUBRO";
      case 10: return "NOVEMBRO";
      case 11: return "DEZEMBRO";
    }
  }
  
  async function fetchData(){
    updateMonth()
    getTasks()
    getCalendar()
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className={styles.parent_container}>
      <Head>
        <title>Notion</title>
        <meta name="description" content="NOTION API Workflow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <h4>PASSE O MOUSE SOBRE OS ICONES DOS PAINEIS (CALENDARIO E PRANCHETA) PARA ADICIONAR UM ITEM</h4>
      <main className={styles.main}>
        <aside className={styles.calendar_container} style={!addingCalendar?{borderColor:'var(--yellow)'}:{}}>
          <div className={styles.calendar_icon_wrapper}>
            <div onClick={()=>setAddingCalendar(0)}>
              <FiCalendar className={styles.icon}
                id={styles.calendar_icon} 
                style={addingCalendar?{}:{display:'none'}}/>
              <FiPlus className={styles.icon}
                id={styles.add_calendar_icon}
                style={addingCalendar?{}:{display:'none'}}/>
            </div>
            <div style={!addingCalendar?{display:'flex', fontSize:'20pt'}:{display:'none'}}>
              <div onClick={()=>setAddingCalendar(2)}><FiX color={'var(--red)'} strokeWidth={4}/></div>
              <div onClick={()=>{setAddingCalendar(3); getCalendar()}}><FiCheck color={'var(--green)'} strokeWidth={4}/></div>
            </div>
          </div>          
          
          <Dots className={styles.loading_icon} style={loadingCalendar?{}:{display:'none'}}/>
          <AddCalendarItem shown={addingCalendar} update={getCalendar} />
          <div className={styles.month_wrapper}>
            {
              months.map((i,indexI)=>(
                <div key={i+'div'}>
                  <h1 key={i}>{integerToMonth(i)}</h1>
                  {
                    calendar!=[]?
                    calendar.map((c, indexC)=>(
                      (parseInt(c.date.slice(5,7))==i+1)
                      ?
                      <CalendarItem 
                        key={`${indexI}_${indexC}`}
                        id={c.id}
                        date={c.date} 
                        text={c.title}
                        update={getCalendar}/>
                      :
                      ""
                    )) : ""
                  }
                </div>
              ))
            }
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
              <div onClick={()=>{setAddingTask(3); getTasks()}}><FiCheck color={'var(--green)'} strokeWidth={4}/></div>
            </div>
          </div>

          <Dots className={styles.loading_icon} style={loadingTasks?{}:{display:'none'}}/>
          <div className={styles.tasks_inside_container}>
            <AddTask shown={addingTask} update={getTasks}/>
            {
              tasks.map((t)=>(
                <TaskItem 
                  key={t.title}
                  id={t.id}
                  date={t.date}
                  title={t.title} 
                  priority={t.priority=="High"?"🔥":t.priority=="Medium"?"⛅":"🧊"}
                  status={t.status=="Not Started"?"⌛":t.status=="In Progress"?"✍🏻":"✅"}
                  subtasks={t.subtasks}
                  done={t.done}
                  update={getTasks}/>
              ))
            }
          </div>
        </aside>

      </main>
    </div>
  )
}
