import React, { useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RxDropdownMenu } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import SubSectionModal from './SubSectionModal'


const NestedView = ({handleChangeEditSectionName}) => {

    const {course} =  useSelector((state)=>state.course)
    const {token} =  useSelector((state)=>state.auth)

    const dispatch = useDispatch()

    const [confirmationModal , setConfirmationModal] = useState(null)

    const handleDeleteSection = async (sectionId) =>{
        const result = await deleteSection({
            sectionId ,
            courseId:course?._id,
            token
        },token)

        console.log(result)
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
        console.log(course)
    }

    const handleDeleteSubSection = async (subSectionId , sectionId) =>{
        const result =  await  deleteSubSection({subSectionId:subSectionId, sectionId:sectionId , token})

        if(result){
            
            const updatedCourseContent = course.courseContent.map((section)=> 
                section._id === sectionId  ? result : section
            )

            const updatedCourse = { ...course , courseContent: updatedCourseContent}

            dispatch(setCourse(updatedCourse))
       

        }

        setConfirmationModal(null)
    }

    const [ addSubSection ,  setAddSubSection] =  useState(null)
    const [viewSubSection , setViewSubSection] = useState(null)
    const [editSubSection , setEditSubSection] = useState(null)

  return (
  <>
    <div>
        { course.courseContent.map((section)=>(
            <details key={section._id} open>
                <summary className=' flex  cursor-pointer justify-between items-center'>
                  {/* section Name */}
                    <div className="flex items-center gap-x-3">
                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                        <p className="font-semibold text-richblack-50">
                        {section.sectionName}
                        </p>
                    </div>

                    {/* section Btn */}
                    <div className=' flex items-center gap-x-2'>
                        <button
                         onClick={()=>handleChangeEditSectionName(section._id , section.sectionName)}
                        >
                            <MdEdit className=' text-xl text-richblack-300 '/>
                        </button>

                        <button
                         onClick={()=>setConfirmationModal({
                            text1: "Delete this Section?",
                            text2: "All the lectures in this section will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSection(section._id),
                            btn2Handler: () => setConfirmationModal(null),
                         })}
                        >
                            <RiDeleteBin6Line className=' text-xl text-richblack-300 '/>
                        </button>
                        
                        <span className=' text-2xl   text-richblack-300 font-bold'>|</span>
                        <AiFillCaretDown className=' text-xl text-richblack-300 '/>
                    </div>
                </summary>
                <div className=' px-6 pb-6 bg-richblack-700 rounded-lg '>
                    {section.subSection.map((data)=>(
                        <div key={data?._id} onClick={()=>setViewSubSection(data)} className=' mt-1'>
                            
                            <div className=' flex items-center justify-between py-2'>
                               <div className='flex items-center gap-2 text-richblack-50 '>
                                 <RxDropdownMenu className=' text-xl'/>
                                 <p className=' font-bold'>{data?.title} </p>
                               </div>

                                <div className=' flex items-center gap-2'
                                    onClick={(e)=>e.stopPropagation()}
                                >
                                    <button
                                     onClick={()=>setEditSubSection({...data , sectionId : section._id})}
                                    >
                                     <MdEdit className=' text-lg  text-richblack-300 '/>
                                    </button>

                                    <button
                                     onClick={()=>setConfirmationModal({
                                        text1: "Delete this Sub-Section?",
                                        text2: "This lecture will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler: ()=> handleDeleteSubSection(data._id , section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                     })}
                                    >
                                      <RiDeleteBin6Line className=' text-lg text-richblack-300 '/>
                                    </button>

                                    <span className=' text-xl   text-richblack-300 font-bold'>|</span>
                                    <AiFillCaretDown className=' text-lg text-richblack-300 '/>
                                </div>

                            </div>
                        </div>
                    ))

                    }

                    <button 
                            onClick={()=>setAddSubSection(section?._id)}
                            className=' flex gap-x-2 items-center mt-5 text-yellow-50 '
                        >
                            <FaPlus className="text-lg" />
                            <p>Add Lecture</p>
                        </button>
                </div>
            </details>
        ))

        }
    </div>
    
    {/* confirmation Modal */}
    { confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    {/* Modal Display */}
    {addSubSection ? 
    <SubSectionModal
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
    />
    : viewSubSection ?
      <SubSectionModal
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
       />  
      : editSubSection ? 
        <SubSectionModal 
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
        /> 
          : <> </>

    }

  </>
  )
}

export default NestedView