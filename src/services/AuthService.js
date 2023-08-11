import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/authentication`,
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response) => response?.content,
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response) => response?.content,
    }),
    generateToken: builder.mutation({
      query: (credentials) => ({
        url: '/authenticate',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response) => response?.content,
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: '/resetPassword',
        method: 'GET',
        params: {
          email
        }
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response) => response?.content,
    }),
    resendJwtToken: builder.mutation({
      query: (token) => ({
        url: '/resendJwtToken',
        method: 'POST',
        params: { oldToken: token }
      }),
      transformResponse: response => response.content
    })
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGenerateTokenMutation, 
  useResetPasswordMutation, 
  useResendJwtTokenMutation
} = authApi;
