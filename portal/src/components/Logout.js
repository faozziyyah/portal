import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Contacts } from '@mui/icons-material';

const Logout = () => {

    const navigate = useNavigate();
  
    function logout () {
      localStorage.clear()
      navigate('/login')
    }

  return (
    <button onClick={logout}>
       <Contacts /> Logout
    </button>
  )
}

export default Logout