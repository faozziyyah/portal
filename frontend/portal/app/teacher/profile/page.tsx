"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sidemenu } from '@/app/dashboard/Sidemenu'
import Header from '@/app/dashboard/Header'
const TeacherProfile = () => {
  return (

    <div className='flex h-screen bg-white text-black'>

      <Sidemenu />

      <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

        <Header />

        <div className='flex justify-between items-center w-4/5 m-auto mt-16'>

          <Image src='/images/avatar-6.jpg' alt='' width='300' height='250' id='' className='rounded-2xl' />

          <aside className='flex flex-col items-start w-3/5'>
            
            <h2 className='text-black font-bold text-2xl'>John Doe</h2>
            
            <p className='text-black text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quaerat quas impedit error sequi tempora eveniet distinctio maxime repellendus? Iusto, quas nisi. Debitis blanditiis odio quisquam. Provident enim minus quibusdam.</p>
            
            <p> <b>Skills:</b> <Link href='/dashboard/courses' className='text-purple-700 font-bold'> python, react</Link> </p>
            
          </aside>

        </div>

        <div>
            Courses list
        </div>
      
      </section>

    </div>
  )
}

export default TeacherProfile