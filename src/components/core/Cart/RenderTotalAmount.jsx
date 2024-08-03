import React from 'react'
import IconBtn from '../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { BuyCourse } from '../../../services/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'



const RenderTotalAmount = () => {
  const  {total, cart} = useSelector((state)=>  state.cart)
 const  {token} =  useSelector((state) => state.auth)
 const  {user} =  useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  handleBuyCourse = () => {
    const  courses = cart.map((course)=> course._id)
    BuyCourse(token,courses ,user , navigate , dispatch)
  }

  return (
    <div className=' text-white bg-richblack-800 p-6 min-w-[200px] max-h-[200px]  rounded-md border-[1px] border-richblack-700'>
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}

export default RenderTotalAmount