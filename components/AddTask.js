import { useState, useEffect } from 'react';

import styles from '../styles/components/AddTask.module.css'

import api from '../services/api'

export default function AddTask({shown, update}){
  const [ priority, setPriority ] = useState();
  const [ status, setStatus ] = useState();
  const [ date, setDate ] = useState();
  const [ title, setTitle ] = useState();
  const [ subtasks, setSubtasks ] = useState(["Insira uma subtarefa"]);

  function handleNewSubTask(i){
    let j,k;
    for(j=0;j<subtasks.length;j++){
      for(k=0;k<subtasks.length;k++){
        if (subtasks[j]==subtasks[k] && j!=k && subtasks[j]!="" && subtasks[j]!="") subtasks.splice(k,1);
      } 
    }
    
    if (subtasks.indexOf(i)==subtasks.length-1){
      let array = subtasks.slice();
      array.push([])
      setSubtasks(array)
    } else {
      let index=subtasks.length-1;
      while(subtasks[index]=="") index--;
      let array = subtasks.slice(0, index+1);
      setSubtasks(array);
    }
  }

  async function handleSubmit(action){
    /*
      0 - Not showing
      1 - Idle (do nothing)
      2 - Discard changes
      3 - Save changes via api
    */
    if (action===2) {
      setPriority("")
      setStatus("")
      setDate("")
      setTitle("")
      setSubtasks(["Insira uma subtarefa"])
    } else if (action===3) {
      const data = {priority, status, date, title, subtasks:subtasks.slice(0,subtasks.length-1), done:false}
      await api.post('/api/addTask', data)
      
      setPriority("")
      setStatus("")
      setDate("")
      setTitle("")
      setSubtasks(["Insira uma subtarefa"])
    } else if (action==1) return

    update()
  }

  

  useEffect(()=>{
    handleSubmit(shown)
  },[shown])

  return(
    <div className={styles.addtask_item_wrapper} style={!shown?{}:{display:'none'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
        <label>Insira a data: </label>
        <input
          type="date"
          onChange={(e)=>setDate(e.target.value)}
          value={date}/>
      </div>

      <div className={styles.priority_status_select}>
        <select
          className={styles.priority_selector} 
          onChange={(e)=>setPriority(e.target.value)}
          value={priority}>

          <option hidden>PRIORIDADE</option>
          <option value={"High"}>🔥 alta</option>
          <option value={"Medium"}>⛅ mediana</option>
          <option value={"Low"}>🧊 baixa</option>
        </select>
        
        <select
          className={styles.status_selector}
          onChange={(e)=>setStatus(e.target.value)}
          value={status}>
          <option hidden>STATUS</option>
          <option value={"Not Started"}>⌛ não iniciada</option>
          <option value={"In Progress"}>✍🏻 iniciada</option>
          <option value={"Finished"}>✅ terminada</option>
        </select>
      </div>

      <input 
        type="text"
        id={1}
        placeholder="INSIRA O TITULO"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
      {
        subtasks.map((i)=>(
          <input 
            key={subtasks.indexOf(i)} 
            type="text"
            id={2} 
            placeholder="Insira uma subtarefa"
            onFocus={()=>handleNewSubTask(i)}
            value={subtasks[subtasks.indexOf(i)]}
            onChange={(e)=>{
              let aux = subtasks.slice()
              aux[subtasks.indexOf(i)] = e.target.value
              setSubtasks(aux);
            }}
            />
        ))
      }
    </div>
  )
}