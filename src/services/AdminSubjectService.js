import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminSubjectApi = createApi({
  reducerPath: "adminSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/subjects`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminSubject"],
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
    updateSubject: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    approveReviewSubject: builder.mutation({
      query: (id) => ({
        url: `/reviewSubject/${id}/approve`,
        method: "PATCH",
      }),
    }),
    rejectReviewSubject: builder.mutation({
      query: (id) => ({
        url: `/reviewSubject/${id}/reject`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllSubjectQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useApproveReviewSubjectMutation,
  useRejectReviewSubjectMutation
} =
  adminSubjectApi;
