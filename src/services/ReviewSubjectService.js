import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const reviewSubjectApi = createApi({
  reducerPath: "reviewSubjects",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/subjects/reviewSubject`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["reviewSubjects"],
  endpoints: (builder) => ({
    getAllReviewSubjects: builder.query({ query: () => "" }),
    createReviewSubject: builder.mutation({
      query: (formData)=> ({
        url:'',
        method: 'POST',
        body: formData
      })
    })
  }),
});

export const { useGetAllReviewSubjectsQuery, useCreateReviewSubjectMutation } = reviewSubjectApi;
export const { endpoints, reducerPath, reducer, middleware } = reviewSubjectApi;
