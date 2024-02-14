import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Home, People, Contacts } from '@mui/icons-material';

const Header = () => {

  const [profileMenu, setProfileMenu] = useState(false);

  const handleToggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <section className='flex justify-between items-center mt-4'>  

        <div className='search-bar justify-between items-center rounded-xl px-2'>

            <input 
                type='text' 
                className='text-black border-none text-sm rounded-md w-80 bg-transparent px-4 py-2 outline-none' 
            />

            <button>search</button>

        </div>

        <Link href='/' className=''> 
            <Image src='/images/bell-ringing.png' alt='' width='20' height='20' />
        </Link>

        <div className='profile-header flex items-center justify-between mr-2'>

          <Image src='/images/College Student.png' className='rounded-full bg-purple-500' alt='' width='50' height='50' />

          <div className='w-2/4'>
            <h3 className='font-bold text-sm'>John Doe</h3>
            <p className='text-xs'>student</p>
          </div>

          <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
          
          <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            
            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
              
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                
                <svg className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                
                </svg>
              </div>
              
              <div className="flex-auto">
                <a href="#" className="block font-semibold text-gray-900">
                  Analytics
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">Get a better understanding of your traffic</p>
              </div>

            </div>
          
        </div>
      </div>

          <Image src='/images/chevron-down.png' alt='' width='30' height='30' onClick={() => setProfileMenu(!profileMenu)} />

        </div>

        {profileMenu && (

          <div className='profile-options'>

            <Menu>
              
              <MenuItem icon={<Home />}>Favorites</MenuItem>
              <MenuItem icon={<People />}>Setting</MenuItem>
              <MenuItem icon={<Contacts />}>Log Out</MenuItem>

            </Menu>

          </div>

        )}

    </section>
  )
}

export default Header