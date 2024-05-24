import React from 'react'
import {Link} from 'react-router-dom'
import bell from '../../assets/bell-ringing.png'
import cap from '../../assets/Scholarcapscroll.png'
import student from '../../assets/College Student.png'
import bag from '../../assets/Backpack.png'
import laptop from '../../assets/laptop.png'
import chart from '../../assets/chart.png'
import Profilebar from '../../components/Profilebar'
import Sidemenu from '../../components/Sidemenu'

const Home = () => {
  return (
    <div className='dashboard flex h-screen bg-white text-black'>

    <Sidemenu />

    <div className='flex justify-between pl-4 w-full h-screen'>

      <main className='flex flex-col w-3/4 mr-4 mt-4'>

        <header className='flex justify-between items-center'>

          <div className='search-bar justify-between items-center rounded-xl px-2'>

            <input 
              type='text' 
              className='text-black border-none text-sm rounded-md w-80 bg-transparent px-4 py-2 outline-none' 
            />

            <button>search</button>

          </div>

          <Link to='/' className=''> 
            <img src={bell} alt='' width='20' height='20' />
          </Link>

        </header>

        <section className='hero mt-8 flex justify-between rounded-2xl pt-3'>

          <aside className='flex flex-col ml-4 items-start text-white mb-8'>
            <p className='text-xs mt-4 text-slate-300'>January 27, 2024</p>
            <h3 className='mt-8 text-3xl font-semibold'>Welcome back, John!</h3>
            <p className='text-xs text-slate-300 mt-2'>Always stay updated in your student portal</p>
          </aside>

          <div className='image-container flex justify-center items-center'>
            <img src={cap} alt='' width='300' height='0' id='cap' />
            <img src={student} alt='' width='200' height='300' />
            <img src={bag} alt='' width='100' height='0' id='bag' />
          </div>

        </section>

        <section className='courses mt-8'> 

          <div className='courses-header flex justify-between items-center'>
            <p className='text-black font-bold'>Enrolled Courses</p>
            <Link href='/dashboard/courses' className='text-purple-700 font-bold'> See all</Link>
          </div>

          <div className='flex justify-between items-center mt-4'>

            <div className='course flex justify-between items-center bg-purple-200 rounded-2xl hover:border-2 hover:border-purple-700 pt-4 pb-4 pl-4'>

              <div className='flex flex-col justify-center items-start'>
                <p className='text-purple-600 font-semibold text-sm'>object oriented <br /> programming</p>
                <Link href='/' className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1'> View </Link>
              </div>
              
              <img src={laptop} alt='' width='100' height='0' />

            </div>

            <div className='course flex justify-between items-center bg-purple-200 rounded-lg hover:border-2 hover:border-purple-700 p-4'>

              <div className='flex flex-col justify-center items-start'>
                <p className='text-purple-600 font-semibold text-sm'>object oriented <br /> programming</p>
                <Link href='/' className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1'> View </Link>
              </div>
              
              <img src={chart} alt='' width='80' height='0' />

            </div>

          </div>

        </section>

        <section className='mt-8'>
          assignments
        </section>

      </main>

      <Profilebar />

    </div>

</div>
  )
}

export default Home