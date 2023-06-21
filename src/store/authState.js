import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

const initialState = {
  isLogin: true,
  user: {
    firstName:'Nguyen Ngo',
    lastName:'Cao Cuong',
    avatar:'',
    roleType: 'USER'
  }
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
