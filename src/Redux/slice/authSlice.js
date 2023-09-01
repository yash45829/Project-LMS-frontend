import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    isloggedin : localStorage.getItem("isLoggedIn") || false,
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data") || {}
}

const authSlice = createSlice({
    name : "auth",
    initialState ,
    reducers : {},

})

// export cosnt {} = authSlice.actions;
export default authSlice.reducer;
