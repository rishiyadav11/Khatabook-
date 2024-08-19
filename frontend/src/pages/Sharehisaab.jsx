import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoShareSocial } from "react-icons/io5";


const SharedHissab = () => {
  const { id } = useParams();
  const [hissab, setHissab] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchHissab = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hissab/shared/${id}`);
        setHissab(response.data);
      } catch (err) {
        setError('Failed to load Hissab');
      }
    };
    fetchHissab();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!hissab) return <div>Loading...</div>;
  const loginfnc =()=>{
    navigate("/register")
  }
  return (
    <div className='w-full h-custom px-10 sm:px-14'>
    {hissab ? (
      <div className="flex flex-col gap-4 select-none">
        <h1 className="text-4xl font-roboto font-semibold text-gray-700">
          {hissab.title}
        </h1>
        <textarea
          name=""
          readOnly
          className="bg-gray-200 w-[60%] overflow-x-hidden resize-none h-[60vh] p-4 text-lg font-roboto font-semibold text-slate-600 rounded-lg outline-none  border-red-400"
          value={hissab.content}
        />
        <div className="flex gap-4">
        {hissab.isEditable ? <button onClick={()=>loginfnc()} className="bg-green-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-green-500">Edit Hisaab</button> : null}
        <button onClick={()=>loginfnc()} className="bg-red-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-red-500">Delete </button> 
        {hissab.isShareable ? <button onClick={()=>loginfnc()} className="bg-sky-400 h-10 w-10 flex justify-center items-center text-lg font-semibold rounded-md text-white hover:bg-sky-500"><IoShareSocial/></button> : null}
        </div>
      </div>
    ) : (
      <div>No post data available</div>
    )}
  </div>
  );
};

export default SharedHissab;
