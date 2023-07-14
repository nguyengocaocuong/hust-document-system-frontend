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
import { adminReportContentReviewSubjectApi } from "../services/AdminReportContentReviewSubjectService";
import { adminReportDuplicateSubjectDocumentApi } from "../services/AdminReportDuplicateSubjectDocumentService";
import { adminReportContentSubjectDocumentApi } from "../services/AdminReportContentSubjectDocumentService";
import { adminReportContentTeacherSubjectApi } from "../services/AdminReportContentReviewTeacherService";
import { searchApi } from "../services/SearchService";
import { adminCommentReviewSubjectApi } from "../services/AdminCommentReviewSubjectService";
import { adminCommentReviewTeacherApi } from "../services/AdminCommentReviewTeacherService";
const rootReducer = combineReducers({
  authentication: authReducer,
  modalState: modalState,
  notificationState: notificationState,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [filterApi.reducerPath]: filterApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [adminReviewTeacherApi.reducerPath]: adminReviewTeacherApi.reducer,
  [adminReviewSubjectApi.reducerPath]: adminReviewSubjectApi.reducer,
  [adminUserServiceApi.reducerPath]: adminUserServiceApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [adminSubjectApi.reducerPath]: adminSubjectApi.reducer,
  [adminTeacherApi.reducerPath]: adminTeacherApi.reducer,
  [adminReportContentReviewSubjectApi.reducerPath]:
    adminReportContentReviewSubjectApi.reducer,
  [adminReportDuplicateSubjectDocumentApi.reducerPath]:
    adminReportDuplicateSubjectDocumentApi.reducer,
  [adminReportContentSubjectDocumentApi.reducerPath]:
    adminReportContentSubjectDocumentApi.reducer,
  [adminReportContentTeacherSubjectApi.reducerPath]:
    adminReportContentTeacherSubjectApi.reducer,
  [adminCommentReviewSubjectApi.reducerPath]:
    adminCommentReviewSubjectApi.reducer,
  [adminCommentReviewTeacherApi.reducerPath]:
    adminCommentReviewTeacherApi.reducer,
  [searchApi.reducerPath]:
    searchApi.reducer,
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
      filterApi.middleware,
      userApi.middleware,
      reportApi.middleware,
      adminReviewTeacherApi.middleware,
      adminReviewSubjectApi.middleware,
      adminUserServiceApi.middleware,
      adminApi.middleware,
      adminSubjectApi.middleware,
      adminTeacherApi.middleware,
      adminReportContentReviewSubjectApi.middleware,
      adminReportDuplicateSubjectDocumentApi.middleware,
      adminReportContentSubjectDocumentApi.middleware,
      adminReportContentTeacherSubjectApi.middleware,
      adminCommentReviewTeacherApi.middleware,
      adminCommentReviewSubjectApi.middleware,
      searchApi.middleware
    ),
});
