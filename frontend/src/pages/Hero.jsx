import React from "react";
import TOPRightImage from "../assets/top-right-desktop-img-bed1eb2ec0-Photoroom.png";
import '../styles/custom.css';
import Cyclesyg from '../svg/Cyclesyg'

const Hero = () => {
  return (
    <div className="h-custom relative  px-10  sm:px-14  z-0 ">
        <div className=" h-full flex  flex-col sm:items-center lg:flex-row items-end">
        <div className="left h-full w-full sm:w-[80%]  lg:w-[40%] pt-32  lg:pt-36">
        <div className=" h-full w-full">
          <h1 className="text-5xl  font-roboto tracking-tighter font-medium ">
            Business hua <i className="relative">^ <i className="absolute  w-48 -top-12 -rotate-2 -left-7  sm:left-0  tracking-normal font-medium  font-grand-hotel ">
              (aur bhi)
            </i></i> 
            easy
          </h1>
          <h1 className="text-4xl mt-2 ">with Khatabook on Desktop</h1>
          <div className="flex flex-col lg:flex-row  items-center w-full h-24 mt-4 lg:gap-2 gap-4">
            <div className="flex  bg-white hover:border border-black   h-20 lg:h-14 rounded-md items-center w-[100%]   sm:w-[60%] overflow-hidden gap-2">
              <label
                htmlFor="number"
                className="w-[25%] border-r-2 h-full items-center flex justify-center"
              >
                +91
              </label>
              <input
                id="number"
                className="h-14 text-lg w-full outline-none"
                type="text"
                placeholder="Enter your phone number"
              />
            </div>
            <button className="h-14 w-28 rounded-md text-white font-semibold  bg-red-600">
              Get Started
            </button>
          </div>
          <div className="mt-8 p-4  bg-white w-full h-52 lg:h-36 rounded-lg">
                <h1 className="text-2xl font-medium mb-2">Billing & Accounting for all businesses</h1>
                <div className="flex gap-4 flex-col lg:flex-row items-center h-1/2 ">
                <div className="relative">
                <h1 className="text-base font-normal   red-effect2">Sales and purchase accounting</h1>
                </div>
                <div className="relative">
                <h1 className="text-base font-normal   pr-2 red-effect2">GST/Non-GST bill  creation</h1>
                </div>
                <div className="relative">
                <h1 className="text-base font-normal">Stock management with profit tracking</h1>
                </div>
                </div>
            </div>
            <div className="bg-yellow-200 rounded-md mt-5 w-full h-28 gap-2 lg:gap-0 flex-col  lg:flex-row sm:h-20   flex items-center p-2">
                <h1 className="lg:w-[70%] w-full h-full text-sm  ">Try Khatabook Desktop on a sample DEMO account . <i className="font-semibold text-base"> <br />No signup required.</i></h1>
                <button className="text-white bg-slate-600 w-44 hover:bg-emerald-400 transition-all duration-300 hover:text-black font-medium h-10 rounded-md">View Demo Account</button>
            </div>
        </div>
        
      </div>
      <div className="right h-full w-full lg:w-[60%] flex justify-center pt-36 items-end">
        <img
          className=" w-full  object-contain h-full   "
          src={TOPRightImage}
          alt=""
        />
      </div>
        </div>
        <Cyclesyg />
    </div>
  );
};

export default Hero;
