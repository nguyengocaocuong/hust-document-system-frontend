import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const subjectApi = createApi({
  reducerPath: "subjects",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/public/subjects`,
  }),
  tagTypes: ["subjects"],
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => "",
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const { useGetAllSubjectQuery } = subjectApi;
export const { endpoints, reducerPath, reducer, middleware } = subjectApi;
