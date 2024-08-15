// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstletter, setFirstletter] = useState(null);
  const [bgcolor, setBgcolor] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/islogin', { withCredentials: true });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        const getFl = response.data.name.charAt(0).toUpperCase();
        setFirstletter(getFl);
        setBgcolor(response.data.bgcolor);
      } else {
        setIsAuthenticated(false);
        setFirstletter(null);
        setBgcolor(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setFirstletter(null);
      setBgcolor(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='w-[98vw] min-h-screen relative overflow-hidden flex flex-col items-center'>
      <Navbar isAuthenticated={isAuthenticated} firstletter={firstletter} bgcolor={bgcolor} />
      <Routing checkAuthStatus={checkAuthStatus} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    </div>
  );
};

export default App;
