import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import RegisterCandidate from './components/auth/Register/RegisterCandidate';
import RegisterEmployer from './components/auth/Register/RegisterEmployer';
import Profile from './components/pages/Profile';
import ChangePassword from './components/pages/ChangePassword';
import LIstJob from './components/jobs/ListJob';

function App() {

  const checkToken = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  };
  // const [token, setToken] = useState(null);
  // const handleLogin = (receivedToken) => {
  //   setToken(receivedToken);
  // };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={checkToken() ? <Home/> : <Navigate to="/login" />} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/employer" element={<RegisterEmployer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/listJob" element={<LIstJob />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
