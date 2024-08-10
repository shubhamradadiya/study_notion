import React, { useState } from 'react'
import { Bar, Pie } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const InstructorChart = ({courses}) => {


  const [ currentChart ,  setCurrentChart] =  useState("student")

  const generateRandomColor =  (numColor)=>{
    const Colors = []
    for( var i=0; i<numColor; i++){
        const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        Colors.push(color)
    }
    return Colors
  }


  const chartDataStudents ={
    labels : courses.map((course)=> course.courseName),
    datasets : [
       {
        label : "StudentsEnrolled",
        data : courses.map((course)=> course?.totalStudentsEnrolled),
        backgroundColor : generateRandomColor(courses.length),
       }
    ]
  }
  const chartIncomeData ={
    labels : courses.map((course)=> course.courseName),
    datasets : [
       {
        label : "Income",
        data : courses.map((course)=> course?.totalAmountGenerated),
        backgroundColor : generateRandomColor( courses.length),
       }
    ]
  }

  const options = {
    maintainAspectRatio: false,
  }


  return (
    <div className='bg-richblack-800 p-6'>
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className=' bg-richblack-900 w-fit rounded-full py-1 px-1 transition-all duration-500 '>
      <div className='flex items-center'>
        <button
          onClick={()=>setCurrentChart("student")}
          className={`rounded-full p-1 px-3 transition-all duration-200
            ${currentChart === "student" ? "bg-richblack-700 text-yellow-50 " : "text-yellow-400 "}
          `}
        >
          Students
        </button>
        <button
          onClick={()=>setCurrentChart("income")}
          className={`rounded-full p-1 px-3 transition-all duration-200
            ${currentChart === "income" ? "bg-richblack-700 text-yellow-50 " : "text-yellow-400 "}
          `}
        >
          Income
        </button>
      </div>
      </div>
      {/* Render Chart */}
      <div
       className=' w-full h-full'
      >
        
            { currentChart === "student" ?
              <div className=' h-full w-fit p-11 pt-2'>
              <Bar data={chartDataStudents} options={options} />
              </div> :
              <div
              className=' h-full w-fit p-11 pt-2 '
              >
              <Pie data={chartIncomeData} options={options} />
              </div>
           }
      </div>
    </div>
  )
}

export default InstructorChart