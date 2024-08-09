import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import {BsChevronDown} from "react-icons/bs"
import IconBtn from "../../common/IconBtn"
const VideoDetailsSidebar = ({setReviewModal}) => {

    //for sectionActive 
    const [activeStatus ,  setActiveStatus] =  useState("")
    //for SubSectionActive
    const [videoBarActive ,  setVideoBarActive] = useState("")

    const  navigate  =  useNavigate()
    const location =  useLocation()
    const {sectionId , subSectionId} =  useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLecture,
      } = useSelector((state) => state.viewCourse)


      useEffect(()=>{
        ;(()=>{
            if (!courseSectionData.length) return

        const sectionIndex =  courseSectionData?.findIndex((section)=>section._id === sectionId)
        const subSectionIndex =  courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

        const activeSectionId= courseSectionData?.[sectionIndex]?._id
        const activeSubSectionId = courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex]?._id

        setActiveStatus(activeSectionId)
        setVideoBarActive(activeSubSectionId)
        })()
      },[courseEntireData , courseSectionData , location.pathname ])

      
  return (
    <div
    className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800"
    >
        <div className='mx-5 flex flex-col items-start justify-between gap-2  gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>

            <div className='flex items-center gap-3 justify-between'>
                <div
                onClick={() => {
                    navigate(`/dashboard/enrolled-courses`)
                }}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                title="back"
                >
                <IoIosArrowBack size={30} />
                </div>

                <IconBtn
                text="Add Review"
                customClasses="ml-auto "
                onclick={() => setReviewModal(true)}
                />
            </div>
             
             <div className=' flex flex-col'>
                <p>{courseEntireData?.courseName}</p>
                <p
                 className=' text-sm font-semibold text-richblack-500'
                >{completedLecture?.length } / {totalNoOfLectures} </p>
             </div>
        </div>

        {/* section & subSection List */}

         <div className=' text-white'>
        { courseSectionData?.map((section ,  index)=>(

            <div key={index}
            className=' mt-2 cursor-pointer text-sm text-richblack-5' 
              onClick={()=> setActiveStatus(section?._id)}
            >

                {/* Section */}
                <div
                 className=' flex items-center gap-2 justify-between bg-richblack-600 px-5 py-4'
                >
                    <div className=' font-semibold w-[70%]'>
                        {section?.sectionName}
                    </div>
                    <div
                     className={`${activeStatus !== section?._id ? "rotate-180" : "rotate-0"} transition-all duration-500 `}
                    >
                     <BsChevronDown/>
                    </div>
                </div>
               
                {/* subSection */}

                { activeStatus === section?._id &&
                    <div className=' transition-[height] duration-500 ease-in-out'>
                        { section?.subSection?.map((subSection,  index)=>(
                            <div key={index}
                            className={` flex items-center gap-3 px-5 py-2
                              ${videoBarActive === subSection?._id ?
                               " bg-yellow-50 text-richblack-800" 
                               : " hover:bg-richblack-900 "}
                            `}
                            
                            onClick={()=>{
                                navigate(`view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`)
                                setVideoBarActive(subSection?._id)
                            }}
                            >   
                                <input
                                    type="checkbox"
                                    checked={completedLecture.includes(subSection?._id)}
                                    onChange={()=>{}}
                                />
                                {subSection?.title}
                            </div>
                        ))}
                    </div>

                }
            </div>  
        ))

            }
         </div>


    </div>
  )
}

export default VideoDetailsSidebar