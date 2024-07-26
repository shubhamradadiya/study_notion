import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

const PublishCourse = () => {
    

    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } =  useForm()


    const {course} =  useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[])

    const  navigate =  useNavigate()
    const dispatch =  useDispatch()
    const [loading, setLoading] =  useState(false)


    const  goBack = () =>{
        dispatch(setStep(2))
    }

    const goToCourses = () =>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () =>{

        // check if form has been updated or not
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || 
           ( course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
            //no form updated 
            // not required to  api  call
            goToCourses()
            return
        }

        const  formData =  new FormData()

        const courseStatus =  getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        formData.append("courseId", course._id)

        setLoading(true)
        const result = await editCourseDetails(formData , token)
            console.log("PUBlish course  " +result)
        if (result) {
            goToCourses()
          }
        setLoading(false)

    }


    const  onSubmit = (data) =>{
        handleCoursePublish()
    }
    
  return (
     <div className=' bg-richblack-800 border-[1px] p-6 rounded-lg border-richblack-700   '>
      <p className=' text-2xl text-richblack-5 '>
        Publish Settings
      </p>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className=' my-6  '> 
                <label htmlFor='public' className='flex items-center gap-1  '>
                    <input
                        id='public'
                        type='checkbox'
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 "
                         {...register("public")}
                        />
                    <span className=' text-sm text-richblack-500 '>
                      Make  sure you have publish course
                    </span>
                </label>
            </div>

            <div className='  flex gap-x-3 max-w-max ml-auto items-center'>
                <button
                    type='button'
                    disabled = {loading}
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"

                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Save Changes" />

            </div>

        </form>
     </div>
  )
}

export default PublishCourse