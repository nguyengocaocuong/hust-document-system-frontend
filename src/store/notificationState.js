import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  notifications: {
    SHARED: [],
    APPROVE: [],
    LOADING: [],
  },
};

export const notificationState = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    toggleNotification: (state, action) => {
      state.isShow = !action.payload;
    },
    clearSharedNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.SHARED = preState.filter((item) => item.id !== id);
    },
    clearLoadingNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.LOADING = preState.filter((item) => item.id !== id);
    },
    clearApproveNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.APPROVE = preState.filter((item) => item.id !== id);
    },
    addSharedNotification: (state, action) => {
      state.notifications.SHARED = action.payload;
    },
    addApproveNotification: (state, action) => {
      state.notifications.APPROVE = action.payload;
    },
    addLoadingNotification: (state, action) => {
      state.notifications.LOADING = action.payload;
    },
  },
});

export const {
  toggleNotification,
  clearSharedNotification,
  clearLoadingNotification,
  clearApproveNotification,
  addApproveNotification,
  addLoadingNotification,
  addSharedNotification,
} = notificationState.actions;
export default notificationState.reducer;
