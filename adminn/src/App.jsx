import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Login from './components/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BackendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className='app'>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
            <Sidebar />
            <div className='bodycode'>

            
              <Routes>
                <Route path='/add' element={<Add token={token}/>} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token}/>} />
              </Routes>

              </div>
        </>
      )}
    </div>
  );
}

export default App;
