import React from 'react'
import {Route, Routes} from "react-router-dom"
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import Profile from "../components/Profile"
import Dashboard from '../components/Dashboard';
import CreateHissab from '../pages/CreateHissab';
import PostDetails from '../pages/PostDetails';
import EditHisaab from '../pages/EditHisaab';
import SharedHissab from '../pages/Sharehisaab';
const Routing = ({ checkAuthStatus ,handleLogout, isAuthenticated}) => {
  return (
    <Routes >
      {
        isAuthenticated ? (
     <Route path='/' element={<Dashboard/>} />
        ) : (
     <Route path='/' element={<Home/>} />
        )
        
      }
     <Route path='/home' element={<Home/>} />
    <Route path='/register' element={<Register onRegister={checkAuthStatus} />} />
    <Route path='/login' element={<Login onLogin={checkAuthStatus} />} />
    <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/createhisaab' element={<CreateHissab/>} />
    <Route path="/post/:id" element={<PostDetails />} />
    <Route path="/EditHisaab/:id" element={<EditHisaab />} />
    <Route path="/shared/:id" element={<SharedHissab />} />
  </Routes>
  )
}

export default Routing