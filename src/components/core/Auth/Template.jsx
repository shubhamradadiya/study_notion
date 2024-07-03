import React from 'react'
import frameImg from "../../../assets/Images/frame.png"


import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({title , description1 ,description2 ,image,formType}) => {
  return (
    <div className=' w-11/12 '>
      <div className=" text-white mx-auto flex flex-row items-center  max-w-maxContent my-[5%] justify-evenly ">
      {/* Content */}
        <div className=' flex flex-col gap-2'>
            <div className='flex flex-col '>
               <h1>{title}</h1>
               <p>{description1}</p>
               <p className='font-edu-sa font-bold italic text-blue-100'>{description2}</p>
            </div>
            <div>
                {
                  formType === 'signup' ? <SignupForm/>  :<LoginForm/>
                }
            </div>
        </div>
        {/* Image */}
        <div className=' relative    max-w-[450px] '>
           <img 
            src={frameImg}
            alt='frameImage'
            width={558}
            height={504}
            loading='lazy'
           />
           <img 
            src={image}
            alt='formImage'
            width={558}
            height={504}
            className="absolute -top-4 right-4"
            />

        </div>
      </div>
    </div>
  )
}

export default Template