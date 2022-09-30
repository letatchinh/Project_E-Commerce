import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../layout/client/Footer'
import Header from "../../layout/Header/Index"

export default function HomePage() {
  
  return (
    <div>
        <Header />
        <Outlet/>
        <Footer />
    </div>
  )
}
