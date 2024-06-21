import React from 'react'
import SearchJob from '../jobs/SearchJob'

import './content.css'
import SearchApplication from '../application/SearchAplication'
import ListUser from '../user/ListUser'

export default function Content() {
  const role = localStorage.getItem('role')
  return (
    <div className='content'>
      {role === "ADMIN" ? <ListUser/> : (role === "CANDIDATE" ? <SearchJob /> : <SearchApplication/>) }
    </div>
  )
}
