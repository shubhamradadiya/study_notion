import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { useDispatch, useSelector } from 'react-redux'
import GetAvgRating from '../utils/avgRating'
import RatingStars from '../components/common/RatingStars'
import { BiInfoCircle } from 'react-icons/bi'
import { formattedDate } from '../utils/dateFormatter'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import { BuyCourse } from '../services/operations/studentFeaturesAPI'
import Footer from '../components/common/Footer'
import ConfirmationModal from '../components/common/ConfirmationModal'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'

const CourseDetails = () => {

  const {  user} =  useSelector((state)=>state.profile)
  const  {token} =  useSelector((state)=> state.auth)
  const {courseId} = useParams()
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch =  useDispatch()
  const  navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  //Fetch a  courseDetails  and  set 
  const [ response ,  setResponse] = useState(null)
  useEffect(()=>{
    ;(async ()=>{
      try {
        console.log("before fetch")
        const res = await fetchCourseDetails(courseId)
        if(res?.data?.courseDetails){
          setResponse(res)
        }
        console.log("After Fetch Course")
        console.log(res)

      } catch (error) { 
        console.log("could not fetch the Course Details")
      }
    })()
  },[courseId])

      // Calculating Avg Review count
      const [avgReviewCount, setAvgReviewCount] = useState(3.5)
      useEffect(() => {
        // const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
        // setAvgReviewCount(count)
      }, [response])
      
      const [totalNoOfLectures ,  setTotalNoOfLectures] = useState(0)
      useEffect(()=>{
        let lectures = 0
        response?.data?.courseDetails?.courseContent?.forEach((sec)=>{
          lectures += sec?.subSection?.length || 0
        })
        setTotalNoOfLectures(lectures)
      },[response])


      const [ isActive ,  setIsActive] =  useState(Array(0))
    const handleActive = (id) => {
      setIsActive((prevActive) => {
        const isIdActive = prevActive.includes(id);
        if (isIdActive) {
          return prevActive.filter((activeId) => activeId !== id);
        } else {
          return [...prevActive, id];
        }
      });
    };

  const handleBuyCourse = ()=>{
     if(token) {
       BuyCourse(token , [courseId],user , navigate , dispatch)
      return
     }
       setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
  }


  const  {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response?.data?.courseDetails ?? {}



  return (
    <>
      <div className=' relative bg-richblack-800 p-9'>

        <div className='text-richblack-5 flex flex-col gap-4 pr-4 border-r-2 border-richblack-700 lg:w-8/12'>
             <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200 `}>{courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews?.length} reviews)`}</span>
                <span>{`${studentsEnrolled?.length} students enrolled`}</span>
              </div>

              <div>
                <p className="">
                  Created By {`${instructor?.firstName} ${instructor?.lastName}`}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formattedDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>

            <div className=' absolute right-10 '>
                <CourseDetailsCard 
                  course={response?.data?.courseDetails}
                  handleBuyCourse={handleBuyCourse}
                  setConfirmationModal={setConfirmationModal}
                />
            </div>
        </div>
      </div>

    <div className='mx-auto box-content lg:w-[1260px] text-start px-4 text-richblack-5 '>
      <div className=' mx-auto max-w-maxContentTab lg:mx-0 xl:w-[1260px]  '>
      {/* What you'll learn */}
        <div className='my-8 border border-richblack-600 p-8'>
         <p className="text-3xl font-semibold">What you'll learn</p>
          <div className=' mt-5 text-richblack-200'>
             {
              whatYouWillLearn
             }
          </div>
        </div>


        {/* Course Content */}
        <div>
          <div className=' flex flex-col gap-3'>
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent?.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response?.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
          </div>

          {/* course Details */}
          <div className='py-4'>
             {
              courseContent?.map((course ,  index)=>(
                <CourseAccordionBar
                  key={index}
                  course={course}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))
             }
          </div>

        </div>


      </div>
    </div>
     
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }
    </>
  )
}

export default CourseDetails