import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Navbar = ({isAuthenticated,bgcolor,firstletter}) => {
  // console.log(isAuthenticated)
  return (
    <div className="w-full h-24 px-10 sm:px-14 flex justify-between select-none items-center">
      <NavLink to="/home">
        <img className="h-24 object-cover" src={logo} alt="Logo" />
      </NavLink>
      <CiMenuFries className="md:hidden cursor-pointer text-xl" />
      <div className="hidden md:flex items-center gap-3">
      
        {isAuthenticated ? (<div className=" flex gap-4">
          <NavLink
              to="/dashboard"
              className="flex items-center justify-center px-3 h-12 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white text-lg capitalize transition duration-300"
            >
              Dashboard
            </NavLink>
          <NavLink
              to="/createhisaab"
              className="flex items-center justify-center px-3 h-12 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white text-lg capitalize transition duration-300"
            >
              create new Hisaab
            </NavLink>
          <NavLink to="/profile">
            <div
              className="flex justify-center cursor-pointer items-center w-10 h-10 rounded-full text-white text-xl"
              style={{ backgroundColor: bgcolor }}
            >
              {firstletter}
            </div>
          </NavLink>
        </div>
        ) : (<div className=" flex  gap-4 items-center justify-end">
          
          <NavLink className="flex items-center justify-center gap-4 bg-red-100 rounded-md w-40 h-12">
          <FaPhoneAlt className="text-red-400 text-sm" />
          <h4 className="text-md">9606800800</h4>
        </NavLink>
        <NavLink className="relative flex items-center justify-center gap-2 bg-white border-red-600 border text-red-600 font-semibold rounded-md w-40 h-12">
          <h4 className="absolute -top-2 bg-red-600 rounded-xl px-1.5 -right-1 text-xs text-white">
            New
          </h4>
          <h3 className="text-md">Business Loans</h3>
        </NavLink>
          <div className="auth flex gap-2 items-center">
            <NavLink
              to="/login"
              className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white text-md transition duration-300"
            >
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="flex items-center justify-center w-20 h-12 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white text-md transition duration-300"
            >
              Sign up
            </NavLink>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
