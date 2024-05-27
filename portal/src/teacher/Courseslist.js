import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axiosInstance from '../axiosConfig';
import bg from '../assets/bg.jpg'
import avatar from '../assets/avatar-6.jpg'
import Modal from './components/Modal';

const TeacherCourseslist = ({ searchTerm }) => {

  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCourseAdded = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  useEffect(() => {

    const fetchCourses = async () => {
      try {

        const response = await axiosInstance.get('/courses/created_by_teacher/');
        setCourses(response.data);
        console.log(response)
        setLoading(false);

      } catch (error) {
        setError('Error fetching courses');
      }
    };

    fetchCourses();

  }, []);

  /*const userData = localStorage.getItem('user-info')
  const userdetail = JSON.parse(userData)
  const id = userdetail.data.id
  console.log(id)*/

  const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col h-screen text-black'>

          <section className='mt-8'>

            <div className='courses-header flex justify-between items-center'>
              <p className='text-black font-bold'>Your Courses</p>
              <button onClick={handleOpenModal} className='text-purple-700 font-bold'> Add course</button>

              <Modal
                open={isModalOpen}
                handleClose={handleCloseModal}
                onCourseAdded={handleCourseAdded} 
              />

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
                    <p className='text-black text-sm ml-2 font-semibold capitalize'>{course.enrolled_students_count} students enrolled</p>
                  </div>

                  <div id='' className='w-full flex justify-around text-left'>
                    <button className='text-white bg-yellow-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1 font-semibold capitalize'>edit</button>
                    <button className='text-white bg-red-600 text-sm rounded-2xl mt-2 flex justify-center px-6 py-1 font-semibold capitalize'>delete</button>
                  </div>

                </Link>
              ))}

            </div>

          </section>
    
    </div>
  )
}

export default TeacherCourseslist