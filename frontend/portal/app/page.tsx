import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-between bg-white">
      
      <aside className="flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex items-center justify-center'>
          <Image src='/images/Scholarcapscroll.png' alt='' width='300' height='100' />
          <h1 className='text-black font-bold text-4xl w-20'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <div className='flex items-center justify-between w-96 mt-6'>
          <button className='text-white bg-blue-800 border-black border-none rounded-lg py-2 px-4 text-sm'>Login as a Student</button>
          <button className='text-black border-solid border-2 border-black rounded-lg py-2 px-4 text-sm'>Login as a Teacher</button>
        </div>

      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <Image src='/images/Frame.png' alt='' width='400' height='500' />
      </section>
      
    </main>
  )
}
