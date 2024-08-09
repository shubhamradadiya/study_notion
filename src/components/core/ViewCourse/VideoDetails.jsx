import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "video-react/dist/video-react.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import { BigPlayButton, Player } from 'video-react'
import IconBtn from '../../common/IconBtn'

const VideoDetails = () => {

  const  navigate = useNavigate()
  const dispatch =  useDispatch()
  const location =  useLocation()
  const playerRef = useRef(null)
  const {token} = useSelector((state) => state.auth)

  const {courseId , subSectionId ,  sectionId} =  useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLecture,
  } =  useSelector((state) => state.viewCourse)

  //when  video  are ended we are try to show a buttons
  const [videoEnded ,  setVideoEnded] = useState(false)
  

  const [ videoData , setVideoData] = useState([])
  const [previewSource ,  setPreViewSource] = useState("")
  const [loading ,  setLoading] = useState(false)

  useEffect(()=>{
    const sectionIndex =  courseSectionData?.findIndex((section)=>section._id === sectionId)
    const subSectionIndex =  courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

    const  currentVideoData =  courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex]
    setVideoData(currentVideoData)

    setPreViewSource(courseEntireData?.thumbnail)

    setVideoEnded(false)
  },[location.pathname, courseEntireData, courseSectionData, sectionId, subSectionId])
  
//check  this is first video
const isFirstVideo =()=>{
  const sectionIndex = courseSectionData?.findIndex((section)=>section._id === sectionId)
  const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

  if(subSectionIndex === 0 && sectionIndex === 0){
    return true
  }
  else{
    return false
  }
}

//check  this is last video
const isLastVideo =()=>{

  const sectionIndex = courseSectionData?.findIndex((section)=>section._id === sectionId)
  const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

  const courseSectionLength = courseSectionData?.length 
  const lastSectionLength = courseSectionData?.[sectionIndex]?.subSection?.length 

  if(sectionIndex === courseSectionLength - 1  && subSectionIndex === lastSectionLength - 1){
    return true
  }
  else{
    return false
  }

}


// go to  previous video

const gotoPrevVideo =()=>{

  const sectionIndex = courseSectionData?.findIndex((section)=>section._id === sectionId)
  const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

  if(subSectionIndex !== 0){
    const prevSubSectionId =  courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex - 1]?._id
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
  }
  else{
    const prevSectionId = courseSectionData?.[sectionIndex-1]?._id
    const prevSectionLength = courseSectionData?.[sectionIndex-1]?.subSection?.length

    const prevSubSectionId = courseSectionData?.[sectionIndex-1]?.subSection?.[prevSectionLength-1]?._id

    navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
  }
}

// go to next video
const gotoNextVideo =()=>{
  const sectionIndex = courseSectionData?.findIndex((section)=>section._id === sectionId)
  const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId)

  const SectionLength  =  courseSectionData?.[sectionIndex].length

  if(subSectionIndex !== SectionLength - 1){
    const nextSubSectionId =  courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex + 1]?._id
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
  }else{

    const nextSectionId = courseSectionData?.[sectionIndex+1]?._id
    const subSectionId = courseSectionData?.[sectionIndex+1]?.subSection?.[0]?._id

    navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${subSectionId}`)
  }
  

}


const handleLectureCompletion = async()=>{
  setLoading(true)
  const res =  await markLectureAsComplete({
    courseId: courseId,
    subSectionId:subSectionId,
  }, token)

  if(res){
    dispatch(updateCompletedLectures(subSectionId))
  }
  setLoading(false)
}

  return (
    <div className=' text-white'>
      { !videoData ?(
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div>
        
          <Player
            ref={playerRef}
            aspectRatio='16:9'
            playsInline ={true}
            onEnded={()=>setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position='center' />

            {/* Render When Video Ended */}
            {
              videoEnded && (
                <div
                   className=" absolute inset-0  z-[100] grid  place-content-center font-inter  "
                >
                  { !completedLecture?.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={()=>handleLectureCompletion()}
                      text={!loading ? "Mark As Completed":"Loading..."}
                      customClasses="text-xl max-w-max px-4 mx-auto"
                    />
                  )
                  }

                  <IconBtn
                     disabled={loading}
                     onclick={()=>{
                      playerRef.current.seek(0)
                      setVideoEnded(false)
                     }}
                      text="Rewatch"
                     customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  />

                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={gotoPrevVideo}
                        className=" py-2 px-3 rounded-md bg-richblack-600 text-richblack-25 font-semibold"
                      >
                        Prev
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={gotoNextVideo}
                        className=" py-2 px-3 rounded-md bg-richblack-600 text-richblack-25 font-semibold"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )
            }
          </Player>
        </div>
      )

      }
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails