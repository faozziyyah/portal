import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Home, People, Contacts, Receipt, HelpOutline, CalendarToday } from '@mui/icons-material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {Link} from 'react-router-dom'
import img from '../assets/Group.png'

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

            <MenuItem icon={<MenuOutlinedIcon />} onClick={handleToggleSidebar} className=''>
              <h2>Minimize Menu</h2>
            </MenuItem>

            <MenuItem icon={<Home />} onClick={handleToggleSidebar}>Dashboard 
              <Link to="/" />
            </MenuItem>
            
            <MenuItem icon={<People />}>Courses</MenuItem>
            <MenuItem icon={<Contacts />}>Assignments</MenuItem>
            <MenuItem icon={<Receipt />}>Messages</MenuItem>
            <MenuItem icon={<HelpOutline />}>Results</MenuItem>
            <MenuItem icon={<CalendarToday />}>Logout</MenuItem>

        </Menu>
      </Sidebar>
    </div>
  )
}

export default Sidemenu