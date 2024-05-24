import './App.css';
import { Route,Routes } from 'react-router-dom'
import Layout from './Layout';
import Login from './students/Login';
import Signup from './students/Signup';
import Home from './students/dashboard/Home';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' index element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
