import './App.css';
import { Route,Routes } from 'react-router-dom'
import Layout from './Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './students/Dashboard';
import Courses from './students/Courses';
import Enrolledcourses from './students/Enrolledcourses';
import Assignments from './students/Assignments';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' index element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/studentdashboard' element={<Dashboard />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/enrolled-courses' element={<Enrolledcourses />} />
        <Route path='/assignments' element={<Assignments />} />
      </Routes>

    </div>
  );
}

export default App;
