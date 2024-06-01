import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import img from './assets/Group.png'
import img1 from './assets/Frame.png'
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        user_type: 'student', // Default role
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            toast.success('Registration successful.');
            //console.log('Registration successful:', response.data);
            // Redirect or show success message
            localStorage.setItem('signup-id', JSON.stringify(response))

            const userData = localStorage.getItem('signup-id')
            const userdetail = JSON.parse(userData)
            const user_type = userdetail.data.user_type
            //console.log(user_type)

            if (user_type === 'teacher') {
              navigate('/teacherdashboard');
            } else {
              navigate('/studentdashboard');
            }

            //navigate("/studentdashboard")
        } catch (error) {
            console.error('There was an error registering the user:', error);
            toast.error('Failed to register. Please try again.');
            setError('Failed to register. Please try again.');
        }
        setLoading(false); 
    };

  return (

    <main className="home-main flex h-screen items-center justify-between bg-white">

      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <img src={img} alt='' width='150' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-3 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        {error && <p severity="error">{error}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between w-96 mt-6'>

          <input 
            type='text' name='username' value={formData.username} required
            placeholder='Username' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
          />
          <input 
            type='email' name='email' value={formData.email} required
            placeholder='Email' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-4' 
          />
          <input 
            type='password' name='password' value={formData.password} required
            placeholder='Password' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-4'
          />
          <input 
            type='text' name='first_name' value={formData.first_name} required
            placeholder='First Name' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-4' 
          />
          <input 
            type='text' name='last_name' value={formData.last_name} required
            placeholder='Last Name' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-4' 
          />
          <div className='mt-4 flex w-80'>
            <label>Role:</label>
            <select className='border-solid border-2 border-black text-sm rounded-md px-4 py-1 outline-none ml-4'
              name="user_type" value={formData.user_type} onChange={handleChange} required 
            >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit"
            className='text-white border-none bg-blue-800 rounded-lg w-80 text-center py-2 px-4 text-sm mt-6 hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'
          >
            {loading ? <LoadingDots /> : "Register"}
          </button>

          <div className='flex w-80 items-center justify-between mt-6'>
            <p className='text-black text-sm font-semibold'>Already have an account?</p>
            <Link to='/login' className='text-white border-none bg-blue-800 rounded-lg text-center py-2 px-4 text-sm hover:bg-transparent hover:border-solid border-2 border-blue-800 hover:text-black'>Login</Link>
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

export default Signup