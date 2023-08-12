import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportContentReviewSubjectApi = createApi({
  reducerPath: "adminReportDuplicateSubjectDocument",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/reportContentReviewSubject`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
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
