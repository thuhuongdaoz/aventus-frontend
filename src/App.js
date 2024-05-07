import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import RegisterCandidate from './components/auth/Register/RegisterCandidate';
import RegisterEmployer from './components/auth/Register/RegisterEmployer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/employer" element={<RegisterEmployer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
