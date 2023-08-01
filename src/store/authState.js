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
    signOut: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    updateAuthProfile: (state, action) => {
      state.user = action.payload;
    },
    updateJwtToken: (state, action) => {
      state.user.token = action.payload
    },
    updateSetup: (state)=>{
      state.user.setup = true
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

export const { signOut, updateAuthProfile, updateJwtToken, updateSetup } = authState.actions;
export default authState.reducer;
