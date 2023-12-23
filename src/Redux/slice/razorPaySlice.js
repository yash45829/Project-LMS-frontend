import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: "",
  finalMonths: "",
  monthlySalesRecord: "",
};

export const getRazorPayId = createAsyncThunk(
  "/payments/razorpayid",
  async () => {
    try {
      const response = await axiosInstance.get("/payments/razorpay-key");
      return response.data;
    } catch (error) {
      toast(error.message);
    }
  }
);
export const purchaseCourseBundle = createAsyncThunk(
  "/payments/subscribe",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      return response.data;
    } catch (error) {
      toast(error.message);
    }
  }
);

export const paymentVerify = createAsyncThunk(
  "/payments/paymentverify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
         console.log(response)
      return response?.data;
    } catch (error) {
      toast(error.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk("/payments/list", async () => {
  try {
    const response = axiosInstance.get("/payments?count=10");
    toast.promise(response, {
      loading: "downloading records",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed",
    });
    return (await response).data;
  } catch (error) {
    toast(error.message);
  }
});

export const unsubscribeCourse = createAsyncThunk(
  "/payments/list",
  async () => {
    try {
      const response = axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing course",
        success: (data) => {
          return data?.data?.message;
        },
        error: "try again",
      });
      return (await response).data;
    } catch (error) {
      toast(error.message);
    }
  }
);

const razorPaySlice = createSlice({
  name: "razorPay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        console.log("key" , action)

        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        console.log("subscribe" , action)
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(paymentVerify.fulfilled, (state, action) => {
        console.log(action)
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(paymentVerify.rejected, (state, action) => {
        state.isPaymentVerified = false;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        console.log(action)
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
      });
  },
});

export default razorPaySlice.reducer;
