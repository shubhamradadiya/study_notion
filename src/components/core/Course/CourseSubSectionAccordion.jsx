import React from 'react'
import { HiOutlineVideoCamera } from 'react-icons/hi'

const CourseSubSectionAccordion = ({subSec}) => {
  return (
    <div>
        <div className=' '>
            <div className=' flex items-center gap-3'>
                <span className='text-yellow-5'>
                    <HiOutlineVideoCamera />
                </span>
                <p className=' text-sm '>{subSec?.title}</p>
            </div>
        </div>
    </div>
  )
}

export default CourseSubSectionAccordion