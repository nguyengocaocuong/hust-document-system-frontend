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
    getAllSubjectDocumentType: builder.query({
      query: () => "/subjectDocumentType",
      transformResponse: (response) => ({
        title: "Loại tài liệu",
        item: response?.content.map((i) => ({
          label: i
        })),
      }),
    }),
    getAllSemester: builder.query({
      query: () => "/semester",
      transformResponse: (response) => ({
        title: "Học kỳ",
        item: response?.content.map((i) => ({
          label: i
        })),
      }),
    }),
  }),
});

export const { useGetAllSubjectQuery, useGetAllSubjectDocumentTypeQuery, useGetAllSemesterQuery } =
  subjectApi;
export const { endpoints, reducerPath, reducer, middleware } = subjectApi;
