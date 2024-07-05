import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import toast from 'react-hot-toast'
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../../slices/authSlice'
import { sendotp } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

  const  dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [FormData , setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const [showPassword , setShowPassword] = useState(false)
  const [showConfirmPassword , setShowConfirmPassword] = useState(false)

  const handleOnChange =(e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    })
    )
  }
 const {firstName , lastName,email ,password ,confirmPassword} = FormData
  
 const  handleOnSubmit = (e)=>{
    e.preventDefault()
    
    if(password !== confirmPassword){
      toast.error("Password Do not match")
      return
    }

    const signupData={
      ...FormData,
      accountType
    }
    console.log(signupData)
    //store data in slice
    dispatch(setSignupData(signupData))
    //api call
    dispatch(sendotp(FormData.email, navigate));

    //Reset the  files list
    setAccountType(ACCOUNT_TYPE.STUDENT);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  }

  const tabData = [
    {
      id:1,
      tabName:"Student",
      type:ACCOUNT_TYPE.STUDENT,
    },
    {
      id:2,
      tabName:"Instructor",
      type:ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]


  return (
    <div>
      <div className=' flex flex-col mt-2'>
          <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />

          {/* form */}
          <form onSubmit={handleOnSubmit} className=' flex w-full flex-col gap-y-3 mt-4'>
            <div className='flex gap-x-2 w-full'>
            <label className=''>
              <p>
                firstName <sup className="text-pink-200 ">*</sup>
              </p>
              <input
                required
                type='text'
                name='firstName'
                value={firstName}
                onChange={handleOnChange}
                placeholder='Enter first name'
                className=' rounded-[0.5rem] bg-richblack-800 p-[12px]  text-richblack-5'
              />
            </label>
            <label className=''>
              <p>
                lastName <sup className="text-pink-200 ">*</sup>
              </p>
              <input
                required
                type='text'
                name='lastName'
                value={lastName}
                onChange={handleOnChange}
                placeholder='Enter last name'
                className=' rounded-[0.5rem] bg-richblack-800 p-[12px]  text-richblack-5'
              />
            </label>
            </div>
             
            <label>
              <p>
                Email Address <sup className="text-pink-200 ">*</sup>
              </p>
              <input
                required
                type='email'
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder='Enter last name'
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]  text-richblack-5'
              />
            </label>
            
            <div className=' flex gap-x-4'>
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      Create Password <sup className="text-pink-200">*</sup>
                    </p>

                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        
                      ) : (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>

                  </label>
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      Confirm Password <sup className="text-pink-200">*</sup>
                    </p>

                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Enter confirmPassword"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                     
                      )}
                    </span>


                  </label>
            </div>

            <button
            type='submit'
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Create Account
            </button>

          </form>

      </div>
    </div>
  )
}

export default SignupForm