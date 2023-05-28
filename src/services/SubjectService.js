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
    getAllSubject: builder.query({
      query: () => "",
      transformResponse: (response) => {
        return response?.content;
      },
      providesTags: ["subject"],
    }),
    getAllSubjectForFilter: builder.query({
      query: () => "/allSubjectForFilter",
      transformResponse: (response) => ({
        title: "Học phần",
        type: "documentFilter",
        item: response?.content.map((i) => {
          return {
            label: i.name,
            value: i.id,
          };
        }),
      }),
      providesTags: ["subject"],
    }),
    getSubjectDetail: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => {
        const content = response?.content;
        if (!content) return {};
        var subjectDocuments = {};
        for (var j = 0; j < content.subjectDocuments.length; j++) {
          if (!subjectDocuments[content.subjectDocuments[j].type]) {
            subjectDocuments[content.subjectDocuments[j].type] = [];
          }
          subjectDocuments[content.subjectDocuments[j].type].push(
            content.subjectDocuments[j]
          );
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
    createSubject:  builder.mutation({
      query: (subject) => ({
        url: "",
        method: "POST",
        body: subject,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subject"],
    }),
    favoriteSubject:  builder.mutation({
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
      query: (comment) => ({
        url: "/subjectDocument/comment",
        method: "POST",
        body: comment,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["commentSubjectDocument"],
    }),
    deleteCommentSubjectDocument: builder.mutation({
      query: (id) => ({
        url: `/subjectDocument/comment/${id}`,
        method: "DELETE",
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
    getAllSubjectDocumentType: builder.query({
      query: () => "/subjectDocumentTypeForFilter",
      transformResponse: (response) => ({
        title: "Loại tài liệu",
        type: "documentTypeFilter",
        item: response?.content.map((i) => {
          return {
            label: i,
            value: i,
          };
        }),
      }),
      providesTags: ["subjectDocument"],
    }),
    updloadSubjectDocumentForSubject: builder.mutation({
      query: (data) => ({
        url: `/${data.subjectId}/subjectDocument`,
        method: "POST",
        body: data.subjectDocument
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["subjectDocument"],
    }),

    // ANSER SUBJECT DOCUMENT
    uploadAnswerForSubjectDocument: builder.mutation({
      query: (data) => ({
        url: `/subjectDocument/${data.id}/answerSubjectDocument`,
        method: "POST",
        body: data.answer
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["favoriteSubjectDocument"],
    }),

    // SEMESTER
    getAllSemesterForFilter: builder.query({
      query: () => "/allSemesterForFilter",
      transformResponse: (response) => ({
        title: "Học kỳ",
        type: "semesterFilter",
        item: response?.content.map((i) => ({
          label: i,
          value: i,
        })),
      }),
      providesTags: ["semester"],
    }),
  }),
});

export const {
  useGetAllSubjectQuery,
  useGetAllSubjectDocumentTypeQuery,
  useGetAllSemesterForFilterQuery,
  useGetAllSubjectForFilterQuery,
  useGetSubjectDetailQuery,
  useCommentSubjectDocumentMutation,
  useDeleteCommentSubjectDocumentMutation,
  useGetSubjectDocumentDetailQuery,
  useGetAllCommentSubjectDocumentQuery,
  useFavoriteSubjectDocumentMutation,
  useUploadAnswerForSubjectDocumentMutation,
  useUpdloadSubjectDocumentForSubjectMutation,
  useCreateSubjectMutation,
  useFavoriteSubjectMutation
} = subjectApi;
export const { endpoints, reducerPath, reducer, middleware } = subjectApi;
