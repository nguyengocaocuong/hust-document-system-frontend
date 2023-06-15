import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminTeacherApi = createApi({
  reducerPath: "adminTeacher",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/teachers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
  }),
});

export const {
  useGetAllTeacherQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = adminTeacherApi;
