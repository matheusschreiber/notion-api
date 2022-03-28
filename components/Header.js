import { FiGithub } from 'react-icons/fi'

import styles from '../styles/components/Header.module.css'

export default function Header(){
  return(
    <div className={styles.header_wrapper}>
      <h1>NOTION</h1>
      <h3>API USAGE FOR PERSONAL ORGANIZATION <span><FiGithub /> matheusschreiber</span></h3> 
    </div>
  )
}