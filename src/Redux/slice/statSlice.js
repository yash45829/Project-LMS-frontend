import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  allUserCount: "",
  subscribedUsers: "",
};

export const userStat = createAsyncThunk("admin/userstat", async () => {
  try {
    const response = axiosInstance.get("/miscellaneous/admin/stats/user");

    toast.promise(response, {
      loading: "user stat is fetching",
      success: (data) => {
        return data.data.message;
      },
      error: "failed to load",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userStat.fulfilled, (state, action) => {
      console.log(action);
      state.allUserCount = action?.payload?.allUserCount;
      state.subscribedUsers = action?.payload?.subscribedCount;
    });
  },
});

export default statSlice.reducer;
