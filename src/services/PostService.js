import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/posts`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({ query: () => "" }),
    createPost: builder.mutation({
      query: (formData)=> ({
        url:'',
        method: 'POST',
        body: formData
      })
    })
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = postApi;
export const { endpoints, reducerPath, reducer, middleware } = postApi;
