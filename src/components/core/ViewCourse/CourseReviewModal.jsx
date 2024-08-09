import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const { token} =  useSelector((state) => state.auth)
    const {user } =  useSelector((state) => state.profile)
    const {courseEntireData} =  useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()


    useEffect(() => {
        setValue("courseRating", 0)
        setValue("courseExperience", "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const  ratingChanged = (newRating) => {
        console.log(newRating)
        setValue("courseRating" ,  newRating)
    }

    const onSubmit = async(data)=>{
        await createRating (
            {
                courseId:courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            }
            , token)
           
            setReviewModal(false)
    }

  return (
    <div className=' grid place-content-center fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-[1000]'>
        <div className=' text-white w max-w-[700px] bg-richblack-900 border border-richblack-500 rounded-lg  border-[2px] '>   
            {/* header */}
            <div className=' flex items-center rounded-t-lg justify-between px-3 py-4 gap-3 bg-richblack-800'>
                <p className=' font-bold text-xl'>Add Review</p>
                <button onClick={()=>setReviewModal(false)}
                    className=' text-2xl font-bold hover:text-richblack-400 transition-all duration-200'
                >
                    <RxCross2/>
                </button>
            </div>

            <div className="p-7 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-x-4">
                    <img
                    src={user?.image}
                    alt={user?.firstName + "profile"}
                    className="aspect-square w-[50px] rounded-full object-cover"
                    />
                    <div className="">
                    <p className="font-semibold text-richblack-5">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-richblack-5">Posting Publicly</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} 
                    className='flex flex-col gap-2 items-center mt-3'
                >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={34}
                        activeColor="#ffd700"
                    />
                    <div>
                    <label
                        className="text-sm text-richblack-5"
                        htmlFor="courseExperience"
                    >
                        Add Your Experience <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                            id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.courseExperience && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Please Add Your Experience
                            </span>
                        )}
                    </div>

                    
                    <div className="mt-6 flex items-end ml-auto justify-end gap-x-2">
                        <button
                            onClick={() => setReviewModal(false)}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Cancel
                        </button>
                        <IconBtn text="Save" type="submit" />
                    </div>
                    
                </form>
            </div>

        </div>
    </div>
  )
}

export default CourseReviewModal