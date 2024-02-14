"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sidemenu } from '../Sidemenu';
import Header from '../Header';

const CourseDetail = () => {
  return (

    <div className='flex h-screen bg-white text-black'>

      <Sidemenu />

      <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

        <Header />

        <div className='flex justify-between items-center w-4/5 m-auto mt-16'>

          <Image src='/images/bg.jpg' alt='' width='300' height='250' id='' className='rounded-2xl' />

          <aside className='flex flex-col items-start w-3/5'>
            
            <h2 className='text-black font-bold text-2xl'>Course title</h2>
            
            <p className='text-black text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quaerat quas impedit error sequi tempora eveniet distinctio maxime repellendus? Iusto, quas nisi. Debitis blanditiis odio quisquam. Provident enim minus quibusdam.</p>
            
            <p> <b>Course By:</b> <Link href='/dashboard/courses' className='text-purple-700 font-bold'> Teacher name</Link> </p>
            
            <p> <b>Category:</b> <Link href='/dashboard/courses' className='text-purple-700 font-bold'> Category name</Link> </p>
            
            <p> <b>Total Enrolled:</b> <Link href='/dashboard/courses' className='text-purple-700 font-bold'> 500 students</Link> </p>
            
            <button className='btn bg-purple-700 font-semibold px-4 py-1 rounded-lg text-white hover:bg-white hover:text-black'>Enroll</button>
            
          </aside>

        </div>
      
      </section>

    </div>

  )
}

export default CourseDetail