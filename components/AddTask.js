import { useState, useEffect } from 'react';

import styles from '../styles/components/AddTask.module.css'

export default function AddTask({shown=false, getData, update}){
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

  

  useEffect(()=>{
    let data = {priority, status, date, title, subtasks}
    getData(data)    
  },[update])

  return(
    <div className={styles.addtask_item_wrapper} style={shown?{}:{display:'none'}}>
      <label>Insira a data: </label>
      <input type="date" onChange={(e)=>setDate(e.target.value)}/>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <select className={styles.priority_selector} onChange={(e)=>setPriority(e.target.value)}>
          <option hidden>PRIORIDADE</option>
          <option value={"🔥"}>🔥ALTA</option>
          <option value={"⛅"}>⛅MÉDIA</option>
          <option value={"🧊"}>🧊BAIXA</option>
        </select>

        <select className={styles.status_selector} onChange={(e)=>setStatus(e.target.value)}>
          <option hidden>STATUS</option>
          <option value={"⌛"}>⌛Não Iniciada</option>
          <option value={"✍🏻"}>✍🏻Iniciada</option>
          <option value={"✅"}>✅Terminada</option>
        </select>
      </div>
      

      
      <input type="text" id={1} placeholder="INSIRA O TITULO" onChange={(e)=>setTitle(e.target.value)}/>
      
      {
        subtasks.map((i)=>(
          <input key={subtasks.indexOf(i)} type="text" id={2} 
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