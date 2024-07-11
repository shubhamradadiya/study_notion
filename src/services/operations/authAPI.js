import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} =endpoints

export function sendotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function signup ( 
  signupData,
  otp,
  navigate){
  return async(dispatch)=>{
    const  toastId = toast.loading("Loading...");
    setLoading(true);
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    try {
     console.log( firstName, 
      lastName,
      email,
      password,
      confirmPassword,
      accountType ,
      otp,)
      const response = await apiConnector( "POST" , SIGNUP_API , 
       {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
       }  )

        if(!response.data.success){
          throw new Error(response.data.success);
      
        }
       toast.success("Successfully Signed Up")
       navigate("/login");
    } catch (error) {
      console.log("Sign Up Error: ", error.message);
      toast.error("couldn't sign up")
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
  
        dispatch(setToken(response.data.token))
  
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
          
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


export function getPasswordResetToken (email , setEmailSent ){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const  response = await apiConnector("POST",RESETPASSTOKEN_API , {
        email
      })
      
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);

    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR" , error) ;
       toast.error("Failed to reset password Token")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}


export function resetPassword(password , confirmPassword , token, navigate) {
   return async (dispatch)=>{

    console.log(password , confirmPassword , token,)

      const toastId =  toast.loading("Loading...");
      dispatch(setLoading(true));
      
      try {
        const response = await apiConnector("POST" , RESETPASSWORD_API , {
          password,
          confirmPassword,
          token
        })

        if(!response.data.success){
          throw new Error(response.data.message);
        }
        toast.success("Password Is reset successfully")
        navigate("/login")
      } catch (error) {
        console.log("ERROR In Reset Password: " , error)
        toast.error("Unable to reset password")
      }
      dispatch(setLoading(false));
    toast.dismiss(toastId)
   }
}


export function logout (navigate){
    return (dispatch)=>{
      dispatch(setLoading(true));
      try {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast.success("Logged Out");
        navigate("/");

      } catch (error) {
        
      }
    }
}