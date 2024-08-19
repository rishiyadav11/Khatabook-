import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';


const Blogs = () => {
  const blogdatas=[
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2023-04-17_071513.6522650000.webp",
      text1:"7 Ways Goods and Service Tax benefits the Economy",
      text2:"The GST is a destination-based tax applied to goods and services sold in any jurisdiction. Continue reading this article to ..."
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2023-04-17_071338.1721490000.webp",
      text1:"GST Frequently Asked Questions",
      text2:"Want to know more about GST in India? Get your GST queries solved through these frequently asked GSTquestions. Read"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2021-06-11_085440.7923620000.webp",
      text1:"Learn About Goods and Services Tax:Advantages And Disadvantages",
      text2:"GST is a significant tax reform in the country and replaces many indirect taxes imposed by the government. Read about"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2023-04-17_070901.2046820000.webp",
      text1:"Everything You Need to Know About the Latest Amendment to CGST Act",
      text2:"Are you aware of the amendments to CGST Act? Here is the information that you must know regarding CGST Act,"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2021-06-06_121825.7177350000.webp",
      text1:"A Guide to Filing GST Annual Returns (GSTR-9)",
      text2:"What is GSTR 9? The GSTR 9 is a statement that a registered taxpayer needs to file once every year. Doad Moral"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2021-06-06_121658.5230390000.webp",
      text1:"Understanding the GST Amendment Act of 2018 and it's Impact",
      text2:"The GST Amendment Act 2018 was passed by the Lok Sabha on the 6th of August 2018. Read the article"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2023-04-17_070517.8370720000.webp",
      text1:"Importance and Functions of GST Network in India",
      text2:"Do you know what is GST network? Are you aware of the function of this platform? Read this article to"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2023-04-17_071338.1721490000.webp",
      text1:"GST Frequently Asked Questions",
      text2:"Want to know more about GST in India? Get your GST queries solved through these frequently asked GSTquestions. Read"
    },
    {
      image:"https://khatabook-assets.s3.amazonaws.com/media/post/2021-06-11_085440.7923620000.webp",
      text1:"Learn About Goods and Services Tax:Advantages And Disadvantages",
      text2:"GST is a significant tax reform in the country and replaces many indirect taxes imposed by the government. Read about"
    },
  ]
  return (
    <div className='relative mt-4 px-10 sm:px-14 flex flex-col items-center gap-6'>
    <h1 className='text-2xl font-semibold'>Khatabook Blogs</h1>
    
    {/* <Swiper
      cssMode={true}
      navigation={{
        prevEl: '.custom-swiper-button-prev',
        nextEl: '.custom-swiper-button-next'
      }}
      pagination={{ clickable: true }}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper w-full h-48"
      slidesPerView={2}
      loop={false}
    >
      {blogdatas.map((blog, index) => (
        <SwiperSlide key={index} className='flex h-full w-full'>
          <div className="w-1/2 h-full bg-cyan-100">
            <img className='w-full h-full object-cover' src={blog.image} alt={blog.text1} />
          </div>
          <div className="w-1/2 h-full px-5 flex flex-col gap-2 pt-1">
            <button className='bg-sky-200 w-24 rounded-lg p-1 text-blue-500 text-lg'>GST</button>
            <h1 className='text-lg font-semibold'>{blog.text1}</h1>
            <h2><span className='text-xl text-sky-400 font-semibold'>{blog.text2}...Read More</span></h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper> */}

<Swiper
  cssMode={true}
  navigation={{
    prevEl: '.custom-swiper-button-prev',
    nextEl: '.custom-swiper-button-next'
  }}
  pagination={{ clickable: true }}
  mousewheel={true}
  keyboard={true}
  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
  className="mySwiper w-full h-64   bg-white"
  slidesPerView={2}
  loop={true}
>
  {blogdatas.map((blog, index) => (
    <SwiperSlide key={index} className='flex justify-center items-center'>
      <div className="w-[48%] justify-center flex items-center h-full">
        <img className='w-full h-[69%]  rounded-lg object-cover' src={blog.image} alt={blog.text1} />
      </div>
      <div className="w-[48%] justify-center flex  h-full px-4 pt-2 flex-col">
        <button className='bg-sky-200 w-16 rounded-lg p-1 text-gray-700 text-lg mb-2'>GST</button>
        <h1 className='text-md font-semibold mb-2'>{blog.text1}</h1>
        <h2>{blog.text2}<span className='text-xl text-sky-400 font-semibold'>...Read More</span></h2>
      </div>
    </SwiperSlide>
  ))}
</Swiper>




    <div className="custom-swiper-button-prev absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-white rounded-full w-10 h-10 flex justify-center items-center shadow-lg hover:bg-gray-300 cursor-pointer">
      <IoIosArrowBack className='text-red-300 text-2xl font-bold ' />
    </div>
    <div className="custom-swiper-button-next absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-white rounded-full w-10 h-10 flex justify-center items-center shadow-lg hover:bg-gray-300 cursor-pointer">
      <IoIosArrowForward className='text-red-300 text-2xl font-bold' />
    </div>

    <button className='bg-red-500 text-white text-lg font-semibold px-4 py-3 rounded-md'>
      View All Articles
    </button>
  </div>
);
}

export default Blogs;
