import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdEnhancedEncryption } from "react-icons/md";
import { MdNoEncryption } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [allPosts, setAllPosts] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();
  const location = useLocation();

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hissab/posts", {
        withCredentials: true,
      });
      // console.log(response.data); // Log the posts data
      setAllPosts(response.data); // Update state with posts data
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts"); // Update error state
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      getAllPosts(); // Refetch posts if coming from a delete action
    }
  }, [location.state]);
  const handlePostClick = (post) => {
    // console.log(post.isEncrypted)
    navigate(`/post/${post._id}`, {
      state: {
        isEncrypted: post.isEncrypted
      }
    });

  };
  return (
    <div className="min-h-custom w-full px-10 sm:px-14">
      {allPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-semibold text-gray-600">
            No Hisaab created, let's create a new one!
          </h1>
          {/* You can add a button or a link to create a new Hisaab here if needed */}
        </div>
      ) : (
        <div className="p-4 rounded-md h-full lg:w-full flex flex-col lg:flex-row flex-wrap gap-4">
          {allPosts.map((post, index) => (
            <div
              key={index}
              onClick={() => handlePostClick(post)} // Add click handler
              className="flex p-4 cursor-pointer flex-shrink-0 flex-col gap-4 w-[80%] lg:w-[30%] h-44 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {post.isEncrypted ? (
                    <button className="flex bg-green-400 text-white h-10 w-28 justify-center items-center rounded-md gap-2">
                      <MdEnhancedEncryption /> Locked
                    </button>
                  ) : (
                    <button className="flex bg-green-400 text-white h-10 w-28 justify-center items-center rounded-md gap-2">
                      <MdNoEncryption /> Unlocked
                    </button>
                  )}
                  {post.isReadable ? (
                    <button className="text-white bg-sky-400 rounded-md h-10 w-10 flex justify-center items-center">
                      <FaRegEye />
                    </button>
                  ) : (
                    <button className="text-white bg-sky-400 rounded-md h-10 w-10 flex justify-center items-center">
                      <FaRegEyeSlash />
                    </button>
                  )}
                </div>
                <h3 className="text-gray-400 text-base font-roboto font-semibold">
                  Created on :{post.createdAt.split("T")[0]}
                </h3>
              </div>
              <h1 className="text-2xl font-semibold font-roboto">{post.title}</h1>
              <h3 className="text-gray-500 text-sm font-semibold">
                View Hisaab
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  

export default Dashboard;
