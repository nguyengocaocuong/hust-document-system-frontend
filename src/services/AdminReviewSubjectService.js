import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReviewSubjectApi = createApi({
  reducerPath: "reviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/subjects/reviewSubject`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getAllNewReviewSubject: builder.query({
      query: () => "/new",
      transformResponse: (response) => response.content,
    }),
    approveReviewSubject: builder.mutation({
      query: (reviewSubjectId) => ({
        url: `/${reviewSubjectId}/approve`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.content,
    }),
    rejectReviewSubject: builder.mutation({
      query: (reviewSubjectId) => ({
        url: `/${reviewSubjectId}/approve`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const {
  useGetAllNewReviewSubjectQuery,
  useApproveReviewSubjectMutation,
  useRejectReviewSubjectMutation,
} = adminReviewSubjectApi;
