import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (courseid) => {
    try {
      const response = axiosInstance.get(`/course/${courseid}`);
      toast.promise(response, {
        loading: "fetching lectures for course",
        success: "lectures downloaded",
        error: "failed to show lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.video);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const response = axiosInstance.post(
        `/course/${data.course_id}`,
        formData
      );
      toast.promise(response, {
        loading: "adding lecture for course",
        success: "lecture added ",
        error: "failed to add lecture",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteLecture = createAsyncThunk(
  "course/lecture/del",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/course?courseId=${data.courseid}&lectureId=${data.lectureid}`
      );
      toast.promise(response, {
        loading: "deleting lecture",
        success: "deleted lecture",
        error: "failed to delete",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        console.log(action)
        state.lectures = action?.payload?.lecture;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lecture;
      });
  },
});

export default lectureSlice.reducer;
