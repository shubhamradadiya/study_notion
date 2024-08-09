import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'

const ViewCourse = () => {

  const {courseId} =useParams()
  const {token} =  useSelector((state)=>state.auth)
  const dispatch =  useDispatch()
  const  [reviewModal ,  setReviewModal ] = useState(false)

  useEffect(()=>{
    ;(async()=>{
        const courseData = await getFullDetailsOfCourse(courseId , token)
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
        dispatch(setEntireCourseData(courseData?.courseDetails))
        dispatch(setCompletedLectures(courseData?.completedVideos))

        let  lectures = 0 
        courseData?.courseDetails?.courseContent?.forEach((section)=>{
            lectures += section?.subSection?.length
        })

        dispatch(setTotalNoOfLectures(lectures))
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
    <div>
        <div className=' flex  relative min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

            <div className='flex-1 mx-6 overflow-auto h-[calc(100vh-3.5rem)] ' >
                <Outlet/>
            </div>
        </div>
    
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse