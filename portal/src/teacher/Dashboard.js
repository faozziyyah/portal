import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import bell from '../assets/bell-ringing.png'
import cap from '../assets/Scholarcapscroll.png'
import student from '../assets/College Student.png'
import bag from '../assets/Backpack.png'
import laptop from '../assets/laptop.png'
import chart from '../assets/chart.png'
import Profilebar from './components/Profilebar'
import Sidemenu from './components/Sidemenu'
import { fetchAssignmentById } from '../api';

const TeacherDashboard = ({ assignmentId = 1  }) => {

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = localStorage.getItem('user-info')
  const userdetail = JSON.parse(userData)
  const username = userdetail.data.username

  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

    useEffect(() => {
        const token = localStorage.getItem('access_token');  // Get token from local storage
        if (token) {
            fetchAssignment(token, assignmentId);
        } else {
            setLoading(false);
            toast.error('Access token not found.');
            setError('Access token not found.');
        }
    }, [assignmentId]);

    const fetchAssignment = async (token, id) => {
        try {
            const data = await fetchAssignmentById(id, token);
            setAssignment(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch assignment.');
            toast.error('Failed to fetch assignment.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

  //console.log(username)

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

            <button className='mr-2'>search</button>

          </div>

          <Link to='/' className=''> 
            <img src={bell} alt='' width='20' height='20' />
          </Link>

        </header>

        <section className='hero mt-8 flex justify-between rounded-2xl pt-3'>

          <aside className='flex flex-col ml-4 items-start text-white mb-8'>
            <p className='text-xs mt-4 text-slate-300 font-semibold'>{getCurrentDate()}</p>
            <h3 className='mt-8 text-3xl font-semibold text-left'>Welcome back, {username}!</h3>
            <p className='text-xs text-slate-300 font-semibold mt-2'>Always stay updated in your Instructor portal</p>
          </aside>

          <div className='image-container flex justify-center items-center'>
            <img src={cap} alt='' width='300' height='0' id='cap' />
            <img src={student} alt='' width='200' height='300' />
            <img src={bag} alt='' width='100' height='0' id='bag' />
          </div>

        </section>

        <section className='courses mt-8'> 

          <div className='courses-header flex justify-between items-center'>
            <p className='text-black font-bold'>Courses</p>
            <p className='text-black font-bold'>Lessons</p>
            {/*<Link href='/dashboard/courses' className='text-purple-700 font-bold'> See all</Link>*/}
          </div>

          <div className='flex justify-between items-center mt-4'>

            <div className='course flex justify-between items-center bg-purple-200 rounded-2xl hover:border-2 hover:border-purple-700 pt-4 pb-4 pl-4'>

              <div className='flex flex-col justify-center items-start'>
                <p className='text-purple-600 font-semibold text-sm'>object oriented <br /> programming</p>
                <Link to='/teachercourses' 
                  className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1'> 
                  View all
               </Link>
              </div>
              
              <img src={laptop} alt='' width='100' height='0' />

            </div>

            <div className='course flex justify-between items-center bg-purple-200 rounded-lg hover:border-2 hover:border-purple-700 p-4'>

              <div className='flex flex-col justify-center items-start'>
                <p className='text-purple-600 font-semibold text-sm'>object oriented <br /> programming</p>
                <Link to='/courses' 
                  className='text-white bg-purple-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1'> 
                  View all 
                </Link>
              </div>
              
              <img src={chart} alt='' width='80' height='0' />

            </div>

          </div>

        </section>

        <section className='mt-8'>

          <div className='courses-header flex justify-between items-center'>
            <p className='text-black font-bold'>Assignments</p>
            <Link to='/assignments' className='text-purple-700 font-bold'> See all</Link>
          </div>

            {assignment &&(

              <Link href='/dashboard/coursedetail' key={assignment.id}
                className='bg-purple-200 flex justify-around items-center mt-4 text-center rounded-lg py-2 hover:border-2 hover:border-purple-700'
              >
                
                <p className='font-semibold capitalize'>{assignment.title}</p>
                <p className=''>{assignment.description}</p>
                <p className=''>Due Date: {new Date(assignment.due_date).toLocaleString()}</p>
                <p className=''>Edit</p>
                <p className='font-semibold'>Delete</p>
                
              </Link>

            )}

        </section>

      </main>

      <Profilebar />

    </div>

</div>
  )
}

export default TeacherDashboard