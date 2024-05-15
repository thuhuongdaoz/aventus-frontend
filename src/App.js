import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import RegisterCandidate from './components/auth/Register/RegisterCandidate';
import RegisterEmployer from './components/auth/Register/RegisterEmployer';
import Profile from './components/pages/Profile';
import ChangePassword from './components/pages/ChangePassword';
import LIstJob from './components/jobs/ListJob';
import AddJob from './components/jobs/AddJob';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const checkToken = () => {
  //   console.log("vao day")
  //   const token = localStorage.getItem('token');
  //   console.log("vao day", token)
  //   if(!token) return false;
  //   axios.get('http://localhost:8080/auth/introspect', {
  //     headers : {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error introspect token:', error);
  //       return false;
  //     });
  // };
  useEffect(() => {
    setIsAuthenticated(checkToken());
  }, [localStorage.getItem('token')]);
  // const [token, setToken] = useState(null);
  // const handleLogin = (receivedToken) => {
  //   setToken(receivedToken);
  // };
  const checkToken = () => {
      console.log("vao day1")
      const token = localStorage.getItem('token');
      return !!token
    };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}>
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="/listjob" element={<LIstJob />} />
            <Route path="/addjob" element={<AddJob />} />
            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/employer" element={<RegisterEmployer />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
