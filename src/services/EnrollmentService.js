import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const enrollmentApi = createApi({
  reducerPath: "enrollment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/enrollment`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["enrollment"],
  endpoints: (builder) => ({
    getAllEnrollmentSubject: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
    createEnrollmentSubjects: builder.mutation({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data,
      }),
    }),
    deleteEnrollmentSubjects: builder.mutation({
      query: (data) => ({
        url: ``,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllEnrollmentSubjectQuery,
  useCreateEnrollmentSubjectsMutation,
  useDeleteEnrollmentSubjectsMutation,
} = enrollmentApi;
