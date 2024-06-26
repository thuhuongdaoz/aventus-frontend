import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import RegisterCandidate from './components/auth/Register/RegisterCandidate';
import RegisterEmployer from './components/auth/Register/RegisterEmployer';
import Content from './components/layout/Content';
import Profile from './components/pages/Profile';
import ChangePassword from './components/pages/ChangePassword';
import LIstJob from './components/jobs/ListJob';
import AddJob from './components/jobs/AddJob';
import EditJob from './components/jobs/EditJob';
import ViewJob from './components/jobs/ViewJob';
import DeepSearchJob from './components/jobs/DeepSearchJob';
import axios from 'axios';

import 'antd-css-utilities/utility.min.css'
import DeepSearchApplication from './components/application/DeepSearchApplication';
import ViewApplication from './components/application/ViewApplication';
import SearchApplicationPerJob from './components/application/SearchApplicationPerJob';
import DeepSearchApplicationPerJob from './components/application/DeepSearchApplicationPerJob';


function App() {
  console.log('render app')
 
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <PrivateRoute><Home /></PrivateRoute>}>
            <Route path="/" element={<Content/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="/listjob" element={<LIstJob />} />
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/editjob/:id" element={<EditJob />} />
            <Route path="/viewjob/:id" element={<ViewJob />} />
            <Route path="/deepsearchjob" element={<DeepSearchJob />} />
            <Route path="/deepsearchapplication" element={<DeepSearchApplication />} />
            <Route path="/viewapplication/:id" element={<ViewApplication />} />
            <Route path="/job/:id/searchapplication" element={<SearchApplicationPerJob />} />
            <Route path="/job/:id/deepsearchapplication" element={<DeepSearchApplicationPerJob/>} />
            
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
