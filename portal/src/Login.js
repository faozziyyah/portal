import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import axiosInstance from './axiosConfig';
import { toast } from 'react-toastify';
import img from './assets/Group.png'
import img1 from './assets/Frame.png'

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ username: '', password: '', });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

      e.preventDefault();
      setLoading(true);

      try {
          const response = await axios.post('http://localhost:8000/api/login/', formData);
          toast.success('Login successful.');
          //console.log('Login successful:', response);
          // Redirect or show success message
          localStorage.setItem('user-info', JSON.stringify(response))
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;

          const userData = localStorage.getItem('user-info')
          const userdetail = JSON.parse(userData)
          //const username = userdetail.data.username
          const user_type = userdetail.data.user_type
          //console.log(username)
          //console.log(user_type)

          if (user_type === 'teacher') {
            navigate('/teacherdashboard');
          } else {
            navigate('/studentdashboard');
          }

          //navigate("/studentdashboard")
          setLoading(false); 
      } catch (error) {
          console.error('There was an error loggin in:', error);
          toast.error('Failed to login. Please try again.');
          setError('Failed to login. Please try again.');
          setLoading(false); 
      }
  };

  return (
    
    <main className="home-main flex h-screen items-center justify-between bg-white">
      
      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <img src={img} alt='' width='200' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-6 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        {error && <p severity="error">{error}</p>}

        <form onSubmit={handleLogin} className='flex flex-col items-center justify-between w-96 mt-6'>

          <input 
            type='text' placeholder='Username'  value={formData.username} required onChange={handleChange} name='username'
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
          />

          <input 
            type='password' name='password' value={formData.password} required placeholder='Password' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6'
          />

          <button type="submit"
            className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'
          >
            {loading ? <LoadingDots /> : "Login"}
          </button>

          <div className='flex w-80 items-center justify-between mt-6'>

            <p className='text-black text-sm font-semibold'>Don&apos;t have an account?</p>

            <Link to='/signup' className='text-white border-none bg-blue-800 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'>Register</Link>
          
          </div>
        
        </form>

      </aside>

      <section className='home-right h-screen w-1/2 flex justify-center items-center'> 
        <img src={img1} alt='' width='400' height='500' />
      </section>
      
    </main>
  )
}

const LoadingDots = () => {
    return (
        <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
};

export default Login