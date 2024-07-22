import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import ChipInput from './ChipInput'
import Upload from './Upload'
import { useDispatch, useSelector } from 'react-redux'
import RequirementsField from './RequirementsField'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { MdNavigateNext } from 'react-icons/md'
import IconBtn from '../../../../common/IconBtn'
import { COURSE_STATUS } from '../../../../../utils/constants'
import toast from 'react-hot-toast'

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

    // if Edit Mode On 
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategory();
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  // Submit data
  const onSubmit = async (data) =>{
    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

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