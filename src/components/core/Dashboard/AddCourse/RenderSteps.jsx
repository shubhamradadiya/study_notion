import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm'

const RenderSteps = () => {

    const { step } =  useSelector((state)=> state.course) 

    const steps = [
        {
            id: 1,
            title:"Course Information",
        },
        {
            id: 2,
            title:"Course Builder",
        },
        {
            id: 3,
            title:"Publish",
        },
    ]

  return (
        <>
          
            <div className='relative flex  mt-3 w-full justify-center'>
                {
                    steps.map((item ) =>(
                        <>
                            <div  key={item.id}>
                                
                                <div className={`text-richblack-400 w-8  flex items-center border justify-center h-8 rounded-full bg-richblack-700  
                                  ${step === item.id ? " bg-yellow-900  text-yellow-50 border-yellow-50 ":""}
                                `}>
                                   { step > item.id ? 
                                    <FaCheck className="font-bold text-richblack-900" />
                                    : ( item.id)
                                   }
                                </div>
                            </div>

                            {  item.id !== steps.length && (
                                    <>
                                    <div  className={`h-[calc(34px/2)] w-[33%]     border-dashed border-b-2 ${
                                            step > item.id  ? "border-yellow-50" : "border-richblack-500"
                                            } `}>

                                    </div>
                                    </>
                                    )
                                }
                        </>
                    ))
                }
            </div>

             <div className="relative mb-16 mt-2 flex w-full select-none justify-between">
            {steps.map((item) => (
            <>
                <div
                className="flex min-w-[130px] flex-col items-center "
                key={item.id}
                >
                
                <p
                    className={`text-sm ${
                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                    }`}
                >
                    {item.title}
                </p>
                </div>
                
            </>
            ))}
        </div>


        { step === 1 && <CourseInformationForm/>}
        </>
  )
}

export default RenderSteps