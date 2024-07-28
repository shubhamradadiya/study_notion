import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {  getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import RenderSteps from '../AddCourse/RenderSteps'



const EditCourse = () => {
    const { course} = useSelector((state)=>state.course)
    const { token }=  useSelector((state)=>state.auth)    

    const [loading ,  setLoading ] = useState(false);
    const {courseId} =  useParams()
    
    const dispatch = useDispatch()

    useEffect(()=>{
       const getCourseDetails = async(courseId)=>{
         setLoading(true)
           const result =  await getFullDetailsOfCourse(courseId, token)
           if (result?.courseDetails) {
            dispatch(setEditCourse(true))
             const tag =  JSON.parse(result?.courseDetails?.tag ) 
             const instructions =  JSON.parse(result?.courseDetails?.instructions )
            dispatch(setCourse({...result?.courseDetails,tag, instructions}))
          }
          setLoading(false)
       }
       getCourseDetails(courseId)
       
    },[])

    if (loading) {
      return (
        <div className="grid flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }

  return (
    <div>
        <h1 className=' mb-14 text-richblack-5 text-3xl font-medium'>Edit Course</h1>
    	  { course ?
          <RenderSteps/>
          :<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>

        }
    </div>
  )
}

export default EditCourse