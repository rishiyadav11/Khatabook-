import React from 'react'
import Hero from '../pages/Hero'
import Featuresec from "../pages/Featuresec"
import Boxes from '../pages/Boxes'
import Blogs from '../pages/Blogs'
const Home = () => {
  return (
    <div className='w-full select-none overflow-x-hidden'>
        <Hero/>
        <Featuresec/>
        <Boxes/>
        <Blogs/>
    </div>
  )
}

export default Home