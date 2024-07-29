/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/pageAndComponentsDatas'
import Error from './Error'
import Course_Slider from '../components/core/Catalog/Course_Slider'
import CourseCard from '../components/core/Catalog/CourseCard'
import Footer from '../components/common/Footer'

const Catalog = () => {
    
    const  {catalogName} =  useParams()
    
    const [categoryId ,  setCategoryId] =  useState("")
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [active ,  setActive] =  useState(1)

    useEffect(()=>{
        ;(async()=>{
            try {
                const  res = await apiConnector("GET" , categories.CATEGORIES_API )
                const  category_Id =  res?.data?.data.filter((ct)=>ct.name.toLowerCase().replace(" ", "-") === catalogName.toLowerCase())[0]._id
                console.log("Category Id"+categoryId)
                setCategoryId(category_Id)
            } catch (error) {
                console.log("Could not fetch Categories.", error)

            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[catalogName ])


    useEffect(()=>{
        if(categoryId){
            ;(async()=>{
                try{
                    const res = await getCatalogPageData(categoryId)
                    setCatalogPageData(res)
                }catch(error){
                    console.log(error)
                }
            })()
        }
    },[categoryId])

    if(!catalogPageData?.success){
        return <Error/>
    }

  return (
    <>
              {/* Hero Section */}
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `}
                    <span className="text-yellow-25">
                    {catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p className="text-3xl text-richblack-5">
                    {catalogPageData?.data?.selectedCategory?.name}
                </p>
                <p className="max-w-[870px] text-richblack-200">
                    {catalogPageData?.data?.selectedCategory?.description}
                </p>
                </div>
            </div>


            {/* section 1  */}
            <div className='mx-auto max-w-maxContentTab w-full lg:max-w-maxContent px-4 py-12 box-content  '>
                <div className=' text-richblack-25 text-3xl '>
                Courses to get you started
                </div>
                <div className='my-4 text-sm text-richblack-400  border-b flex gap-4 border-b-richblack-700'>
                    <p
                    className={`${active === 1 ? "text-yellow-25 border-b  border-b-yellow-25" : "text-richblack-50"} px-4 py-2`}
                    onClick={()=>setActive(1)}
                    >Most Popular</p>
                    <p
                     className={`${active === 2 ? "text-yellow-25 border-b  border-b-yellow-25" : "text-richblack-50"} px-4 py-2`}
                     onClick={()=>setActive(2)}
                    > New</p>
                </div>
                <div>
                    <Course_Slider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>

              {/* Section 2 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="text-richblack-25 text-3xl ">
                    Top courses in {catalogPageData?.data?.differentCategories?.name}
                    </div>
                    <div className="py-8">
                    <Course_Slider
                        Courses={catalogPageData?.data?.differentCategories}
                    />
                    </div>
                </div>


                 {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-richblack-25  text-3xl">Frequently Bought</div>
                <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, i) => (
                        <CourseCard course={course} key={i} Height={"h-[400px]"} />
                    ))}
                </div>
                </div>
            </div>

      <Footer />
            
    </>
  )
}

export default Catalog