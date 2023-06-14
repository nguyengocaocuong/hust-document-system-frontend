import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authState";
import { authApi } from "../services/AuthService";
import { postApi } from "../services/PostService";
import { teacherApi } from "../services/TeacherService";
import { subjectApi } from "../services/SubjectService";
import { reviewTeacherApi } from "../services/ReviewTeacherService";
import { reviewSubjectApi } from "../services/ReviewSubjectService";
import { filterApi } from "../services/FilterService";
import modalState from "./modalState";
import { userApi } from "../services/UserService";
import notificationState from "./notificationState";
import { reportApi } from "../services/ReportService";
import { adminReviewTeacherApi } from "../services/AdminReviewTeacherService";
import { adminReviewSubjectApi } from "../services/AdminReviewSubjectService";
import { adminUserServiceApi } from "../services/AdminUserService";
import { adminApi } from "../services/AdminService";
import { adminSubjectApi } from "../services/AdminSubjectService";
import { adminTeacherApi } from "../services/AdminTeacherService";
const rootReducer = combineReducers({
  authentication: authReducer,
  modalState: modalState,
  notificationState: notificationState,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [reviewTeacherApi.reducerPath]: reviewTeacherApi.reducer,
  [reviewSubjectApi.reducerPath]: reviewSubjectApi.reducer,
  [filterApi.reducerPath]: filterApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [adminReviewTeacherApi.reducerPath]: adminReviewTeacherApi.reducer,
  [adminReviewSubjectApi.reducerPath]: adminReviewSubjectApi.reducer,
  [adminUserServiceApi.reducerPath]: adminUserServiceApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [adminSubjectApi.reducerPath]: adminSubjectApi.reducer,
  [adminTeacherApi.reducerPath]: adminTeacherApi.reducer,
});
const persistConig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["authentication"],
};
const persistedReducer = persistReducer(persistConig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      postApi.middleware,
      teacherApi.middleware,
      subjectApi.middleware,
      reviewTeacherApi.middleware,
      reviewSubjectApi.middleware,
      filterApi.middleware,
      userApi.middleware,
      reportApi.middleware,
      adminReviewTeacherApi.middleware,
      adminReviewSubjectApi.middleware,
      adminUserServiceApi.middleware,
      adminApi.middleware,
      adminSubjectApi.middleware,
      adminTeacherApi.middleware
    ),
});
