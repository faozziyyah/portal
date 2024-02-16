"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface TeacherData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [teacherData, setTeacherData] = useState<TeacherData>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacherData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(teacherData);

  const RegisterTeacher = async () => {
    const teacherFormData = new FormData();
    teacherFormData.append('name', teacherData.name);
    teacherFormData.append('number', teacherData.phone);
    teacherFormData.append('email', teacherData.email);
    teacherFormData.append('password', teacherData.password);

    try {
      axios.post('http://127.0.0.1:8000/teachers/', teacherFormData).then((response) => {

        //const result = response.data;

        setTeacherData({
          name: '',
          phone: '',
          email: '',
          password: '',
        });
        
        console.log(response, response.data);

      })
        /*headers: {
          Authorization: `Bearer a9fd23487660c85b53cc8b5059fc4c52acb2ae09`, // Insert your token here
        },
      }); 

      setTeacherData({
        name: '',
        phone: '',
        email: '',
        password: '',
      }); */
    } catch (error) {
      console.log(error);
      setTeacherData({ ...teacherData, status: 'error' });
    }
  };

  return (
    <main className="home-main flex h-screen items-center justify-between bg-white">
      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">
        <div className='flex justify-center'>
          <Image src='/images/Group.png' alt='' width='150' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-3 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <form className='flex flex-col items-center justify-between w-96 mt-6'>
          <input 
            type='text' name='name'
            placeholder='Name' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
          />
          <input 
            type='phone' name='phone'
            placeholder='Phone Number' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6' 
          />
          <input 
            type='email' name='email'
            placeholder='Email' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6' 
          />
          <input 
            type='password' name='password'
            placeholder='Password' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6'
          />

          <button 
            type="button"
            onClick={RegisterTeacher}
            className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'
          >
            Register
          </button>

          <div className='flex w-80 items-center justify-between mt-6'>
            <p className='text-black text-sm font-semibold'>Already have an account?</p>
            <Link href='/login' className='text-white border-none bg-blue-800 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'>Login</Link>
          </div>
        </form>
      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <Image src='/images/Frame.png' alt='' width='400' height='500' />
      </section>
    </main>
  );
};

export default Signup;
