import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthService";
import { userApi } from "../services/UserService";

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
      state.user.token = action.payload;
    },
    updateSetup: (state) => {
      state.user.setup = true;
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
    builder.addMatcher(
      userApi.endpoints.updateAvatar.matchFulfilled,
      (state, action) => {
        state.user.avatar = action.payload.content.avatarUrl;
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserInfo.matchFulfilled,
      (state, action) => {
        state.user.firstName = action.payload.content.firstName;
        state.user.lastName = action.payload.content.lastName;
        state.user.address = action.payload.content.address;
        state.user.facebookUrl = action.payload.content.facebookUrl;
        state.user.twitterUrl = action.payload.content.twitterUrl;
        state.user.instagramUrl = action.payload.content.instagramUrl;
        state.user.phoneNumber = action.payload.content.phoneNumber;
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateAccountInfo.matchFulfilled,
      (state, action) => {
        state.user.username = action.payload.content.username;
      }
    );
  },
});

export const { signOut, updateAuthProfile, updateJwtToken, updateSetup } =
  authState.actions;
export default authState.reducer;
