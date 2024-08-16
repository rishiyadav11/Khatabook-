import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"

const CreateHissab = () => {
    const navigate = useNavigate()
    // Initialize useForm hook
    const { register, handleSubmit, watch } = useForm()

    // Add state to manage the "isEncrypted" checkbox
    const [isEncrypted, setIsEncrypted] = useState(false)

    // Define onSubmit handler
    const onSubmit =async (data) => {
        // `data` will include all form fields, including `isEncrypted`
        // console.log(data)
        try {
            await axios.post('https://khatabook-backend.onrender.com/hissab/create', data,{  withCredentials: true,});
            navigate("/dashboard")
          } catch (error) {
            console.error('There was an error!', error.message);
          }
    }

    // Watch the "isEncrypted" checkbox to update the state
    const watchIsEncrypted = watch("isEncrypted", false)
    
    // Update state when "isEncrypted" checkbox changes
    React.useEffect(() => {
        setIsEncrypted(watchIsEncrypted)
    }, [watchIsEncrypted])

    return (
        <div className='px-10 flex flex-col gap-4 overflow-x-hidden sm:px-14 h-custom w-full'>
            <h1 className='text-2xl font-medium font-roboto'>Create New Hisaab</h1>
            <form className='flex flex-col gap-4' method='post' onSubmit={handleSubmit(onSubmit)}>
                {/* Register your inputs */}
                <input className='h-14 w-[40%] bg-gray-100 px-2 outline-red-400 rounded-md' id='title' name='title' {...register("title")} placeholder='Shopping Hisaab, Ghar ka Karch' />
                <textarea className='bg-gray-100 w-[50%] h-60 px-2 flex resize-none rounded-md py-2 overflow-x-hidden outline-red-400 items-start' id='content' name='content' {...register("content", { required: true })} placeholder='Daal, Aata, Chini' />
                <div className="flex gap-4 justify-between w-[50%]">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <label className='text-lg' htmlFor="isEncrypted">Encrypt this file</label>
                            <input type="checkbox" id="isEncrypted" {...register("isEncrypted")} />
                        </div>
                        {/* Conditionally render the passcode input based on the `isEncrypted` state */}
                        {isEncrypted && (
                            <input type="password"  {...register("hissabpass")} className='bg-gray-100 w-36 px-2 h-8 rounded-md' name="hissabpass" id="hissabpass" placeholder='Passcode' />
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <label className='text-lg' htmlFor="isShareable">Shareable file ?</label>
                            <input type="checkbox" id="isShareable" {...register("isShareable")} />
                        </div>
                        <div className="flex gap-2">
                            <label className='text-lg' htmlFor="isEditable">Edit Permissions</label>
                            <input type="checkbox" id="isEditable" {...register("isEditable")} />
                        </div>
                    </div>
                </div>
                <button type='submit' className='w-40 h-10 bg-red-500 text-white rounded-md hover:bg-red-600'>Create New Hissab</button>
            </form>
        </div>
    )
}

export default CreateHissab
