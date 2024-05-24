import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/Group.png'
import img1 from '../assets/Frame.png'
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({ first_name: "", last_name: "", username: "", email: "", password: "", password2: "" });

    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    };

    const handleSubmit = (e) => {

      e.preventDefault();
      setLoading(true);

      const userData = {
        first_name: state.first_name,
        last_name: state.last_name,
        username: state.username,
        email: state.email,
        password: state.password,
        password2: state.password2,
      };

      axios.post("http://ec2-13-49-70-103.eu-north-1.compute.amazonaws.com/register", userData).then((response) => {
        console.log(response, response.data);
        localStorage.setItem('signup-id', JSON.stringify(response))

        navigate("/dashboard")
      })
      .finally(() => {
          setLoading(false); 
      })
    };

  return (

    <main className="home-main flex h-screen items-center justify-between bg-white">

      <aside className="home-aside flex flex-col h-screen w-1/2 items-center justify-center">

        <div className='flex justify-center'>
          <img src={img} alt='' width='150' height='100' />
          <h1 className='text-black font-bold text-4xl w-20 mt-3 ml-4'><span className='text-4xl text-rose-700'>E</span>du Learn</h1>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between w-96 mt-6'>

          <input 
            type='text' name='name'
            placeholder='Name' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none' 
          />
          <input 
            type='phone' name='phone'
            placeholder='Phone Number' onChange={handleChange}
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6' 
          />
          <input 
            type='email' name='email'
            placeholder='Email' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6' 
          />
          <input 
            type='password' name='password'
            placeholder='Password' onChange={handleChange} 
            className='text-black border-solid border-2 border-black text-sm rounded-md w-80 bg-white px-4 py-2 outline-none mt-6'
          />

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