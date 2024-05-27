import React, { useState } from 'react'
import { Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import student from '../../assets/College Student.png'
//import arrow from '../assets/chevron-down.png'
import bell from '../../assets/bell-ringing.png'
import Logout from '../../Logout';

const Header = ({ searchTerm, handleSearchChange }) => {

    const [profileMenu, setProfileMenu] = useState(false);
  
    const handleToggleProfileMenu = () => {
      setProfileMenu(!profileMenu);
    };

    const userData = localStorage.getItem('user-info')
    const userdetail = JSON.parse(userData)
    const username = userdetail.data.username

  return (
    <section className='flex justify-between items-center mt-4'>  

        <div className='search-bar justify-between items-center rounded-xl px-2'>

            <input 
                type='text' placeholder="Search by title" value={searchTerm} onChange={handleSearchChange}
                className='text-black border-none text-sm rounded-md w-80 bg-transparent px-4 py-2 outline-none' 
            />

            <button className='mr-2'>search</button>

        </div>

        <Link to='/' className=''> 
            <img src={bell} alt='' width='20' height='20' />
        </Link>

        <div className='profile-header flex items-center justify-between mr-2'>

          <img src={student} className='rounded-full bg-purple-500' alt='' width='50' height='50' />

          <div className='w-2/4'>
            <h3 className='font-bold text-sm'>{username}</h3>
            <p className='text-xs font-semibold capitalize'>student</p>
          </div>

          <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" 
            onClick={() => setProfileMenu(!profileMenu)} >
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>

          {/*<img src={arrow} alt='' width='30' height='30' onClick={() => setProfileMenu(!profileMenu)} />*/}

        </div>

        {profileMenu && (

          <div className='profile-options absolute py-2' style={{top: '5em', right: '2em', backgroundColor: '#af8be9', zIndex: '99999'}}>

            <Menu>
            
              <Link to="/studentdashboard" className='text-left font-semibold'>
                <MenuItem icon={<FontAwesomeIcon icon={faUser} className='text-xl text-left' />} onClick={handleToggleProfileMenu}>Profile </MenuItem>
              </Link>
            
              <Link to="/studentdashboard" className='text-left font-semibold'>
                <MenuItem icon={<FontAwesomeIcon icon={faGear} className='text-xl text-left' />}>Setting </MenuItem>
              </Link>
            
              <MenuItem>
                  <Logout />
              </MenuItem>

            </Menu>

          </div>

        )}

    </section>
  )
}

export default Header