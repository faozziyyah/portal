import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHouse, faListCheck, faMessage, faSquarePollVertical, faBars } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import img from '../assets/Group.png'
import Logout from './Logout';

const Sidemenu = () => {

    const [collapsed, setCollapsed] = useState(false);
    
    const handleToggleSidebar = () => {
      setCollapsed(!collapsed);
    };

  return (
    
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed} transitionDuration={800} breakPoint="sm" className='sidebar rounded'>

        <Link to='/' className='flex justify-center items-center mt-4'>
          <img src={img} alt='' width='100' height='50' />
          <h1 className='text-black font-bold text-xl w-20 ml-1'><span className='text-xl text-rose-700'>E</span>du Learn</h1>
        </Link>

        <Menu>

            <MenuItem icon={<FontAwesomeIcon icon={faBars} />} onClick={handleToggleSidebar} className=''>
              <h2 className='text-left font-semibold'>Minimize Menu</h2>
            </MenuItem>
            
            <Link to="/studentdashboard" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faHouse} className='text-purple-700 text-xl text-left' />} onClick={handleToggleSidebar}>Dashboard </MenuItem>
            </Link>
            
            <Link to="/enrolled-courses" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faBook} className='text-purple-700 text-xl' />}>Courses</MenuItem>
            </Link>
            
            <Link to="/assignments" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faListCheck} className='text-purple-700 text-xl' />}>Assignments</MenuItem>
            </Link>
            
            <Link to="/enrolled-courses" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faMessage} className='text-purple-700 text-xl' />}>Messages</MenuItem>
            </Link>
            
            <Link to="/enrolled-courses" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faSquarePollVertical} className='text-purple-700 text-xl' />}>Results</MenuItem>
            </Link>
            
            <MenuItem>
              <Logout />
            </MenuItem>

        </Menu>
      </Sidebar>
    </div>
  )
}

export default Sidemenu