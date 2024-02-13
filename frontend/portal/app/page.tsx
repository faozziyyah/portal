import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="home-main flex h-screen items-center justify-between bg-white">
      
      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <Image src='/images/Group.png' alt='' width='200' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-6 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <div className='flex items-center justify-between w-96 mt-6'>
          <Link href='/login' className='text-white bg-blue-800 border-black border-none rounded-lg py-2 px-4 text-sm'>Login as a Student</Link>
          <Link href='/' className='text-black border-solid border-2 border-black rounded-lg py-2 px-4 text-sm'>Login as a Teacher</Link>
        </div>

      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <Image src='/images/Frame.png' alt='' width='400' height='500' />
      </section>
      
    </main>
  )
}
