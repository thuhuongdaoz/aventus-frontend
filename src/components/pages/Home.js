import React from 'react'
import Header from '../layout/Header'
import Content from '../layout/Content'
import Footer from '../layout/Footer'
import { Outlet } from 'react-router-dom'
import { DataProvider } from '../../DataContext';



export default function Home() {
    return (
        <div>
            <DataProvider>
                <Header />
                <Outlet />
            </DataProvider>

            {/* <Footer/> */}
        </div>
    )
}
