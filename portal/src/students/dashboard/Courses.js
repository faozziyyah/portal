import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Sidemenu from '../../components/Sidemenu';
import Header from '../../components/Header';
import bg from './assets/bg.jpg'
import avatar from './assets/avatar-6.jpg'

const Courses = () => {

  /*const [courses, setCourses] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  async function getData() {
    const res = await fetch("http://localhost:8000/courses/");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCourses(data);
    };
    fetchData().catch(console.error);
  }, []); */

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <h1>Courses</h1>

          <Header />

          <section className='mt-8'>

            <div className='courses-header flex justify-between items-center'>
              <p className='text-black font-bold'>Latest Courses</p>
              <Link to='/dashboard/courses' className='text-purple-700 font-bold'> See all</Link>
            </div>

            <div className='flex mt-4'>

              <Link href='/dashboard/coursedetail' className='course-box bg-white flex flex-col justify-center rounded-2xl pb-4 hover:border-2 hover:border-purple-700' style={{width: '30%'}}>

                <img src={bg} alt='' width='200' height='0' id='course-image' className='rounded-2xl w-full' />
                
                <div className='flex justify-between w-full'>
                  <p className='text-black font-bold text-sm mt-2 ml-2'>category</p>
                  <img src={avatar} alt='' width='60' height='0' className='rounded-full' style={{position: 'relative', zIndex: '99999', top: '-2em', right: '2em'}} />
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