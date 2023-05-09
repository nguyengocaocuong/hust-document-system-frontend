import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/posts`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Posts"],
      transformResponse: (response) => response?.content,
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Posts"],
      transformResponse: (response) => response?.content,
    }),
    generateToken: builder.mutation({
      query: (credentials)=>({
        url: 'authenticated',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Posts"],
      transformResponse: (response) => response?.content,
    }),
    resetPassword: builder.mutation({
      query: (email)=>({
        url: '/resetPassword',
        method: 'GET',
        params: {
          email
        }
      }),
      invalidatesTags: ["Posts"],
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const {  } = postApi;
export const { endpoints, reducerPath, reducer, middleware } = postApi;
