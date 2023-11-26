import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slice/authSlice";
import courseSliceReducer from "./slice/courseSlice";
import paymentSliceReducer from "./slice/razorPaySlice";
import lectureSliceReducer from "./slice/lectureSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course : courseSliceReducer,
    payment : paymentSliceReducer,
    lecture : lectureSliceReducer,
  },
  devTools: true,
});

export default store;
