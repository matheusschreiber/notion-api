import { FiX  } from 'react-icons/fi';

import styles from '../styles/components/CalendarItem.module.css'

export default function CalendarItem({date, text}){
  return (
    <div className={styles.calendar_item_wrapper}>
      <div className={styles.remove_tag}><FiX id={styles.remove_task}/></div>
      <h4>{date} {text.toUpperCase()}</h4>
    </div>
  )
}