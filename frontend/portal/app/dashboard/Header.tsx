import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Home } from '@mui/icons-material';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

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
        
              <MenuItem icon={<Home />} onClick={handleToggleProfileMenu}>Dashboard 
                <Link href="/" />
              </MenuItem>
              <MenuItem icon={<HomeOutlinedIcon />}>Favorites</MenuItem>
              <MenuItem icon={<PeopleOutlinedIcon />}>Setting</MenuItem>
              <MenuItem icon={<ContactsOutlinedIcon />}>Log Out</MenuItem>
        
            </Menu>
        
          </div>
  
        )}

    </section>
  )
}

export default Header