'use client'

import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PreLoader from '../components/PreLoader'

export default function ClientRoot({ children }) {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      <PreLoader />
      <div className="container mx-auto px-6">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}


