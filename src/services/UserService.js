import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
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
    getRecommend: builder.mutation({
      query: (data) => ({
        url: "/recommend",
        params: {
          page: data.page || 0,
          size: data.size || 5,
        },
      }),
      transformResponse: (response) => response.content,
    }),
    updateAvatar: builder.mutation({
      query: (form) => ({
        url: "/update-avatar",
        body: form,
        method: "PATCH",
      }),
      transformErrorResponse: (response) => response.content,
    }),
    updateUserInfo: builder.mutation({
      query: (form) => ({
        url: "/update-user-info",
        body: form,
        method: "PATCH",
      }),
      transformErrorResponse: (response) => response.content,
    }),
    updateAccountInfo: builder.mutation({
      query: (form) => ({
        url: "/update-account-info",
        body: form,
        method: "PATCH",
      }),
      transformErrorResponse: (response) => response.content,
    }),
    getUserProfileById: builder.mutation({
      query: (id) => ({
        url: `/profile?userId=${id}`,
        method: "GET",
      }),
      transformErrorResponse: (response) => response.content,
    }),
    getAllWroteByUserId: builder.mutation({
      query: (id) => ({
        url: `/wrote?userId=${id}`,
        method: "GET",
      }),
      transformErrorResponse: (response) => response.content,
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetAllSubjectDocumentDeletedQuery,
  useGetRecommendMutation,
  useUpdateAvatarMutation,
  useUpdateAccountInfoMutation,
  useUpdateUserInfoMutation,
  useGetUserProfileByIdMutation,
  useGetAllWroteByUserIdMutation,
} = userApi;
