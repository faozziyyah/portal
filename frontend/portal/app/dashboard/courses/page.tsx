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

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <h1>Courses</h1>

          <Header />

          <section className='mt-8'>

            <div className='courses-header flex justify-between items-center'>
              <p className='text-black font-bold'>Latest Courses</p>
              <Link href='/dashboard/courses' className='text-purple-700 font-bold'> See all</Link>
            </div>

            <div className='flex mt-4'>

              <Link href='/dashboard/coursedetail' className='course-box bg-white flex flex-col justify-center rounded-2xl pb-4 hover:border-2 hover:border-purple-700' style={{width: '30%'}}>

                <Image src='/images/bg.jpg' alt='' width='200' height='0' id='course-image' className='rounded-2xl w-full' />
                
                <div className='flex justify-between w-full'>
                  <p className='text-black font-bold text-sm mt-2 ml-2'>category</p>
                  <Image src='/images/avatar-6.jpg' alt='' width='60' height='0' className='rounded-full' style={{position: 'relative', zIndex: '99999', top: '-2em', right: '2em'}} />
                </div>
                
                <div className='flex justify-between w-full'>
                  <p className='text-black text-left text-sm ml-2'>course title</p>
                  <button className=''>Delete</button>
                </div>

              </Link>

            </div>

          </section>

        </section>
    
    </div>
  )
}

export default Courses