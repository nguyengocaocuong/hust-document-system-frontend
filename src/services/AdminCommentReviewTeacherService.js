import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminCommentReviewTeacherApi = createApi({
  reducerPath: "adminCommentReviewTeacher",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/admins/teachers/reviewTeacher/comment`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminCommentReviewTeacher"],
  endpoints: (builder) => ({
    getAllBabCommentForReviewTeacher: builder.query({
      query: () => "/babComments",
      transformResponse: (response) => response.content,
    }),
    hiddenCommentForReviewTeacher: builder.mutation({
      query: (commentId) => ({
        url: `/${commentId}/hidden`,
        method: "PATCH",
      }),
    }),
    approveCommentForReviewTeacher: builder.mutation({
      query: (commentId) => ({
        url: `/${commentId}/approve`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllBabCommentForReviewTeacherQuery,
  useApproveCommentForReviewTeacherMutation,
  useHiddenCommentForReviewTeacherMutation,
} = adminCommentReviewTeacherApi;
