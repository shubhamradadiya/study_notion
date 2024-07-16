import toast  from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";



const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    // CHANGE_PASSWORD_API,
    // DELETE_PROFILE_API
} =settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token , formData){
  return async (dispatch)=>{
    const  toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT",UPDATE_PROFILE_API, formData,{
        Authorisation: `Bearer ${token}`,
      })

      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data.updatedUserDetails.image
      ? response.data.updatedUserDetails.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
   
      dispatch(
      setUser({ ...response.data.updatedUserDetails, image: userImage })
    )

    toast.success("Profile Updated Successfully")

    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}