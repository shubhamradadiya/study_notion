import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination"
import { FreeMode, Pagination } from 'swiper/modules';
import CourseCard from './CourseCard';

const Course_Slider = ({Courses}) => {
  return (
    <Swiper
        slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
    >
      {
        Courses.map((course ,  i) => (
          <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"}/>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default Course_Slider