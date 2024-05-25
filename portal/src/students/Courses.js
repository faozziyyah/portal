import React, { useState } from 'react'
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu'
import Courseslist from './Courseslist';

const Courses = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  };

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

          <Courseslist searchTerm={searchTerm} />

        </section>
    
    </div>
  )
}

export default Courses