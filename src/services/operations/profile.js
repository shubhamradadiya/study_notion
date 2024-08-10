import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";



const {
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
}= profileEndpoints


export  async  function getUserEnrolledCourses (token){
    const toastId = toast.loading("Loading...");
   let  result = []
    try {
        const  response  =  await apiConnector("GET",GET_USER_ENROLLED_COURSES_API, null,
            {
                Authorisation :`Bearer ${token}`,
            }
        );
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        result =  response?.data?.data
        console.log("gggggggggggggggggg",result)
        console.log("Enrolled Courses",result)

    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
         toast.error("Could Not Get Enrolled Courses")
    }  
    
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
      result = response?.data?.courses
    } catch (error) {
      console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
      toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
  }
  