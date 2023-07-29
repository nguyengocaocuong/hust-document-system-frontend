import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const subjectApi = createApi({
  reducerPath: "subjects",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/subjects`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "subjects",
    "subjectDocument",
    "commentSubjectDocument",
    "answerSubjectDocument",
    "semester",
    "favoriteSubjectDocument",
  ],
  endpoints: (builder) => ({
    // SUBJECT
    getAllSubject: builder.mutation({
      query: (data) => ({
        url: `?page=${data.page}&size=${data.size}`,
        method: "GET",
      }),
      transformResponse: (response) => response.content,
    }),
    getSubjectDetail: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => {
        const content = response?.content;
        if (!content) return {};
        var subjectDocuments = {};
        for (var j = 0; j < content.subjectDocuments.length; j++) {
          if (
            !subjectDocuments[content.subjectDocuments[j].subjectDocumentType]
          ) {
            subjectDocuments[content.subjectDocuments[j].subjectDocumentType] =
              [];
          }
          subjectDocuments[
            content.subjectDocuments[j].subjectDocumentType
          ].push(content.subjectDocuments[j]);
        }
        var convertToArray = [];
        Object.keys(subjectDocuments).forEach((key) => {
          convertToArray.push({ type: key, documents: subjectDocuments[key] });
        });
        content.subjectDocuments = convertToArray;
        return content;
      },
      providesTags: ["subject"],
    }),
    createSubject: builder.mutation({
      query: (subject) => ({
        url: "",
        method: "POST",
        body: subject,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subject"],
    }),
    favoriteSubject: builder.mutation({
      query: (data) => ({
        url: `/${data.subjectId}/favorite`,
        method: "POST",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subject"],
    }),

    // COMMENT SUBJECT DOCUMENT
    getAllCommentSubjectDocument: builder.query({
      query: (id) => `/subjectDocument/${id}/comment`,
      transformResponse: (response) => {
        return response?.content;
      },
      providesTags: ["commentSubjectDocument"],
    }),
    commentSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/comment`,
        method: "POST",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["commentSubjectDocument"],
    }),
    deleteCommentSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/comment/${data.commentId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subjectDocument"],
    }),
    updateCommentSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/comment/${data.commentId}`,
        method: "PATCH",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subjectDocument"],
    }),
    hiddenCommentSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}comment/${data.commentId}/hidden`,
        method: "PATCH",
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subjectDocument"],
    }),
    favoriteSubjectDocument: builder.mutation({
      query: (id) => ({
        url: `subjectDocument/${id}/favorite`,
        method: "POST",
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["favoriteSubjectDocument"],
    }),

    // SUBJECT DOCUMENT
    getSubjectDocumentDetail: builder.query({
      query: (id) => `/subjectDocument/${id}`,
      transformResponse: (response) => {
        return response?.content;
      },
      providesTags: ["subjectDocument"],
    }),
    updloadSubjectDocumentForSubject: builder.mutation({
      query: (data) => ({
        url: `/${data.subjectId}/subjectDocument`,
        method: "POST",
        body: data.subjectDocument,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subjectDocument"],
    }),

    // ANSER SUBJECT DOCUMENT
    uploadAnswerForSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/answerSubjectDocument`,
        method: "POST",
        body: data.body,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["favoriteSubjectDocument"],
    }),

    // REVIEW SUBJECT
    getAllReviewSubject: builder.query({
      query: () => `/reviewSubject`,
      transformResponse: (response) => response?.content,
    }),
    getAllReviewSubjectCreatedByUser: builder.query({
      query: () => `/reviewSubject/owner`,
      transformResponse: (response) => response?.content,
    }),
    toggleFavoriteAnswerSubjectDocument: builder.mutation({
      query: (id) => ({
        url: `/answerSubjectDocument/${id}/favorite`,
        method: "POST",
      }),
      transformResponse: (response) => response?.content,
    }),
    getAllAnswerSubjectDocument: builder.query({
      query: (id) => `/subjectDocument/${id}/answerSubjectDocument`,
      transformResponse: (response) => response?.content,
    }),
    createCommentReviewSubject: builder.mutation({
      query: (data) => ({
        url: `/reviewSubject/${data.id}/comment`,
        method: "POST",
        body: data.body,
      }),
    }),
    deleteCommentReviewSubject: builder.mutation({
      query: (data) => ({
        url: `/reviewSubject/${data.reviewSubjectId}/comment/${data.commentId}`,
        method: "DELETE",
      }),
    }),
    toggleFavoriteReviewSubject: builder.mutation({
      query: (id) => ({
        url: `/reviewSubject/${id}/favorite`,
        method: "POST",
      }),
      transformResponse: (response) => response?.content,
    }),
    getAllFavoritereviewSubject: builder.query({
      query: (id) => `/reviewSubject/${id}/favorite`,
      transformResponse: (response) => response?.content,
    }),
    getAllCommentForReviewSubject: builder.query({
      query: (id) => `/reviewSubject/${id}/comment`,
      transformResponse: (response) => response?.content,
    }),
    getAllUserShared: builder.query({
      query: (id) => `/subjectDocument/${id}/shared`,
      transformResponse: (response) => response?.content,
    }),
    shareSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/share`,
        method: "POST",
        body: data.body,
      }),
    }),
    getAllSubjectDocumentCreateByUser: builder.query({
      query: () => `/subjectDocument/owner`,
      transformResponse: (response) => response.content,
    }),
    getAllSubjectDocumentShared: builder.query({
      query: () => `/subjectDocument/shared`,
      transformResponse: (response) => response.content,
    }),
    generateUrlForPublicSubjectDocumentOnInternet: builder.query({
      query: (id) => `/subjectDocument/${id}/generatePublicOnInternetUrl`,
      transformResponse: (response) => response.content,
    }),
    generateUrlForPublicSubjectDocumentOnWebsite: builder.query({
      query: (id) => `/subjectDocument/${id}/generatePublicOnWebsiteUrl`,
      transformResponse: (response) => response.content,
    }),
    deleteSubjectDocumentForever: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/forever`,
        method: "DELETE",
      }),
    }),
    moveSubjectDocumentToTrash: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}`,
        method: "DELETE",
      }),
    }),
    restoreSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/restore`,
        method: "PATCH",
      }),
    }),
    makeSubjectDocumentPublic: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/public`,
        method: "PATCH",
      }),
    }),
    makeSubjectDocumentPrivate: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/private`,
        method: "PATCH",
      }),
    }),
    deleteSharedPrivate: builder.mutation({
      query: (id) => ({
        url: `/subjectDocument/shared/${id}`,
        method: "DELETE",
      }),
    }),
    deleteReviewSubject: builder.mutation({
      query: (data) => ({
        url: `/${data.subjectId}/reviewSubject/${data.reviewSubjectId}`,
        method: "DELETE",
      }),
    }),
    createReviewSubject: builder.mutation({
      query: (data) => ({
        url: `/${data.subjectId}/reviewSubject`,
        method: "POST",
        body: data.body,
      }),
    }),
    reportContentReviewSubject: builder.mutation({
      query: (data) => ({
        url: `/reviewSubject/${data.reviewSubjectId}/reportContent`,
        method: "POST",
        body: data.body,
      }),
    }),
    reportContentSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/reportContent`,
        method: "POST",
        body: data.body,
      }),
    }),
    reportDuplicateSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/reportDuplicate`,
        method: "POST",
        body: data.body,
      }),
    }),
    updateReviewSubject: builder.mutation({
      query: (data) => ({
        url: `${data.subjectId}/reviewSubject/${data.reviewSubjectId}`,
        method: "PATCH",
        body: data.body,
      }),
    }),
    sendAnnotationSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.subjectDocumentId}/annotation`,
        params: {
          action: data.action
        },
        method: "POST",
        body: data.body,
      }),
    }),
  }),
});

