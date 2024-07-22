import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { addCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import ChipInput from './ChipInput'
import Upload from './Upload'
import { useDispatch, useSelector } from 'react-redux'
import RequirementsField from './RequirementsField'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { MdNavigateNext } from 'react-icons/md'
import IconBtn from '../../../../common/IconBtn'
import { COURSE_STATUS } from '../../../../../utils/constants'

const CourseInformationForm = () => {

  const {editCourse, course} = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

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

  // Submit data
  const onSubmit = async (data) =>{
    console.log("FORM  DATA.........................")
    console.log(data)

    const formData =  new FormData();
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)

    console.log(result)
  }
  
  return (
     <form
       className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
       onSubmit={handleSubmit(onSubmit)}
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

        {/* thumbnail */}
        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* course Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

        {/* requirement Field */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        setValue={setValue}
        getValues={getValues}
        register={register}
        errors={errors}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>

     </form>
  )
}

export default CourseInformationForm