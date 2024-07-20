import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = ({setValue , getValues , errors ,  register , label ,  name , placeholder}) => {

  const [chips ,  setChips] = useState([]);

  const { course ,editCourse } = useSelector((state) => state.course);

  const  keyDownHandler =(e)=>{
    if(e.key==="Enter" || e.key===","){
      e.preventDefault();
      
    const chipValue = e.target.value.trim();

    if(chipValue && !chips.includes(chipValue)){
       const newChip = [...chips , chipValue]
       setChips(newChip);
       e.target.value=""
    }
      
    }
  }
    
  useEffect(()=>{
    
    if(editCourse){
      setChips(course?.tag)
    }
    register(name , {required: true , validate: (value)=>value.length > 0})
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(()=>{
    setValue(name , chips)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chips])

  const handleDeleteChip =(index)=>{
   const newChips=  chips.filter((_,inx)=> inx !== index)
   setChips(newChips);
  }

  return (
    <div className=' flex flex-col gap-3'>
      <label className='text-sm text-richblack-5' htmlFor={name}>
        {label} <span className=' text-pink-500'>*</span>
      </label>
       { chips.length>0 &&
       (
          <div className='flex flex-wrap gap-2  '>
            {
              chips.map((chip ,  index)=>(
                <div key={index} className=' flex  bg-yellow-400 gap-1 text-richblack-50  rounded-lg px-3 py-2'>
                  <div>{chip}</div>
                  
                <button
                  type="button"
                  className=" focus:outline-none mt-1"
                  onClick={() => handleDeleteChip(index)}
                  >
                  <MdClose className="text-sm" />
               </button>

                </div>
              ))
            }
          </div>
        )
        }
      <input
        className=' form-style '
        id={name}
        name={name}
        placeholder={placeholder}
        type='text'
        onKeyDown={keyDownHandler}
      />
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span> 
        )
      }
    </div>
  )
}

export default ChipInput