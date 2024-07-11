import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';

const ChangeProfilePicture = () => {

    const [loading , setLoading]  =useState(false);
    
    const [imageFile , setImageFile] = useState(null);
    const [previewSource , setPreviewSource] = useState(null);
    
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state) => state.profile)
    const fileRef =  useRef(null)

    const  dispatch = useDispatch();
    
    const  handleClick = () =>{
      fileRef.current.click()
    }

    const  handleFileChange = (e)=>{
      const file = e.target.files[0]

      if(file){
        setImageFile(file);
        previewFile(file)
      }
    }

    function previewFile (file){
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload=()=>{
        setPreviewSource(render.result);
      }
    }


    const handleFileUpload =()=>{
      try {
        setLoading(true);
        const  formData = new FormData();
        formData.append("displayPicture", imageFile)
        dispatch(updateDisplayPicture(token , formData)).then(()=>{
          setLoading(false);
        })

 
      } catch (error) {
        console.log("ERROR :" + error.message)
      }
    }

  return (
    <div className=' bg-richblack-800 rounded-md py-3 text-richblack-5 px-4'>
       <div className=' flex items-center gap-4'>
            <img src={ previewSource || user?.image} 
            alt={`profile-${user?.firstName}`}
            className=' object-cover w-[78px] rounded-full aspect-square'
            />

            <div className=' flex flex-col gap-2'>
              <p>Change Profile Picture</p>
              <div className=' flex gap-3'>
                <input  
                    ref={fileRef}
                    type='file'
                    onChange={handleFileChange}
                    className=' hidden'
                    accept="image/png, image/gif, image/jpeg"
                 />

              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>


              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>

              </div>
            </div>

       </div>
    </div>
  )
}

export default ChangeProfilePicture