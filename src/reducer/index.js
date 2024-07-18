import { combineReducers } from "@reduxjs/toolkit";

import authReducer from  "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseSlice from "../slices/courseSlice";

const rootReducers = combineReducers({
   auth  : authReducer,
   profile:profileReducer,
   cart:cartReducer,
   course:courseSlice
})

export default rootReducers