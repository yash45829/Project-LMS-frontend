import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (courseid) => {
    try {
      const response = axiosInstance.get(`/courses/${courseid}`);
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
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const response = axiosInstance.post(`/courses/${data.id}`, formData);
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
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
