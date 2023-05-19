import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const reviewTeacherApi = createApi({
  reducerPath: "reviewTeachers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/teachers/reviewTeacher`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["reviewTeachers"],
  endpoints: (builder) => ({
    getAllReviewTeachers: builder.query({ query: () => "" }),
    createReviewTeacher: builder.mutation({
      query: (formData)=> ({
        url:'',
        method: 'POST',
        body: formData
      })
    })
  }),
});

export const { useGetAllReviewTeachersQuery, useCreateReviewTeacherMutation } = reviewTeacherApi;
export const { endpoints, reducerPath, reducer, middleware } = reviewTeacherApi;
