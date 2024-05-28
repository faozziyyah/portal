import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Logout = () => {

    const navigate = useNavigate();
  
    function logout () {
      localStorage.clear()
      toast.success('Logout Successful.');
      navigate('/login')
    }

  return (
    <button onClick={logout} className='font-semibold ml-2'>
      <FontAwesomeIcon  icon={faRightFromBracket} style={{color: 'tomato', fontSize: '1.5em'}} /> Logout
    </button>
  )
}

export default Logout