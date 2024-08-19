import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import Leftsmlsvg from "../svg/Leftsmlsvg"
import Rightsmlsvg from "../svg/Rightsmlsvg"
const Smallsec = ({ image, text1, text2, links, right }) => { 
  return (
    <div className={`flex justify-between border-2 border-gray-100 overflow-hidden rounded-md relative items-center bg-white w-[40%] h-[100%] ${right ? "flex-row-reverse" : ""} p-4`}>
      <div className="w-16 h-16">
        {typeof image === 'string' ? <img src={image} alt="section image" /> : image}
      </div>
      <div className="ml-4 flex flex-col gap-1">
        <h1 className="text-lg font-bold">{text1}</h1>
        <h3 className="text-md text-gray-600">{text2}</h3>
        <h2 className={`${right ? "text-sky-500 cursor-pointer" : "text-black"} `}>{links} {<MdArrowOutward className={`${right ? "inline-block" : "hidden"} `}/>}</h2>
      </div>
        {right ? (<Rightsmlsvg  />) : (<Leftsmlsvg/>)}
    </div>
  );
};

export default Smallsec;
