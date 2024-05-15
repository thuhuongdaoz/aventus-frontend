import React from 'react'
import Header from '../layout/Header'
import Content from '../layout/Content'
import { Outlet } from 'react-router-dom'


export default function Home() {
    return (
        <div>
           <Header/>
           <Outlet/>
        </div>
    )
}
