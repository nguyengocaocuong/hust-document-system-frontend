import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReviewTeacherApi = createApi({
  reducerPath: "reviewTeacher",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/admins/teachers/reviewTeacher`,
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
    getAllNewReviewTeacher: builder.query({
      query: () => "/new",
      transformResponse: (response) => response.content,
    }),
    approveReviewTeacher: builder.mutation({
      query: (reviewTeacherId) => ({
        url: `/${reviewTeacherId}/approve`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.content,
    }),
    rejectReviewTeacher: builder.mutation({
      query: (reviewTeacherId) => ({
        url: `/${reviewTeacherId}/approve`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const { useGetAllNewReviewTeacherQuery, useApproveReviewTeacherMutation, useRejectReviewTeacherMutation } = adminReviewTeacherApi;
