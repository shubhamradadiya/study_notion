import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementsField = ({getValues ,  setValue , errors ,  register ,  name , label  }) => {

    const [requirement ,setRequirement] = useState("")
    const [requirementsList,setRequirementsList] = useState([])
   
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
          setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      useEffect(() => {
        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [requirementsList])
    


    const handleAddRequirement = () => {
        if (requirement) {
          setRequirementsList([...requirementsList, requirement])
          setRequirement("")
        }
      }

    const handleCancel = (index)=>{
            const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    } 
  return (
    <div className=' flex flex-col w-full '>
        <label className=' text-richblack-50 text-sm' htmlFor={name}>
            {label} <span className=' text-pink-500'>*</span>
        </label>
        <div
        className=' flex flex-col gap-1 justify-start'
        >
            <input
             id={name} 
              className='form-style '
              value={requirement}
              type='text' 
              placeholder='Enter Benefits of course'
             
              onChange={(e)=>setRequirement(e.target.value)}
              />
               
            <div >
                <button type='button' className=' font-bold text-yellow-50' onClick={handleAddRequirement}>
                    Add
                </button>
                { requirementsList.length> 0 && (
                    <div className='  text-richblack-50 '>
                        {requirementsList.map((item,index)=>(
                            <div key={index} className=' flex justify-between items-center'>
                                <p>{item}</p>
                                <button type='button' className=' text-2xl' onClick={()=>handleCancel(index)}>-</button>
                            </div>
                        ))

                        }
                    </div>
                )
                }

            </div>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {label} is required
                </span>
            )

            }
        </div>

    </div>
  )
}

export default RequirementsField