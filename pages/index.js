import { useState } from 'react'
import Head from "next/head"

import styles from '../styles/Login.module.css'
import Router from 'next/router'

import api from '../services/api'
import Swal from 'sweetalert2'

export default function Login(){
  const [key, setKey] = useState("")
  
  async function handleSubmit(e){
    e.preventDefault()
    const {data} = await api.post('/api/autentication', {key})
    setKey("")
    if (data) {
      Swal.fire(
        'Hello',
        'And welcome back!',
        'success'
      )
      localStorage.setItem('NOTION_API_LOGIN_KEY', key)
      Router.push('/Main')
    } else{
      Swal.fire(
        'Wrong KEY',
        'Remeber to check your email',
        'error'
      )
    }
  }

  return(
    <div>
      <Head>
        <title>Matheus&apos;s Notion</title>
        <meta name="description" content="NOTION API Workflow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Login KEY"
            value={key}
            onChange={(e)=>setKey(e.target.value)}/>
          
          <input type="submit" hidden />
        </form>
      </main>

    </div>
  )
}