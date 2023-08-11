import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminTeacherApi = createApi({
  reducerPath: "adminTeacher",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/teachers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminTeacher"],
  endpoints: (builder) => ({
    getAllTeacher: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
    updateTeacher: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    approveReviewTeacher: builder.mutation({
      query: (id) => ({
        url: `/reviewTeacher/${id}/approve`,
        method: "PATCH",
      }),
    }),
    rejectReviewTeacher: builder.mutation({
      query: (id) => ({
        url: `/reviewTeacher/${id}/reject`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllTeacherQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
  useApproveReviewTeacherMutation,
  useRejectReviewTeacherMutation
} = adminTeacherApi;
