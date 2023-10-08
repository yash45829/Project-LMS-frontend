import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  courseData: localStorage.getItem("courseData") || [],
};

export const getAllCourses = createAsyncThunk("/auth/courses", async () => {
  try {
    const res = axiosInstance.get("course/getAllCourses");
    toast.promise(res, {
      loading: "Loading courses..",
      success: (data) => {
        return data?.data?.message;
      },
      error:  (data) => {
        return data?.data?.message;
      },
    });
    return (await res).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (userInput) => {
    try {
      const formData = new FormData();
      formData.append("title", userInput.title);
      formData.append("category", userInput.category);
      formData.append("description", userInput.description);
      formData.append("createdBy", userInput.createdBy);
      formData.append("thumbnail", userInput.thumbnail);
console.log(formData)
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
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload)
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
