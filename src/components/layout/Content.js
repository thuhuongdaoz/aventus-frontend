import React from 'react'
import SearchJob from '../jobs/SearchJob'

import './content.css'

export default function Content() {
  const role = localStorage.getItem('role')
  return (
    <div className='content'>
      {role === "CANDIDATE" ? <SearchJob /> : <div>Home employer</div>}
    </div>
  )
}
