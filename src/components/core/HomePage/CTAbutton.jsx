import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children,active,linkto}) => {

  return (
    <div className={`flex items-center font-bold px-6 py-3 rounded-md
     ${active ? " bg-yellow-50 text-black":" bg-richblack-800 "} 
    hover:scale-95 transition-all duration-200
    `}>
        <Link to={linkto}>
            {children}
        </Link>
    </div>
  )
}

export default CTAbutton