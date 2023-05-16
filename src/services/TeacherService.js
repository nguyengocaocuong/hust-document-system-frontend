import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const teacherApi = createApi({
  reducerPath: "teachers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/public/teachers`,
  }),
  tagTypes: ["teachers"],
  endpoints: (builder) => ({
    getAllTeacher: builder.query({
        query: () => '',
        transformResponse: (response) => response?.content
    })
  }),
});

export const {useGetAllTeacherQuery} = teacherApi;
export const { endpoints, reducerPath, reducer, middleware } = teacherApi;
