import React, { useState } from 'react'
import Header from './components/Header';
import Sidemenu from './components/Sidemenu'
import Enrolled from './Enrolled';

const Enrolledcourses = () => {

    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

  return (
    <div className='flex h-screen bg-white text-black'>

        <Sidemenu />

        <section className='flex flex-col w-full h-screen p-4 bg-gray-100'>

          <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

          <Enrolled searchTerm={searchTerm} />

        </section>
    
    </div>
  )
}

export default Enrolledcourses