import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

const initialState = {
  isLogin: false,
  user: null,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state)=>{
      state.isLogin = false
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isLogin = true;
        state.user = action.payload;
      }
    );
   
  },
});

export const {signOut} = authState.actions;
export default authState.reducer;
