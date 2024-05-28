import React, { useState } from 'react'
import { Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import student from '../../assets/College Student.png'
import arrow from '../../assets/chevron-down.png'
import Logout from '../../Logout';

const Profilebar = () => {

    const [profileMenu, setProfileMenu] = useState(false);

    const userData = localStorage.getItem('user-info')
  
    const userdetail = JSON.parse(userData)
  
    const username = userdetail.data.username
  
    const handleToggleProfileMenu = () => {
      setProfileMenu(!profileMenu);
    };

  return (
    <aside className='aside w-1/4 bg-gray-100 h-screen rounded-3xl'>

      <div className='profile-row flex items-center justify-between m-4'>

        <img src={student} className='rounded-full bg-purple-500' alt='' width='50' height='50' />

        <div className='w-2/4'>
          <h3 className='font-bold text-sm'>{username}</h3>
          <p className='text-xs'>instructor</p>
        </div>

        <img src={arrow}alt='' width='30' height='30' onClick={() => setProfileMenu(!profileMenu)} />

      </div>

      {profileMenu && (

        <div className='profile-options'>

          <Menu>
            
            <Link to="/teachercourses" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faUser} className='text-xl text-left' />} onClick={handleToggleProfileMenu}>Profile </MenuItem>
            </Link>
          
            <Link to="/teachercourses" className='text-left font-semibold'>
              <MenuItem icon={<FontAwesomeIcon icon={faGear} className='text-xl text-left' />}>Setting </MenuItem>
            </Link>

              <MenuItem>
                <Logout />
              </MenuItem>
            {/*<MenuItem icon={<Contacts />}>Log Out</MenuItem>*/}

          </Menu>

        </div>

      )}

      <h4>aside</h4>

    </aside>
  )
}

export default Profilebar