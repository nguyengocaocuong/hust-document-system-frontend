import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminUserServiceApi = createApi({
  reducerPath: "adminUser",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminUsers"],
  endpoints: (builder) => ({
    getAllNewUser: builder.query({
      query: () => "/new",
      transformResponse: (response) => response.content,
    }),
    getAllUser: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
    getUserProfile: builder.query({
      query: (id) => `/${id}/profile`,
      transformResponse: (response) => response.content,
    }),
    createUser: builder.mutation({
      query: (formData)=>({
        url:"",
        method:"POST",
        body:formData
      })
    })
  }),
});

export const { useGetAllNewUserQuery, useGetAllUserQuery, useGetUserProfileQuery, useCreateUserMutation } =
  adminUserServiceApi;
