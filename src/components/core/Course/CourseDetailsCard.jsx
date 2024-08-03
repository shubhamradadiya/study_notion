import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from 'react-icons/fa'
import toast from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'




const CourseDetailsCard = ( {course , handleBuyCourse ,setConfirmationModal}) => {
    
    const {token} =  useSelector((state) => state.auth)
    const {user} =  useSelector((state) => state.profile)
    const  navigate =  useNavigate()
    const  dispatch =  useDispatch()

    const  handleShare =()=>{
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const  handleAddToCart =()=>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Only Students can add courses to cart")
            return
        }

        if(token){
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
          })
    }

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: courseId,
      } = course ?? {}
  return (
    <>
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 '>
            <img
            src={ThumbnailImage}
            alt={course?.courseName}
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
            />

            <div className=' px-4'>
                <div className=' text-2xl font-bold mb-2'>
                    Rs. {CurrentPrice}
                </div>
           
                <div className=' flex flex-col gap-4 '>
                    <button
                        className=' bg-yellow-50 font-semibold w-full text-black text-center p-2 rounded-md'
                        onClick={ user && course?.studentsEnrolled?.includes(user?._id) 
                        ? () => navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                        } 
                    >
                 {user && course?.studentsEnrolled.includes(user?._id)
                    ? "Go To Course"
                    : "Buy Now"}
                    </button>

                    {( !user || !course?.studentsEnrolled.includes(user?._id)) &&
                        (
                         <button
                            className=' bg-richblack-800 font-semibold w-full text-center p-2 rounded-md'
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        )
                    }
                </div>
                <div>
                    <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                    </p>
                </div>
                
                <div className=''>
                    <p className={`my-2 text-xl font-semibold `}>
                    This Course Includes :
                    </p>
                    <div className='  flex  flex-col gap-2 text-caribbeangreen-100'>
                        {   JSON.parse(course?.instructions ?? `[]`)?.map((item , i)=>(
                            <div key={i}>
                            <p className={`flex items-center gap-2`} key={i}>
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                            </div>
                        ))

                        }
                    </div>
                </div>

                <div
                    className=' items-center'
                >
                    <button
                    className=' flex items-center gap-2 mx-auto py-2 text-yellow-100'
                    onClick={handleShare}
                    >
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CourseDetailsCard