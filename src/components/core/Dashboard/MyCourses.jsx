import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from 'react-icons/vsc'
import IconBtn from "../../common/IconBtn"
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {

    const {token} =  useSelector((state) =>  state.auth)
    const navigate =  useNavigate()
    const [courses ,  setCourses] = useState([])
    
    useEffect(()=>{
        const  fetchCourses = async() =>{
          
            const  result = await fetchInstructorCourses(token)
            console.log(result)
            if(result){
                setCourses(result)
            }
        }
        fetchCourses()
    },[])

  return (
    <div >
        <div className=' flex  flex-wrap justify-between'>
          <div className='  flex  flex-col gap-3'>
              <p className=' text-richblack-500 text-sm'> Home / Dashboard / <span className=' text-yellow-50'>Courses</span></p> 
              <h1 className=' text-white text-2xl'>My Courses</h1>
          </div>
          <div>
            <IconBtn
              text="Add Course"
              onclick={() => navigate("/dashboard/add-course")}
            >
              <VscAdd />
            </IconBtn>
          </div>
        </div>

        { courses && <CoursesTable courses={courses} setCourses={setCourses}  /> }

    </div>
  )
}

export default MyCourses