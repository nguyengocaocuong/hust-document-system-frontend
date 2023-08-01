import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const enrollmentApi = createApi({
  reducerPath: "enrollment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/enrollment`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["enrollment"],
  endpoints: (builder) => ({
    getAllEnrollmentSubject: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
    createEnrollmentSubjects: builder.mutation({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data
      }),
    })
  }),
});

export const {
    useGetAllEnrollmentSubjectQuery,
    useCreateEnrollmentSubjectsMutation
} = enrollmentApi;
