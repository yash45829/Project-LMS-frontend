import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slice/authSlice";
import courseSliceReducer from "./slice/courseSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course : courseSliceReducer,
  },
  devTools: true,
});

export default store;
