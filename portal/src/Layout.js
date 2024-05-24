import React from 'react'
import {Link} from 'react-router-dom'
import img from './assets/Group.png'
import img1 from './assets/Frame.png'

const Layout = () => {
  return (
    <main className="home-main flex h-screen items-center justify-between bg-white">
      
      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <img src={img} alt='' width='200' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-6 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <div className='flex items-center justify-between w-4/5 mt-6'>
          <Link to='/login' className='text-white bg-blue-800 border-black border-none rounded-lg py-2 px-4 text-sm'>Login as Student</Link>
          <Link to='/login' className='text-black border-solid border-2 border-black rounded-lg py-2 px-4 text-sm'>Login as Teacher</Link>
          <Link to='/login' className='text-black border-solid border-2 border-black rounded-lg py-2 px-4 text-sm'>Login as Admin</Link>
        </div>

      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <img src={img1} alt='' width='400' height='500' />
      </section>
      
    </main>
  )
}

export default Layout