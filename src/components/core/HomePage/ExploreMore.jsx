import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [ courses , setCourse] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (tab)=>{
        
        setCurrentTab(tab);
        const  result = HomePageExplore.filter((course)=> course.tag === tab)
       
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
     <div>
            {/*explore Text   */}
            <div>
                <div className="text-4xl font-semibold text-center my-10 gap-2" >
                 <div className='flex gap-1 justify-center'>
                 Unlock the 
                 <HighlightText text={" Power of Code"} />
                 </div>
                <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
                    Learn to Build Anything You Can Imagine
                </p>
                </div>
            </div>
            
            {/* main section */}
            <div>

                <div>
                    <div className=' flex gap-3 bg-richblack-700 px-4 py-2 rounded-full' >
                        {
                            tabsName.map((tab, i) => {
                                return <div 
                                className={` text-pure-greys-300 flex items-center
                                 ${ currentTab === tab? " bg-black text-richblack-25   font-bold rounded-full px-3 py-1":""}
                                `}
                                key={i} 
                                onClick={()=>setMyCard(tab)}>{tab}</div>
                            })
                        }
                    </div>
                </div>
                <div className="hidden lg:block lg:h-[200px]"></div>


                {/* Cards Group */}
                <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
                    {courses.map((ele, index) => {
                    return (
                        <CourseCard
                        key={index}
                        cardData={ele}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    );
                    })}
                </div>
            </div>
     </div>
)
}

export default ExploreMore