import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const teacherApi = createApi({
  reducerPath: "teachers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/teachers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["teachers"],
  endpoints: (builder) => ({
    getAllTeacher: builder.query({
        query: () => '',
        transformResponse: (response) => response?.content
    }),
    getAllTeacherForFilter: builder.query({
      query: () => "/allTeacherForFilter",
      transformResponse: (response) => ({
        title: "Giảng viên",
        type:'teacherFilter',
        item: response?.content.map((i) => {
          return {
            label: i.name,
            value:i.id
          };
        }),
      }),
    }),
  }),
});

export const {useGetAllTeacherQuery, useGetAllTeacherForFilterQuery} = teacherApi;
export const { endpoints, reducerPath, reducer, middleware } = teacherApi;
