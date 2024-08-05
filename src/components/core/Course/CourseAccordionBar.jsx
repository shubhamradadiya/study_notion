import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from './CourseSubSectionAccordion'

const CourseAccordionBar = ({course , isActive , handleActive}) => {

    //todo:  control the subSection hight
    const [ active, setActive] =  useState(false)
    useEffect(()=>{
        setActive(isActive.includes(course._id))
    },[isActive])

    const controlHeight = useRef(null)   
       //they are store  the hight CssStyle
    const [subSectionHeight, setSubSectionHeight] = useState(0)
    useEffect(()=>{
        setSubSectionHeight(active ? controlHeight.current.scrollHeight : 0)
    
    },[active])

  return (
    <div className=' overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5  last:mb-0'>
        <div className=' flex justify-between items-start bg-opacity-50 px-7  py-4 transition-[0.3s]'>
            <div className=' flex items-center  cursor-pointer gap-2'
             onClick={()=>{handleActive(course._id)}}
            >
                <i 
                    className={`${isActive.includes(course._id) ? "rotate-180" : "rotate-0"}`}
                   
                >
                    <AiOutlineDown />
                </i>
                <p>
                    {
                        course?.sectionName
                    }
                </p>
            </div>
            
            <div>
                <span className='text-yellow-50 '>
                    {`${course?.subSection?.length || 0} lectures(s)`}
                </span>
            </div>
        </div>
        
        <div
        ref={controlHeight}
        className=' '
        style={
            {
                height : subSectionHeight
            }
        }
        >
            <div
                className=' flex flex-col gap-2 px-7 py-2 font-semibold bg-richblack-800'
            >
                { course?.subSection?.map((subSec, i)=>(
                    <CourseSubSectionAccordion
                        key={i}
                        subSec={subSec}
                    />
                ))

                }
            </div>
        </div>

    </div>
  )
}

export default CourseAccordionBar