import React from 'react';
import Smallsec from '../components/Smallsec';
import Khatasvg from '../svg/Khatasvg';
import Bigbsksvg from '../svg/Bisgbsksvg';
import Playndapple from '../svg/Playndapple'
import Leftfest from '../svg/Leftfest'
import Rightfeat from '../svg/Rightfeat'
import Featcompo from '../components/Featcompo';
const Featuresec = () => {
  return (
    <div className="w-full h-[150vh] bg-white  px-10  sm:px-14  relative">
      <Leftfest />
      <Rightfeat/>
      <div className="absolute z-10 flex items-center justify-center -top-2 gap-2   h-32 w-full">
        <Smallsec 
          image={<Khatasvg />} 
          text1="3 Cr+ Businesses using our free apps" 
          text2="Access your account anywhere, anytime." 
          links={<Playndapple/>} 
        />
        <Smallsec 
          image={<Bigbsksvg/>} 
          text1="Already use Tally? *" 
          text2="Get Tally * on mobile with BizAnalyst" 
          links="Go To BigAnalyst" 
          right 
        />
      </div>
      <div className=" w-full absolute z-10 top-32 flex    flex-col gap-4 pt-16">
        <h3 className='text-red-600 font-semibold text-center  text-base tracking-wider'>POWERFUL FEATURES TO HELP YOU</h3>
        <h1 className='font-bold text-5xl tracking-wider leading-none text-center font-roboto'>Built with features for <br /> growing businesses</h1>
        <Featcompo first={true} text1="GST & Non-GST Bills" text2="Create customised invoices & easily share with customers" points={["Custom fields like Vehicle No, PO No etc.","Detailed sales and purchase reports","No double-entry across khata and cashbook"]} />
        <div className="w-full flex gap-4 ">
        <Featcompo second={true} text1="Inventory Management" text2="Track your stock in/out and profits" points={["Detailed stock history with sale & purchase price with notes","Low stock tracking","Profit tracking at daily, weekly and monthly level"]} />
        <Featcompo third={true} text1="Business management on the go" text2="Use Khatabook across different devices" points={["Data synced across mobile and desktop devices","Use Khatabook in both online and offline mode (Coming Soon)"]} />
        </div>
      </div>
    </div>
  );
};

export default Featuresec;
