import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {


  return (
    <>
        <div className='  flex items-start gap-x-6'>
            <div className=' flex  flex-col flex-1'>
                <h1 className=' text-3xl text-richblack-5 '>
                    AddCourse
                </h1>
                <div className="flex-1">
                    <RenderSteps />
                </div>
            </div>
            <div className=' sticky top-12 hidden flex-1 lg:block  max-w-[400px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
              <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
                <ul className=' text-richblack-5 list-disc ml-5 space-y-4 text-xs '>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>
                    Add Topics in the Course Builder section to create lessons,
                    quizzes, and assignments.
                    </li>
                    <li>
                    Information from the Additional Data section shows up on the
                    course single page.
                    </li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AddCourse