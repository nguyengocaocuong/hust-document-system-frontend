import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: "",
        method: "PATCH",
        body: profile,
      }),
      transformResponse: (response) => response?.content,
      providesTags: ["user"],
    }),
    getAllSubjectDocumentDeleted: builder.query({
      query: () => `/trash`,
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const { useUpdateProfileMutation, useGetAllSubjectDocumentDeletedQuery } = userApi;
