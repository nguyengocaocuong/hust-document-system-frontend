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
        state.isLogin = true;
        state.user = action.payload;
        state.token = null;
      }
    );
  },
});

// export const {} = authState.actions;
export default authState.reducer;
