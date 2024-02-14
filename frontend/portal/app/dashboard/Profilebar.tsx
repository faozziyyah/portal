import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Home, People, Contacts } from '@mui/icons-material';

const Profilebar = () => {

    const [profileMenu, setProfileMenu] = useState(false);
  
    const handleToggleProfileMenu = () => {
      setProfileMenu(!profileMenu);
    };

  return (

    <aside className='aside w-1/4 bg-gray-100 h-screen rounded-3xl'>

      <div className='profile-row flex items-center justify-between m-4'>

        <Image src='/images/College Student.png' className='rounded-full bg-purple-500' alt='' width='50' height='50' />

        <div className='w-2/4'>
          <h3 className='font-bold text-sm'>John Doe</h3>
          <p className='text-xs'>student</p>
        </div>

        <Image src='/images/chevron-down.png' alt='' width='30' height='30' onClick={() => setProfileMenu(!profileMenu)} />

      </div>

      {profileMenu && (

        <div className='profile-options'>

          <Menu>

            <MenuItem icon={<Home />} onClick={handleToggleProfileMenu}>Profile 
              <Link href="/" />
            </MenuItem>
            <MenuItem icon={<Home />}>Favorites</MenuItem>
            <MenuItem icon={<People/>}>Setting</MenuItem>
            <MenuItem icon={<Contacts />}>Log Out</MenuItem>

          </Menu>

        </div>

      )}

      <h4>aside</h4>

    </aside>
  )
}

export {Profilebar}