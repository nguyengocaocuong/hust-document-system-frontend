import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const filterApi = createApi({
  reducerPath: "filter",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["filter"],
  endpoints: (builder) => ({
    getUserForFilter: builder.query({
      query: () => "/allUserForFilter",
      transformResponse: (response) => ({
        title: "Người dùng",
        type: "userFilter",
        item: response?.content.map((i) => {
          return {
            label: i.name,
            value: i.id,
            data: i,
          };
        }),
      }),
      providesTags: ["filter"],
    }),
    getAllSubjectForFilter: builder.query({
      query: () => "/subjects/allSubjectForFilter",
      transformResponse: (response) => ({
        title: "Học phần",
        type: "documentFilter",
        item: response?.content.map((i) => {
          return {
            label: `${i.subjectCode} | ${i.name}`,
            value: i.id,
            data: i,
          };
        }),
      }),
      providesTags: ["filter"],
    }),
    getAllSubjectDocumentTypeForFilter: builder.query({
      query: () => "/subjects/subjectDocumentTypeForFilter",
      transformResponse: (response) => ({
        title: "Loại tài liệu",
        type: "documentTypeFilter",
        item: response?.content.map((i) => {
          return {
            label: i,
            value: i,
            data: i,
          };
        }),
      }),
      providesTags: ["filter"],
    }),
    getAllSemesterForFilter: builder.query({
      query: () => "/subjects/allSemesterForFilter",
      transformResponse: (response) => ({
        title: "Học kỳ",
        type: "semesterFilter",
        item: response?.content.map((i) => ({
          label: i,
          value: i,
          data: i,
        })),
      }),
      providesTags: ["filter"],
    }),
    getAllTeacherForFilter: builder.query({
      query: () => "/teachers/allTeacherForFilter",
      transformResponse: (response) => ({
        title: "Giảng viên",
        type: "teacherFilter",
        item: response?.content.map((i) => {
          return {
            label: i.name,
            value: i.id,
            data: i,
          };
        }),
        providesTags: ["filter"],
      }),
    }),
  }),
});

export const {
  useGetAllSemesterForFilterQuery,
  useGetAllSubjectDocumentTypeForFilterQuery,
  useGetAllSubjectForFilterQuery,
  useGetAllTeacherForFilterQuery,
  useGetUserForFilterQuery,
} = filterApi;
