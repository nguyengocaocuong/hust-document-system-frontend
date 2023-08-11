import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const teacherApi = createApi({
  reducerPath: "teachers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/teachers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["teachers"],
  endpoints: (builder) => ({
    getAllTeacher: builder.query({
      query: () => "",
      transformResponse: (response) => response?.content,
    }),
    createTeacher: builder.mutation({
      query: (teacher) => ({
        url: "",
        method: "POST",
        body: teacher,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["teachers"],
    }),
    getAllReviewTeacher: builder.query({
      query: () => `/reviewTeacher`,
      transformResponse: (response) => response?.content,
    }),
    getAllReviewTeacherCreatedByUser: builder.query({
      query: () => `/reviewTeacher/owner`,
      transformResponse: (response) => response?.content,
    }),
    getAllCommentForReviewTeacher: builder.query({
      query: (id) => `/reviewTeacher/${id}/comment`,
      transformResponse: (response) => response?.content,
    }),
    createCommentReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `/reviewTeacher/${data.id}/comment`,
        method: "POST",
        body: data.body,
      }),
    }),
    deleteCommentReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `/reviewTeacher/${data.reviewTeacherId}/comment/${data.commentId}`,
        method: "DELETE",
      }),
    }),
    toggleFavoriteReviewTeacher: builder.mutation({
      query: (id) => ({
        url: `/reviewTeacher/${id}/favorite`,
        method: "POST",
      }),
      transformResponse: (response) => response?.content,
    }),
    getAllFavoritereviewTeacher: builder.query({
      query: (id) => `/reviewTeacher/${id}/favorite`,
      transformResponse: (response) => response?.content,
    }),
    createReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `/${data.teacherId}/reviewTeacher`,
        method: "POST",
        body: data.body,
      }),
    }),
    reportContentReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `/reviewTeacher/${data.reviewTeacherId}/reportContent`,
        method: "POST",
        body: data.body,
      }),
    }),
    updateReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `${data.teacherId}/reviewTeacher/${data.reviewTeacherId}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
    deleteReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `${data.teacherId}/reviewTeacher/${data.reviewTeacherId}`,
        method: "DELETE",
      }),
    }),
    updateReportContentReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `reviewTeacher/${data.reviewTeacherId}/reportContent/${data.reportContentReviewTeacherId}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
    deleteReportContentReviewTeacher: builder.mutation({
      query: (data) => ({
        url: `reviewTeacher/${data.reviewTeacherId}/reportContent/${data.reportContentReviewTeacherId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTeacherQuery,
  useCreateTeacherMutation,
  useGetAllReviewTeacherQuery,
  useCreateCommentReviewTeacherMutation,
  useGetAllCommentForReviewTeacherQuery,
  useToggleFavoriteReviewTeacherMutation,
  useGetAllFavoritereviewTeacherQuery,
  useDeleteCommentReviewTeacherMutation,
  useDeleteReviewTeacherMutation,
  useCreateReviewTeacherMutation,
  useGetAllReviewTeacherCreatedByUserQuery,
  useReportContentReviewTeacherMutation,
  useUpdateReviewTeacherMutation,
  useUpdateReportContentReviewTeacherMutation,
  useDeleteReportContentReviewTeacherMutation,
} = teacherApi;
