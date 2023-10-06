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

export const createNewCourse = createAsyncThunk("/course/create", async (userInput) => {
  try {
    const formData = new FormData();
    formData.append("title" , userInput.title);
    formData.append("category",userInput.category);
    formData.append("description",userInput.category);
    formData.append("createdBy",userInput.category);
    formData.append("thumbnail",userInput.thumbnail);


    const res = axiosInstance.post("course/createCourse", formData);
    toast.promise(res, {
      loading: "creating course..",
      success: (data) => {
        return data?.data?.message;
      },
      error: (data) => {
        return data?.data?.message;
      },
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
     builder.addCase(getAllCourses.fulfilled,(state,action)=>{
      if(action.payload){
        state.courseData = [...action.payload];
      }
     })
    }
 })




export default courseSlice.reducer;
