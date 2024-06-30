import {react}  from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAbutton from '../components/core/HomePage/CTAbutton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';

const  Home = ()=>{
    
    return (
        <div>
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
                        <CTAbutton activate={true} linkto={"/signup"}>
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
                heading={
                    <div className="font-bold text-3xl">
                        Unlock your <HighlightText text={"coding potential"}/> with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabtn1={
                 {  active :true,
                    linkto:"/signup",
                    btnText:"try it yourself"
                 }
                }

                ctabtn2={
                    {
                        active :false,
                        linkto:"/login",
                        btnText:"learn more"
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


           </div>
            
            <Footer/>

        </div>
    )
      
    
}

export default Home;