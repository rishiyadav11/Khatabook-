import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoShareSocial } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const PostDetails = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams(); // Get the post ID from the URL
  const location = useLocation(); // Get the passed state
  const [post, setPost] = useState(null); // Initialize as null to handle non-array data
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  const isEncrypted = location.state?.isEncrypted;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/hissab/post/${id}`,
        { withCredentials: true } // Ensure cookies or tokens are sent with the request
      );
      setPost(response.data.data); // Set the posts data
    } catch (err) {
      setError(
        "Error fetching posts: " + (err.response?.data?.error || err.message)
      );
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    if (isEncrypted) {
      setCheck(true);
      setLoading(false); // No need to fetch data if encrypted
    } else if (isEncrypted === false) {
      fetchPosts();
    }
  }, [isEncrypted, id]); // Dependency array includes id to refetch if it changes

  const [incorect, setincorect] = useState('')
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/hissab/post/${id}`,
        { password: data.hissabPass }, // Send the password in the request body
        { withCredentials: true }
      );
      console.log(response.data);
      setCheck(false);
      setPost(response.data.data); // Extract data from response
    } catch (err) {
      if (err.response) {
        // Check if the error is due to an incorrect password
        if (err.response.status === 400 || err.response.status === 401) {
          setincorect("Incorrect password");
          console.error("Incorrect password submitted");
        } else {
          setError(err.response?.data?.error || "Error fetching posts");
        }
      } else if (err.request) {
        console.log("Network error", err.request);
        setError("Network error");
      } else {
        console.error(err);
        setError("An unexpected error occurred");
      }
      // window.location.reload(); // Refresh the page in case of error
    } finally {
      setLoading(false);
    }
  };
  

  

  const deletefnc = () => {
    console.log("chalo delete karte hia");
    try {
      axios.delete(`http://localhost:3000/hissab/delete/${id}`, {
        withCredentials: true,
      });
      // console.log(resposne)
      navigate("/dashboard", { state: { refresh: true } });
    } catch (error) {
      setError("Failed to delete hisaab"); // Update error state
    }
  };

  const Editfnc = () => {
    navigate(`/EditHisaab/${id}`, { state: { post } });
  };

  const handleShare = () => {
    const shareableLink = `http://localhost:5173/shared/${post._id}`;
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard: " + shareableLink);
  };

  const [deletestate, setdeletestate] = useState(false);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-custom px-10 sm:px-14">
      <div className=" h-full w-full rounded-md relative">
        <div
          className={`${
            deletestate ? "flex flex-col gap-4 items-center" : "hidden"
          } rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[40%] w-[60%] bg-gray-100`}
        >
          <div className="flex justify-end w-full px-4 items-center h-12">
            <button onClick={() => setdeletestate(false)} className="text-3xl">
              <RxCrossCircled />
            </button>
          </div>
          <h1 className="text-2xl ">
            Do you really wants to delete this Hissab
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => deletefnc()}
              className="bg-red-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-red-500"
            >
              Yes
            </button>
            <button
              onClick={() => setdeletestate(false)}
              className="bg-sky-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-sky-500"
            >
              No
            </button>
          </div>
        </div>
        {check ? (
          <div className="relative w-full h-full ">
            <div className="absolute top-1/2 left-1/2 rounded-lg  transform -translate-x-1/2 -translate-y-1/2 h-[30%] w-[40%] bg-gray-100">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full h-full flex flex-col gap-4 items-center justify-center"
              >
                <h1 className="text-2xl font-roboto ">Enter your password</h1>
                <div className="flex justify-center bg-gray-50 border rounded-md w-[50%] gap-2">
  <input 
    type={showPassword ? "text" : "password"} // Dynamically change the type based on showPassword state
    {...register("hissabPass", {
      required: "Password is required",
    })}
    placeholder="Enter password"
    className="p-2 rounded outline-none"
  />
  {incorect && (
    <p className="text-red-500">{incorect}</p>
  )}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
    className="text-black p-1 rounded"
  >
    {showPassword ? (<FaEye />) : (<FaEyeSlash />)} {/* Show different icons based on showPassword state */}
  </button>
</div>

                

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            {post ? (
              <div className="flex flex-col gap-4 select-none">
                <h1 className="text-4xl font-roboto font-semibold text-gray-700">
                  {post.title}
                </h1>
                <textarea
                  name=""
                  readOnly
                  className="bg-gray-200 w-[60%] overflow-x-hidden resize-none h-[60vh] p-4 text-lg font-roboto font-semibold text-slate-600 rounded-lg outline-none  border-red-400"
                  value={post.content}
                />
                <div className="flex gap-4">
                  {post.isEditable ? (
                    <button
                      onClick={() => Editfnc()}
                      className="bg-green-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-green-500"
                    >
                      Edit Hisaab
                    </button>
                  ) : null}
                  <button
                    onClick={() => setdeletestate(true)}
                    className="bg-red-400 h-10 w-40 rounded-md text-white text-lg font-semibold hover:bg-red-500"
                  >
                    Delete{" "}
                  </button>
                  {post.isShareable ? (
                    <button
                      onClick={() => handleShare()}
                      className="bg-sky-400 h-10 w-10 flex justify-center items-center text-lg font-semibold rounded-md text-white hover:bg-sky-500"
                    >
                      <IoShareSocial />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>No post data available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
