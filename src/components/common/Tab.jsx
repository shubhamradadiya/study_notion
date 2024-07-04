import React from 'react'

const Tab = ({tabData ,accountType,setAccountType}) => {
  return (
    <div>
        <div
              style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
         className=' flex bg-richblack-700 rounded-full w-fit px-1 py-1 gap-x-1  '>
            {
                tabData.map((tab , index)=>{
                  return  <button
                    key={index}
                    onClick={()=>setAccountType(tab.type)}

                    className={`${accountType === tab.type 
                        ?" bg-richblack-800 text-richblack-25" 
                        :" bg-transparent text-richblack-200"}
                         px-5 py-2 rounded-full transition-all duration-200
                        `}
                    >
                    {tab.tabName}
                    </button>
                })
            }
        </div>
    </div>
  )
}

export default Tab