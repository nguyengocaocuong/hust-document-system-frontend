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
const rootReducer = combineReducers({
  authentication: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
});
const persistConig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, postApi.middleware, teacherApi.middleware, subjectApi.middleware),
});
