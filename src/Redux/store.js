import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slice/authSlice";
import courseSliceReducer from "./slice/courseSlice";
import paymentSliceReducer from "./slice/razorPaySlice";
import lectureSliceReducer from "./slice/lectureSlice";
import statsSliceReducer from "./slice/statSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course : courseSliceReducer,
    razorpay : paymentSliceReducer,
    lecture : lectureSliceReducer,
    stats : statsSliceReducer
  },
  devTools: true,
});

export default store;