export const {
  useGetAllSubjectMutation,
  useGetSubjectDetailQuery,
  useCommentSubjectDocumentMutation,
  useDeleteCommentSubjectDocumentMutation,
  useUpdateCommentSubjectDocumentMutation,
  useGetSubjectDocumentDetailQuery,
  useGetAllCommentSubjectDocumentQuery,
  useFavoriteSubjectDocumentMutation,
  useUploadAnswerForSubjectDocumentMutation,
  useUpdloadSubjectDocumentForSubjectMutation,
  useCreateSubjectMutation,
  useFavoriteSubjectMutation,
  useGetAllReviewSubjectQuery,
  useToggleFavoriteAnswerSubjectDocumentMutation,
  useGetAllAnswerSubjectDocumentQuery,
  useCreateCommentReviewSubjectMutation,
  useDeleteCommentReviewSubjectMutation,
  useGetAllFavoritereviewSubjectQuery,
  useToggleFavoriteReviewSubjectMutation,
  useGetAllCommentForReviewSubjectQuery,
  useGetAllUserSharedQuery,
  useShareSubjectDocumentMutation,
  useGetAllSubjectDocumentCreateByUserQuery,
  useGenerateUrlForPublicSubjectDocumentOnInternetQuery,
  useGetAllSubjectDocumentSharedQuery,
  useGenerateUrlForPublicSubjectDocumentOnWebsiteQuery,
  useDeleteSubjectDocumentForeverMutation,
  useMoveSubjectDocumentToTrashMutation,
  useRestoreSubjectDocumentMutation,
  useMakeSubjectDocumentPrivateMutation,
  useMakeSubjectDocumentPublicMutation,
  useDeleteSharedPrivateMutation,
  useDeleteReviewSubjectMutation,
  useGetAllReviewSubjectCreatedByUserQuery,
  useHiddenCommentSubjectDocumentMutation,
  useCreateReviewSubjectMutation,
  useReportContentReviewSubjectMutation,
  useReportContentSubjectDocumentMutation,
  useReportDuplicateSubjectDocumentMutation,
  useUpdateReviewSubjectMutation,
  useSendAnnotationSubjectDocumentMutation
} = subjectApi;
