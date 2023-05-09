import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/authentication`,
  }),
  tagTypes: ["Authentications"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Authentications"],
      transformResponse: (response) => response?.content,
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Authentications"],
      transformResponse: (response) => response?.content,
    }),
    generateToken: builder.mutation({
      query: (credentials)=>({
        url: '',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Authentications"],
      transformResponse: (response) => response?.content,
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useGenerateTokenMutation } = authApi;
export const { endpoints, reducerPath, reducer, middleware } = authApi;
