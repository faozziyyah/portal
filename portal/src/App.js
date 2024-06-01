import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './Layout';
import Dashboard from './students/Dashboard';
import Courses from './students/Courses';
import Enrolledcourses from './students/Enrolledcourses';
import Assignments from './students/Assignments';
import TeacherDashboard from './teacher/Dashboard';
import TeacherCourses from './teacher/Courses';
import Login from './Login';
import Signup from './Signup';
import TeacherAssignments from './teacher/Assignments';
import Profile from './students/Profile';
import TeacherProfile from './teacher/Profile';

const PrivateRoute = ({ children }) => {
  const userType = localStorage.getItem('user_type');
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userType === 'teacher') {
    return <Navigate to="/teacherdashboard" />;
  }

  if (userType === 'student') {
    return <Navigate to="/studentdashboard" />;
  }

  return children;
};


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' index element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/studentdashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/studentprofile' element={<Profile />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/enrolled-courses' element={<Enrolledcourses />} />
        <Route path='/assignments' element={<Assignments />} />
        <Route path='/teacherdashboard' element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} />
        <Route path='/teachercourses' element={<TeacherCourses />} />
        <Route path='/assignmentscreated' element={<TeacherAssignments />} />
        <Route path='/teacherprofile' element={<TeacherProfile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </div>
  );
}

export default App;
