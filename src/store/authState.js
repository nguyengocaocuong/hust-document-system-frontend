import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

const initialState = {
  isLogin: true,
  user: {
    firstName: "Nguyễn Ngô",
    lastName: "Cao Cường",
    avatar:
      "https://2.bp.blogspot.com/-JuxYdCgsA-s/ZIpKgZPfGII/AAAAAAAAp2k/zT2VtLVYYIohrilHIwwalgNu9PkHAco1gCNcBGAsYHQ/s360/unnamed.png",
    roleType: "ADMIN",
  },
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

export const { signOut, updateAuthProfile } = authState.actions;
export default authState.reducer;
