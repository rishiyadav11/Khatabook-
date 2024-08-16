import React from 'react';
import { FaCheck } from "react-icons/fa6";
import Gstsvg from "../svg/Gstsvg";
import Inventsvg from "../svg/Inventsvg";
import Buisnesssvg from "../svg/Buisnesssvg";
const Featcompo = ({ text1 = "", text2 = "", points = [], first,second,third }) => {
  return (
    <div className={`flex  bg-[#F6F7F9] rounded-lg text p-4 ${first ? "w-[90%] flex-row justify-between  p-6" : "w-[45%] flex-col"}`}>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-normal'>{text1}</h1>
        <h1 className='text-gray-500 text-lg'>{text2}</h1>
        {points.map((point, index) => (
          <div key={index} className="flex items-center">
            <FaCheck className="mr-2 text-red-500 " />
            <h2 className='text-gray-500 text-base'>{point}</h2>
          </div>
        ))}
      </div>
      <div className={`${first ? "flex" : "hidden"}`}><Gstsvg/></div>
      <div className={`${second ? "flex" : "hidden"}`}><Inventsvg/></div>
      <div className={`${third ? "flex" : "hidden"}`}><Buisnesssvg/></div>
    </div>
  );
}

export default Featcompo;

