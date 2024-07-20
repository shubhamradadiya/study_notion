import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import ChipInput from './ChipInput'

const CourseInformationForm = () => {

  const {
    register,
    setValue,
    getValues,
    formState:{errors},
    handleSubmit 
  }=useForm()

  const [loading ,  setLoading] = useState(false)
   const [ categories ,  setCategories] =  useState([]);

  useEffect(()=>{
    
    const getCategory = async() =>{
      setLoading(true);
      const result =  await fetchCourseCategories();
      setLoading(false);
      if(result.length > 0){
        setCategories(result);
      }
    }

    getCategory();
  },[])

  return (
     <form
       className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"

     >
     {/* Title */}
      <div className=' flex  flex-col space-y-2'>
        <label htmlFor='courseTitle' className=' text-sm text-richblack-5 '>
          Course Title <span className=' text-pink-200   '>*</span>
        </label>
        <input
          id="courseTitle"
          placeholder='Enter Course Title'
          {...register("courseTitle" , {required: true})}
          className='form-style'
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
            </span>
          )
        }
      </div>

      {/* description */}
        <div  className=' flex  flex-col space-y-2'>
          <label className=' text-sm text-richblack-5 ' htmlFor='courseShortDesc'>
            Course Short Description <span className=' text-pink-200 '>*</span>
          </label>
          <textarea
            id='courseShortDesc'
            className=' form-style resize-x-none min-h-[130px] w-full'
            placeholder="Enter Description"
            {...register("courseShortDesc" , { required: true})}
          />
          {
            errors.courseShortDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Description is required
              </span>
            )
          }
        </div>

        {/* price */}
          <div className='  flex flex-col gap-2'>
            <label className=' text-sm text-richblack-5 ' htmlFor='coursePrice'>
             Course Price <span className=' text-pink-200 '>*</span>
            </label>
            <div className=' relative'>
              <input
                id='coursePrice'
                className='form-style w-full !pl-12'
                {
                  ...register("coursePrice" , 
                  { required: true,
                  valueAsNumber:true,
                  pattern: {
                     value: /^(0|[1-9]\d*)(\.\d+)?$/,
                     },
                  })
                }
              /> 
               <HiOutlineCurrencyRupee className=' absolute top-1/2 -translate-y-1/2   left-3 inline-block  text-richblack-500 text-2xl ' />
            </div>
            {
              errors.coursePrice &&(
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Price is required
                </span>
              )
            }
          </div>

          {/* category */}
          <div className=' flex flex-col gap-2'>
            <label
             className=' text-sm text-richblack-5 '
             htmlFor='courseCategory'
            >
             Category <span className=' text-pink-500'>*</span>
            </label>
            <select
            {...register("courseCategory", { required: true })}
            defaultValue=""
            id='courseCategory'
            className=' form-style'>
              <option value="" disabled>Choose a Category</option>
              { !loading &&
                categories.map((category , index) =>(
                  <option key={index} value={category?._id}>
                      {category?.name}
                  </option>
                ))
              }
            </select>
            {
              errors.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Course Category is required
               </span>
              )
            }
          </div>

        {/* Tag */}
        <ChipInput
          setValue={setValue}
          getValues={getValues}
          register={register}
          name="courseTags"
          label="Tags"
          errors={errors}
          placeholder="Enter Tags and press Enter"
        />
          
     </form>
  )
}

export default CourseInformationForm