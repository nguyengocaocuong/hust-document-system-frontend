import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/posts`,
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
    getAllPosts: builder.mutation({
      query: (data) => ({
        url: `?page=${data.page}&size=${data.size}`,
        method: "GET",
      }),
      transformResponse: (response) => response.content,
    }),
    getAllPostCreatedByUser: builder.query({
      query: () => "/owner",
      transformResponse: (response) => response?.content,
    }),
    getPostDetail: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => response?.content,
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
    }),
    favoritePost: builder.mutation({
      query: (postId) => ({
        url: `/${postId}/favorite`,
        method: "GET",
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["post"],
    }),
    getAllCommentForPost: builder.query({
      query: (postId) => ({
        url: `/${postId}/comment`,
      }),
      transformResponse: (response) => response?.content,
    }),
    commentPost: builder.mutation({
      query: (data) => ({
        url: `/${data.postId}/comment`,
        method: "POST",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["post"],
    }),
    deleteCommentPost: builder.mutation({
      query: (data) => ({
        url: `${data.postId}/comment/${data.commentId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.content,
    }),
    updateCommentPost: builder.mutation({
      query: (data) => ({
        url: `${data.postId}/comment/${data.commentId}`,
        method: "PATCH",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["post"],
    }),
    getAllAnswerForPost: builder.query({
      query: (postId) => `/${postId}/answer`,
      transformResponse: (response) => response?.content,
    }),
    createAnswerForPost: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/answer`,
        method: "POST",
        body: data.body,
      }),
      transformErrorResponse: (response) => response.content,
    }),
    toggleFavoriteAnswerPost: builder.mutation({
      query: (answerId) => ({
        url: `/answer/${answerId}/favorite`,
        method: "POST",
      }),
    }),
    hiddenCommentPost: builder.mutation({
      query: (data) => ({
        url: `${data.postId}/comment/${data.commentId}/hidden`,
        method: "PATCH",
      }),
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `/${data.postId}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
  }),
});

export const {
  useGetAllPostCreatedByUserQuery,
  useCreatePostMutation,
  useGetPostDetailQuery,
  useFavoritePostMutation,
  useGetAllCommentForPostQuery,
  useCommentPostMutation,
  useDeleteCommentPostMutation,
  useCreateAnswerForPostMutation,
  useGetAllAnswerForPostQuery,
  useToggleFavoriteAnswerPostMutation,
  useUpdateCommentPostMutation,
  useDeletePostMutation,
  useHiddenCommentPostMutation,
  useGetAllPostsMutation,
  useUpdatePostMutation,
} = postApi;
