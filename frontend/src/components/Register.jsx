import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = ({ onRegister }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate()
      const onSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:3000/auth/register', data,{  withCredentials: true,});
          const { msg, already } = response.data;
          console.log(msg, already)
          if (already){
            onRegister()
            navigate("/login")
          }else{
            navigate("/dashboard")
          }
        //   const navigate =useNavigate()
        } catch (error) {
          // console.error('There was an error!', error);
        }
      };
      const loginfnc =()=>{
        navigate("/login")
      }
      return (
        <div className="h-screen w-full bg-cover bg-[url('https://img.freepik.com/free-vector/abstract-memphis-pattern-backdrop-wallpaper-with-halftone-dots-design_1017-43997.jpg?t=st=1722930356~exp=1722933956~hmac=5c2aa99a0478f43ad828422db20f5aabc94b030ed0eb2ff7dbc36059281eff1f&w=1380')] flex justify-center items-center">
            <div className=" bg-white mt-14 w-[45%] border rounded-xl h-[80%] flex flex-col gap-4 items-center pt-4">
                <h1 className='text-emerald-600 text-2xl font-semibold'>Create new Account</h1>
            <form className='flex flex-col gap-4 h-full pt-16 items-center w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className=' flex flex-col gap-1 w-[60%]'>
            <label className='text-xl' htmlFor="name">Name<span className='text-red-600 text-lg'>*</span></label>
            <input
              type="text"
              id="name" className='bg-sky-50 h-8 outline-1 border border-black rounded-full p-1 px-2'
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Name must only contain letters and spaces',
                },
              })}
            />
            {errors.name && <span className='text-sm text-red-600 '>{errors.name.message}</span>}
          </div>
    
          <div className='flex flex-col gap-1 w-[60%]'>
            <label className='text-xl' htmlFor="email">Email<span className='text-red-600 text-lg'>*</span></label>
            <input
              type="email"
              id="email" className='bg-sky-50 h-8 outline-1 border border-black rounded-full p-1 px-2'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email address is invalid',
                },
              })}
            />
            {errors.email && <span className='text-sm text-red-600 '>{errors.email.message}</span>}

          </div>
    
          <div  className='flex flex-col gap-1 w-[60%]'>
            <label className='text-xl' htmlFor="password">Password<span className='text-red-600 text-lg'>*</span></label>
            <input
              type="password"
              id="password" className='bg-sky-50 h-8 outline-1 border border-black rounded-full p-1 px-2'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
            />
            {errors.password && <span className='text-sm text-red-600 '>{errors.password.message}</span>}
          </div>
    
          <button className='bg-black text-white rounded-full w-[60%] h-10  text-xl ' type="submit">Register</button>
        <h4 className='text-xl font-semibold'>Aready have an Account ? <span onClick={()=>loginfnc()} className='text-sky-600 cursor-pointer '>Login now !</span></h4>

        </form>
            </div>
        </div>  
      );    
}

export default Register