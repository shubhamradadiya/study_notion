import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profile'

const EnrolledCourses = () => {

    const {token} =  useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    useEffect(()=>{
        ;(async()=>{
            const  response  =  await  getUserEnrolledCourses(token)
            
            const filterPublishCourse = response?.filter((ele) => ele.status !== "Draft")
            setEnrolledCourses(filterPublishCourse)
        })()
    },[])
       
  return (
    <>
        <div
            className=' text-3xl text-richblack-50 '
        >
            Enrolled Courses
        </div>

        {!enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                You have not enrolled in any course yet.
                {/* TODO: Modify this Empty State */}
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                {/* Heading */}
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Course Names */}
                    { enrolledCourses.map((course , i ) =>(
                        <div key={i} className=' flex items-center'>
                            <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                                <img
                                src={course.thumbnail}
                                alt="course_img"
                                className="h-24 w-34 rounded-lg object-cover"
                                />

                                <div className=' flex flex-col max-w-xs gap-2'> 
                                    <p className=' text-s text-yellow-50 font-bold'>{ course.courseName} </p>
                                    <p className=' text-xs  text-richblack-100'> {course.courseDescription.length > 50 ? 
                                           course.courseDescription.slice(0,50) + `...` 
                                           : course.courseDescription} </p>
                                </div>
                            </div>

                            <div className="w-1/4 px-3 py-3">2h</div>

                            <div className=' flex  w-1/5  flex-col gap-2'>
                                <p>Progress: {course.progressPercentage || 30}%</p>
                                <ProgressBar
                                completed={30 || 0}
                                height="8px"
                                isLabelVisible={false}
                            />
                            </div>

                        </div>
                    ))
                        

                    }
                </div>  
            )
      }
    </>    
)
}

export default EnrolledCourses