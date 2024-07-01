import {react}  from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAbutton from '../components/core/HomePage/CTAbutton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';

const  Home = ()=>{
    
    return (
        <div>
          {/* section 1 */}
          <div className=' w-11/12 relative mx-auto flex flex-col items-center justify-center text-white'>

                {/* section 1 */}
                <Link to={"/signup"}>
                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight size={13} />
                    </div>
                </div>
                </Link>
                
                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with <HighlightText text={"Coding Skills"} />
                </div>

                
                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className=' flex gap-7 mt-8'>
                        <CTAbutton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAbutton>
                        <CTAbutton active={false} linkto={"/login"}> 
                            Book a Demo
                        </CTAbutton>
                </div>


                <div
                 className=' mx-28 my-12 shadow-[23px_23px_1px_1px_#f7fafc] border-none'
                 >
                    <video
                     muted
                     loop
                     autoPlay
                    >
                        <source src={Banner} type='video/mp4'/>
                    </video>
                </div>
          {/* code Section 1 */}
          <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

          {/* code Section 2 */}  
          <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding in seconds"}/>
                        
                    </div>
                }
                subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

           </div>
            
        {/* section 2 */}
          <div className=' bg-pure-greys-5 text-richblack-700 '>
                
                <div className='homepage_bg h-[310]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white '>
                            <CTAbutton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3' >
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                                
                            </CTAbutton>
                            <CTAbutton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAbutton>
                        </div>

                    </div>
                </div>
          
                <div className=' mx-auto w-11/12 max-w-maxContent flex flex-col justify-between  gap-7'>
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the Skills you need for a
                            <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAbutton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAbutton>
                        </div>

                    </div>


                </div>

            <TimelineSection/>
            
            <LearningLanguageSection/>


          </div>

          
          
        {/*Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

                <InstructorSection />

                <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
                {/* Review Slider here */}

        </div>

        <Footer/>

        </div>
    )
      
    
}

export default Home;