import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isloggedin: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait, creating account",
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

export const loginAccount = createAsyncThunk("/auth/login", async (data) => {
  try {
    console.log(data)
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait, authenticating data ..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "invalid credentials",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers : {},
});

// export cosnt {} = authSlice.actions;
export default authSlice.reducer;
