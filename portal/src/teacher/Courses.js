import React, { useState } from 'react'
import Header from './components/Header';
import Sidemenu from './components/Sidemenu'
import TeacherCourseslist from './Courseslist';

const TeacherCourses = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  };

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

          <TeacherCourseslist searchTerm={searchTerm} />

        </section>
    
    </div>
  )
}

export default TeacherCourses