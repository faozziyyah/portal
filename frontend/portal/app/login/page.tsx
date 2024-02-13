import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  return (
    <main className="home-main flex h-screen items-center justify-between bg-white">
      
      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <Image src='/images/Group.png' alt='' width='200' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-6 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <form className='flex flex-col items-center justify-between w-96 mt-6'>

          <input 
            type='text' 
            placeholder='Username' 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
          />

          <input 
            type='password' 
            placeholder='Password' 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6'
          />

          <Link href='/dashboard' className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'>Login</Link>

          <div className='flex w-80 items-center justify-between mt-6'>

            <p className='text-black text-sm font-semibold'>Don&apos;t have an account?</p>

            <Link href='/signup' className='text-white border-none bg-blue-800 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'>Register</Link>
          
          </div>
        
        </form>

      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <Image src='/images/Frame.png' alt='' width='400' height='500' />
      </section>
      
    </main>
  )
}

export default Login