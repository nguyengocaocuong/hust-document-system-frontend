import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminCommentReviewSubjectApi = createApi({
  reducerPath: "adminCommentReviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/subjects/reviewSubject/comment`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminCommentReviewSubject"],
  endpoints: (builder) => ({
    getAllBabCommentForReviewSubject: builder.query({
      query: () => "/babComments",
      transformResponse: (response) => response.content,
    }),
    hiddenCommentForReviewSubject: builder.mutation({
      query: (commentId) => ({
        url: `/${commentId}/hidden`,
        method: "PATCH",
      }),
    }),
    approveCommentForReviewSubject: builder.mutation({
      query: (commentId) => ({
        url: `/${commentId}/approve`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllBabCommentForReviewSubjectQuery,
  useApproveCommentForReviewSubjectMutation,
  useHiddenCommentForReviewSubjectMutation,
} = adminCommentReviewSubjectApi;
