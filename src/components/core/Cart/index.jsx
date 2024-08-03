import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const { total ,  totalItems} = useSelector((state)=> state.cart)
    const {paymentLoading} =  useSelector((state)=> state.course)

    
  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
            {totalItems} Courses in Cart
        </p>
        { totalItems > 0 ?(
            <div className='  flex  flex-col-reverse gap-x-10 mt-8 lg:flex-row '>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>
        ): (
            <p className="mt-14 text-center text-3xl text-richblack-100">
                Your cart is empty
            </p>
        )

        }
    </>
  )
}

export default Cart