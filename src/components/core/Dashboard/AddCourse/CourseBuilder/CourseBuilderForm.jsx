import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from 'react-icons/io5'
import NestedView from './NestedView'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { MdNavigateNext } from 'react-icons/md'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'

const CourseBuilderForm = () => {
   
    const {register ,
         formState:{errors} , 
         handleSubmit , 
         setValue , 
          } = useForm()
        
        const  dispatch = useDispatch()

         const {course} =  useSelector((state)=>state.course)
         const {token} =  useSelector((state)=>state.auth)

        const [loading ,  setLoading] =  useState(false) 
        const [editSectionName, setEditSectionName] = useState(null)

        const cancelEdit =()=>{
            setEditSectionName(null);
            setValue("sectionName","")
        }

        const goBack =()=>{
            dispatch(setStep(1))
            dispatch(setEditCourse(true))
        }

        const goToNext = ()=>{
            if(course.courseContent.length === 0 ){
                toast.error("Please add at list one Section");
                return
            }
            if(course.courseContent.some((section)=> section.subSection.length=== 0)){
                toast.error("Please add at list one subSection");
                return
            }

            dispatch(setStep(3))
        }



        const onSubmit = async (data) => {
            // console.log(data)
            setLoading(true)
        
            let result
        
            if (editSectionName) {
                console.log(editSectionName)
              result = await updateSection(
                {
                  sectionName: data.sectionName,
                  sectionId: editSectionName,
                  courseId: course._id,
                },
                token
              )
              // console.log("edit", result)
            } else {
              result = await createSection(
                {
                  sectionName: data.sectionName,
                  courseId: course._id,
                },
                token
              )
            }
            console.log(result)
            if (result) {
              console.log("section result", result)
              dispatch(setCourse(result))
              setEditSectionName(null)
              setValue("sectionName", "")

              console.log(course)
            }
            setLoading(false)
          }

    //  When Nested view  EditPencil Icon  Click  then  Its Called
    const handleChangeEditSectionName = (sectionId , sectionName)=>{

        if(editSectionName === sectionId){
            cancelEdit()
            return
        }

        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }


  return (
    <div className=' bg-richblack-800 p-6 border border-richblack-700 rounded-md space-y-8'>
        <p className=' text-2xl text-richblack-5 '>Course Builder</p>

        <form className=' space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 ">
                <label className="text-sm text-richblack-5" htmlFor="sectionName">
                     Section Name <sup className="text-pink-200">*</sup>
                </label>
                <input
                    id="sectionName"
                    disabled={loading}
                    className='form-style'
                    placeholder='Add a section to build your course'
                    {...register("sectionName", {required:true})}
                />
              {errors.sectionName && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Section name is required
                    </span>
                )}
            </div>
            <div
            className='flex items-end  gap-x-4'
            >
                  <IconBtn
                    type="submit"
                    disabled={loading}
                    text={editSectionName ? "Edit Section Name" : "Create Section"}
                    outline={true}
                >
                    <IoAddCircleOutline size={20} className="text-yellow-50" />
                </IconBtn>

                { editSectionName && 
                    <button
                     type="button"
                     onClick={cancelEdit}
                     className='text-sm text-richblack-100 underline'
                     >
                        Cancel Edit 
                    </button>
                }
            </div>
        </form>

        {course?.courseContent.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
        }

        {/* Next prev Button */}
        <div className=' flex gap-x-3  justify-end'>
            <button
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
                Back
            </button>

            <IconBtn disabled={loading} text="Next" onclick={goToNext}>
                <MdNavigateNext/>
            </IconBtn>
        </div>

    </div>
  )
}

export default CourseBuilderForm