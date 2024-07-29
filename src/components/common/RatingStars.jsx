import React, { useEffect, useState } from 'react'
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
  } from "react-icons/ti"

const RatingStars = ({ Review_Count, Star_Size }) => {

    const [ starCount  ,  setStarCount ] = useState({
        full : 0 ,
        half : 0 , 
        empty : 0
    })
    
    useEffect(()=>{
        const fullStar = Math.floor(Review_Count) || 0
        const halfStar = Number.isInteger(Review_Count) ? 0 : 1
        const emptyStar =  5 - fullStar - halfStar

        setStarCount({full : fullStar , half : halfStar , empty : emptyStar})
    },[Review_Count])


  return (
    <div className='flex gap-1 text-yellow-100'>
        {[...new Array(starCount.full)].map((_,index)=>{
            return <TiStarFullOutline key={index} size={Star_Size}/>
        })}

        {[...new Array(starCount.half)].map((_,index)=>{
            return <TiStarHalfOutline key={index} size={Star_Size}/>
        })}

        {[...new Array(starCount.empty)].map((_,index)=>{
            return <TiStarOutline key={index} size={Star_Size}/>
        })}
    </div>
  )
}

export default RatingStars