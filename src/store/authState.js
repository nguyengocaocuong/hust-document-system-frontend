import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";

const initialState = {
  isLogin: false,
  user: null,
  token: null,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        state.isLogin = true;
        state.user = action.payload;
        state.token = null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});

// export const {} = authState.actions;
export default authState.reducer;
