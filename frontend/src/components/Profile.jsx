import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState('');
  const [bgcolor, setbgcolor] = useState('')

  // Function to handle logout
  const handleLogoutClick = async () => {
    try {
      await handleLogout(); // Call the passed in handleLogout function
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get("https://khatabook-backend.onrender.com/auth/profile", {
        withCredentials: true,
      });
      const userData = response.data.data;
      setUser(userData);
      setbgcolor(userData.bgcolor)
      setFirstLetter(userData.name.charAt(0).toUpperCase()); // Extract the first letter
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='h-screen w-full flex items-center justify-center bg-cover bg-[url("https://img.freepik.com/free-vector/gradient-abstract-background_23-2149460639.jpg?t=st=1722935122~exp=1722938722~hmac=fac04517e3c8cd07897ee234ab833d7bc7ddbb3f986ee5b42e799a9cfdd3ae03&w=1060")]'>
      <div className="bg-white p-4 w-[50%] h-[40%] lg:h-[35%] lg:w-[30%] bg-opacity-10 backdrop-blur-md border border-gray-200 border-opacity-30 rounded-lg shadow-lg">
        <div className="flex gap-6 h-[80%] w-fulllg:h-0 lg:flex-row flex-col items-center">
          <div style={{ backgroundColor: bgcolor }} className={`flex justify-center cursor-pointer items-center w-[30%] h-[50%] lg:w-32 lg:h-32  rounded-full text-white text-xl`}>
            {firstLetter}
          </div>
          <div>
            <h2 className='font-semibold text-3xl text-black'>{user.name}</h2>
            <h3 className='font-medium opacity-70 text-black'>{user.email}</h3>
          </div>
        </div>
        <div className="h-20 flex items-center justify-center">
          <button 
            id='logoutbtn' 
            onClick={handleLogoutClick} 
            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
