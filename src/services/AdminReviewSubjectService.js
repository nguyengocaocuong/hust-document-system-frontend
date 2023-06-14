import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReviewSubjectApi = createApi({
  reducerPath: "reviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/subjects/reviewSubject`,
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
    getAllNewReviewSubject: builder.query({
      query: () => "/new",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useGetAllNewReviewSubjectQuery } = adminReviewSubjectApi;
