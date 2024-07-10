import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'



const Sidebar = () => {
  const {user , loading:profileLoading} = useSelector((state)=>state.profile);
  const {loading:authLoading} = useSelector((state)=> state.auth);

  if(profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
      <div className="spinner"></div>
    </div>
    )
  }

  return (
    <div>
       <div className=' flex flex-col h-[calc(100vh-3.5rem)] max-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 '>
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link, i) =>{
              if(link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={i} iconName={link.icon} link={link}/>
              )
            })
          }
        </div>
       </div>
    </div>
  )
}

export default Sidebar