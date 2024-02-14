"use client"
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Home, People, Contacts, Receipt, HelpOutline, CalendarToday } from '@mui/icons-material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Image from 'next/image'
import Link from 'next/link'

const Sidemenu = () => {

  const [collapsed, setCollapsed] = useState(false);
  
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
        
    <Sidebar collapsed={collapsed} transitionDuration={800} breakPoint="sm" className='sidebar rounded'>

        <Link href='/' className='flex justify-center items-center mt-4'>
          <Image src='/images/Group.png' alt='' width='100' height='50' />
          <h1 className='text-black font-bold text-xl w-20 ml-1'><span className='text-xl text-rose-700'>E</span>du Learn</h1>
        </Link>

        <Menu>

          <MenuItem icon={<MenuOutlinedIcon />} onClick={handleToggleSidebar} className=''>
            <h2>Minimize Menu</h2>
          </MenuItem>

          <MenuItem icon={<Home />} onClick={handleToggleSidebar}>Dashboard 
            <Link href="/" />
          </MenuItem>
          <MenuItem icon={<People />}>Courses</MenuItem>
          <MenuItem icon={<Contacts />}>Assignments</MenuItem>
          <MenuItem icon={<Receipt />}>Messages</MenuItem>
          <MenuItem icon={<HelpOutline />}>Results</MenuItem>
          <MenuItem icon={<CalendarToday />}>Logout</MenuItem>

        </Menu>

        {/*<button onClick={handleToggleSidebar}>Toggle Sidebar</button> */}

    </Sidebar>
  )
}

export {Sidemenu}