import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportContentReviewSubjectApi = createApi({
  reducerPath: "adminReportDuplicateSubjectDocument",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/reportContentReviewSubject`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["reportDuplicateSubjectDocument"],
  endpoints: (builder) => ({
    getAllReportContentReviewSubject: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useGetAllReportContentReviewSubjectQuery } =
  adminReportContentReviewSubjectApi;
