import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'

const Settings = () => {
  return (
    <>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5 '> Edit Profile</h1>

        {/* profile picture change */}
        <ChangeProfilePicture/>
        
         {/* profile details  */}
        <EditProfile/>
    </>
  )
}

export default Settings