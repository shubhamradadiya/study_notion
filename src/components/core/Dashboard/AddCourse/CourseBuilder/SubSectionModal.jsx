import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import Upload from '../CourseInformation/Upload'
import IconBtn from '../../../../common/IconBtn'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'

const SubSectionModal = ({
    modalData ,
    setModalData,
    add=false,
    view=false,
    edit=false,
}) => {

    const {token} = useSelector((state)=> state.auth)
    const {course} = useSelector((state)=> state.course)

    const {
        setValue,
        getValues,
        register,
        formState:{errors},
        handleSubmit
    } =useForm()

    const dispatch = useDispatch()

    const[loading ,  setLoading]=useState(false)

    useEffect(() => {
        if (view || edit) {
          // console.log("modalData", modalData)
          setValue("lectureTitle", modalData.title)
          setValue("lectureDesc", modalData.description)
          setValue("lectureVideo", modalData.videoUrl)
        }
      }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
          currentValues.lectureTitle !== modalData.title ||
          currentValues.lectureDesc !== modalData.description ||
          currentValues.lectureVideo !== modalData.videoUrl
        ) {
          return true
        }
        return false
      }

      const handleEditSubsection = async () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
          formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
          formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
          // console.log("result", result)
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
      }

    const onSubmit = async(data) => {

        if (view) return

        if (edit) {
          if (!isFormUpdated()) {
            toast.error("No changes made to the form")
          } else {
            handleEditSubsection()
          }
          return
        }
    

        const formData = new FormData()
        formData.append("sectionId" ,  modalData)
        formData.append("title" , data.lectureTitle)
        formData.append("description" , data.lectureDesc)
        formData.append("video" , data.lectureVideo)

        setLoading(true)
        const result = await createSubSection(formData, token)
        if(result){
            const  updatedCourseContent = course.courseContent.map((section)=>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }

  return (
    <div className=' fixed  inset-0 z-[1000]  !mt-0 h-screen w-screen overflow-auto  flex flex-col justify-center bg-white bg-opacity-5 backdrop-blur-sm   items-center'>
        <div className=' mt-36 scale-[0.9] w-11/12 max-w-[700px] bg-richblack-800 border border-richblack-400 rounded-lg '>
            <div className=' flex overflow-auto bg-richblack-700 text-richblack-5 items-center justify-between p-3 rounded-t-lg '>
                <p>
                    {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                </p>
                <button
                  onClick={()=>setModalData(null)}
                >
                    <RxCross2/>
                </button>


            </div>
                {/* form model */}
            <form
             onClick={handleSubmit(onSubmit)}
            className=' space-y-8 px-9 py-10'
            >
                    <Upload 
                        name="lectureVideo"
                        label="lectureVideo"
                        setValue={setValue}
                        getValue={getValues}
                        register={register}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData?.videoUrl : null }
                        editData={edit ? modalData?.videoUrl : null }
                     />

                    {/* lecture title */}
                    <div className=' flex flex-col gap-2'>
                        <label 
                        className=' flex gap-1 text-richblack-25 text-sm'
                        htmlFor='lectureTitle'
                        >
                            Lecture Title {!view && <span className='text-pink-500'>*</span>}
                        </label>
                        <input
                            disabled={view || loading}
                            id='lectureTitle'
                            className='form-style w-full'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}

                        >
                        </input>
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                            )}
                    </div>
                     {/* Lecture Description */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                    Lecture Description{" "}
                    {!view && <sup className="text-pink-200">*</sup>}
                    </label>
                    <textarea
                    disabled={view || loading}
                    id="lectureDesc"
                    placeholder="Enter Lecture Description"
                    {...register("lectureDesc", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                    />
                    {errors.lectureDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Lecture Description is required
                    </span>
                    )}
                </div>

                {!view && (
                    <div>
                    <div className="flex justify-end">
                        <IconBtn
  
                          disabled={loading}
                         text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}

                         />
                           
                        </div>
                    </div>

                )

                }
           </form>
        </div>
    </div>
  )
}

export default SubSectionModal