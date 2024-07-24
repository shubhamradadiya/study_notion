import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi';
import { BigPlayButton, Player } from 'video-react';
import "video-react/dist/video-react.css"

const Upload = ({setValue ,  getValue , register , name , label , errors, 
    editData=null, 
    video = false , 
    viewData=null , }) => {



      const [ selectFile ,  setSelectFile] =  useState(null);
      const  [ previewImage, setPreviewImage ] = useState(
        viewData ? viewData : editData ? editData : ""
      );

      const onDrop = useCallback(acceptedFiles => {
         const  file =  acceptedFiles[0];
         previewSettings(file);
         setSelectFile(file);
        
      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept : !video ? {"image/*": [".jpeg", ".png",".jpg"] } : {"video/*":[".mp4"]} ,
        onDrop})
      

      const  previewSettings = (file) =>{
        const reader =  new FileReader();
         reader.readAsDataURL(file);
         reader.onloadend = () => setPreviewImage(reader.result);
      }

      useEffect(()=>{
        register(name, {required: true})
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[register])

      useEffect(()=>{
        setValue(name,selectFile)
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[selectFile, setValue])

  return (
    <div className=' flex flex-col gap-2'>
      
      <label htmlFor={name} className=' text-sm text-richblack-50'>{label} {!viewData && <span className=' text-pink-500'>*</span>}
      </label>
      
      <div 
        className={`${isDragActive ? " bg-richblack-600" : " bg-richblack-700 "}
        flex min-h-[250px] rounded-md  cursor-pointer items-center justify-center border border-dotted border-richblack-500
        `}>
        {
          previewImage ?
            (<div className=' flex flex-col w-full p-6 '>
              {!video ? 
                <img src={previewImage} alt={name}/> 
                :  <Player playsInline aspectRatio="16:9"  src={previewImage} />

              }
              {!viewData &&
                <button
                type="button"
                onClick={() => {
                  setPreviewImage("")
                  setSelectFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
              }
            </div>)
           :(<div {...getRootProps()} className=' w-full flex flex-col justify-center items-center' >
                <input {...getInputProps()} />
                    <div className=' grid aspect-square place-items-center w-14 rounded-full bg-pure-greys-800'>
                      <FiUploadCloud  className=' text-2xl text-yellow-50  '/>
                    </div>

                     <p className=' mt-2 text-richblack-200  text-sm'>
                       Drag and drop an { !video ? "image" : "video" }, or  <span className=' font-semibold text-yellow-50  ' >Browse</span> a file  
                     </p>

                     <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                      </ul>
              </div>
            )
        }
      </div>
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )

        }
    </div>
  )
}

export default Upload