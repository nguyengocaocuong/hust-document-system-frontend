import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminCommentReviewSubjectApi = createApi({
  reducerPath: "adminCommentReviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/subjects/reviewSubject/comment`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
