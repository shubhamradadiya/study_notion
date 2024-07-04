import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FooterLink2 } from '../../data/footer-links';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];
  const Plans = ["Paid memberships", "For students", "Business solutions"];
  const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {


  return (
    <div className=' flex flex-col  bg-richblack-800'>

        {/* Top */}
        <div className=' flex flex-wrap  my-10 mx-20  text-richblack-400'>
            {/* part 1 */}
            <div className=' lg:w-[50%]  flex flex-wrap justify-evenly    lg:border-r border-richblack-700 ' >
                {/* Section 1 */}
                <div>
                  <div className=' h-fit w-fit'>
                   <img src={Logo} alt='Logo'/>
                  </div>
                
                    <div className='flex flex-col mt-2 text-richblack-200'>
                        <h1 className=' text-richblack-50 font-bold mt-2'>Company</h1>
                        <div className='flex flex-col gap-2 mt-2'>
                        { ["About","Careers","Affiliates"].map((ele,i)=>{
                            return (
                                <div key={i} className=' text-[14px] text-richblack-200 cursor-pointer hover:text-richblack-50  transition-all duration-200 '>
                                  <Link to={ele.toLowerCase} className=' ' >{ele}</Link>
                                </div>
                                )

                            })
                        }
                        </div>
                        <div className="flex gap-3 mt-3 text-lg">
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>
                    </div>

                </div>
                {/* Section 2 */}
                <div className=' flex flex-col'>
                    <div className=' flex flex-col gap-2'>
                        <h1 className=' text-richblack-50 font-bold '>Resources</h1>
                         <div className='flex flex-col gap-2 mb-2'>
                            {Resources.map((ele,i)=>{
                                return(
                                    <div key={i} className=' text-[14px] hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.toLowerCase}>{ele}</Link>
                                    </div>
                                )
                            })

                            }
                         </div>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <h1 className=' text-richblack-50 font-bold'>Support</h1>
                        <div>
                            <Link to={"help-center"} className=' text-[14px] hover:text-richblack-50 transition-all duration-200 '>Help Center</Link>
                        </div>
                    </div>
                </div>
                {/* Section 3 */}
                <div className=' flex flex-col gap-6'>
                    <div className=' flex flex-col gap-2'>
                        <h1 className=' text-richblack-50 font-bold '>Plans</h1>
                         <div className='flex flex-col gap-2 mb-2'>
                            {Plans.map((ele,i)=>{
                                return(
                                    <div key={i} className=' text-[14px] hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.toLowerCase}>{ele}</Link>
                                    </div>
                                )
                            })

                            }
                         </div>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <h1 className=' text-richblack-50 font-bold '>Community</h1>
                         <div className='flex flex-col gap-2 mb-2'>
                            {Community.map((ele,i)=>{
                                return(
                                    <div key={i} className=' text-[14px] hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.toLowerCase}>{ele}</Link>
                                    </div>
                                )
                            })

                            }
                         </div>
                    </div>
                </div>
            </div>

            {/* part 2 */}
            <div className='lg:w-[50%] flex justify-evenly text-richblack-200 flex-wrap  '>
                 {/* section 1*/}
               
                    {FooterLink2.map((element,index)=>{
                        return(
                            <div 
                             key={index}
                            className='flex flex-col gap-2'>
                                <div ><h1 className=" text-richblack-50 font-bold ">{element.title}</h1></div>
                                <div
                                 className='flex flex-col gap-2'
                                >
                                    {element.links.map((ele,i)=>{
                                        return (
                                                <div key={i} className=' text-[14px] text-richblack-400 cursor-pointer hover:text-richblack-50  transition-all duration-200 '>
                                                <Link to={ele.link} className=' ' >{ele.title}</Link>
                                                </div>
                                            )
                                    })}
                                </div>
                            </div>
                        )
                    })

                    }
                 
            </div>

        </div>

        {/* Middle  */}
        <div className='w-[90%] mx-20 border-t border-richblack-700 mb-11 '></div>
        {/* bottom */}
        
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ ShubhamRadadiya © 2024 Studynotion</div>
        </div>
      </div>
    </div>
  )
}

export default Footer