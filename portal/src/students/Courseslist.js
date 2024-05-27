import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axiosInstance from '../axiosConfig';
import bg from '../assets/bg.jpg'
import avatar from '../assets/avatar-6.jpg'

const Courseslist = ({ searchTerm }) => {

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

      fetchCourses();

  }, []);

  const fetchCourses = async () => {

      setLoading(true);

      try {

          const response = await axiosInstance.get('courses/');
          //console.log(response.data)
          setCourses(response.data);
          setLoading(false);

      }  catch (error) {

        console.error('There was an error fetching courses:', error);

        if (error.response && error.response.status === 403) {
            setError('You are not authorized to view this content. Please log in.');
            // Redirect to login page if not authorized
            navigate('/login');
        } else {
            setError('Failed to fetch courses.');
        }
        setLoading(false);
    }
  };

  /*const userData = localStorage.getItem('user-info')
  const userdetail = JSON.parse(userData)
  const id = userdetail.data.id
  console.log(id)*/

  const handleEnroll = async (courseId) => {

    try {

      await axiosInstance.post('enrollments/', 
      { course: courseId }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      // Update the courses list to reflect the new enrollment
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, is_enrolled: true } : course
        )
      );
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='flex flex-col h-screen text-black'>

          <section className='mt-8'>

            <div className='courses-header flex justify-between items-center'>
              <p className='text-black font-bold'>Latest Courses</p>
              <Link to='/dashboard/courses' className='text-purple-700 font-bold'> See all</Link>
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
                    {course.is_enrolled ? (
                      <button className='text-white bg-purple-600 text-md rounded-2xl mt-2 flex justify-center px-6 py-1 ml-2 font-semibold'>
                        Already Enrolled
                      </button>
                    ) : (
                      <button onClick={() => handleEnroll(course.id)}
                        className='text-white bg-purple-600 text-md rounded-2xl mt-2 flex justify-center px-6 py-1 ml-2 font-semibold'
                      >
                        Enroll
                      </button>
                    )}
                  </div>

                </Link>
              ))}

            </div>

          </section>
    
    </div>
  )
}

export default Courseslist