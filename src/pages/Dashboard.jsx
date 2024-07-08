import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {

   const { loading : authLoading} = useSelector((state)=> state.auth)
   const {loading : profileLoading } = useSelector ((state)=> state.profile)

   if(authLoading || profileLoading){
    return <div className='spinner'></div>
   }

  return (
    <div>
        <div>

            
        <div>
            <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Dashboard