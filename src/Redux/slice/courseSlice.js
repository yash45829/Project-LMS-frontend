import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  courseData: localStorage.getItem("courseData") || [],
};

export const getAllCourses = createAsyncThunk("/auth/courses", async (data) => {
  try {
    const res = axiosInstance.post("course/getAllCourses", data);
    toast.promise(res, {
      loading: "Loading courses..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "request failed",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
    name : "course",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
     builder.addCase((state,action)=>{
      
     })
    }
 })




// export cosnt {} = authSlice.actions;
export default courseSlice.reducer;
