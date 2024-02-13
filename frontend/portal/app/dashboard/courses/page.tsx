"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sidemenu } from '../Sidemenu';
import Header from '../Header';

const Courses = () => {
  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4'>

          <h1>Courses</h1>

          <Header />

        </section>
    
    </div>
  )
}

export default Courses