import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import bg from '../assets/bg.jpg'
import avatar from '../assets/avatar-6.jpg'
import { fetchEnrolledCourses } from '../api';
import axiosInstance from '../axiosConfig';

const Enrolled = ({ searchTerm }) => {

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
  
        const token = localStorage.getItem('access_token');  // Get token from local storage
  
        if (token) {
          fetchUserCourses(token);
        } else {
            setLoading(false);
            setError('Access token not found.');
        }
  
    }, []);

    const fetchUserCourses = async (token) => {
        try {
            const data = await fetchEnrolledCourses(token);
            setEnrolledCourses(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch enrolled courses.');
            setLoading(false);
        }
    };

    const handleUnenroll = async (courseId) => {
      try {
        await axiosInstance.delete(`courses/${courseId}/unenroll/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        //alert({ type: 'success', text: 'Unenrolled successfully!' });
      } catch (error) {
        console.error('Error unenrolling from course:', error);
        setError('Failed to unenroll from the course..');
      }
    };

    const filteredCourses = enrolledCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    
    <div className='flex flex-col h-screen text-black'>

          <section className='mt-8'>

            <div className='courses-header flex justify-between items-center'>
              <p className='text-black font-bold'>Enrolled Courses</p>
              <Link to='/courses' className='text-purple-700 font-bold'> See all</Link>
            </div>

            {loading && 
              <div className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            }
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='flex justify-between items-center mt-4'>

                {filteredCourses.map((course) => (

                  <Link href='/dashboard/coursedetail' key={course.id}
                    className='course-box bg-white flex flex-col justify-center rounded-2xl pb-4 hover:border-2 hover:border-purple-700' style={{width: '30%'}}
                  >

                    <img src={bg} alt='' id='course-image' className='rounded-2xl w-full' />

                    <div className='flex justify-between w-full'>
                      <p className='text-purple-700 font-bold text-sm mt-2 ml-2'>Category: {course.category.title}</p>
                      <img src={avatar} alt='' width='60' height='0' className='rounded-full' style={{position: 'relative', zIndex: '99999', top: '-2em', right: '2em'}} />
                    </div>

                    <div id='div' className='w-full text-left'>
                      <p className='text-black text-md ml-2 font-semibold capitalize'>{course.title}</p>
                      <p className='text-black text-sm ml-2 font-semibold'>{course.description}</p>
                      <p className='text-black text-sm ml-2 font-semibold capitalize'>Instructor: {course.instructor.username}</p>
                      <button onClick={() => handleUnenroll(course.id)}
                        className='text-white bg-purple-600 text-md rounded-2xl mt-2 flex justify-center px-6 py-1 ml-2 font-semibold'
                      >
                        Unenroll
                      </button>
                    </div>

                  </Link>
                ))}

            </div>

          </section>

    </div>
  )
}

export default Enrolled