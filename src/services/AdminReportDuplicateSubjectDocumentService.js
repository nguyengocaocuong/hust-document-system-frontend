import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportDuplicateSubjectDocumentApi = createApi({
  reducerPath: "adminReportContentReviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/reportDuplicateSubjectDocument`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["reportContentReviewSubject"],
  endpoints: (builder) => ({
    getAllReportDuplicateSubjectDocument: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useGetAllReportDuplicateSubjectDocumentQuery } = adminReportDuplicateSubjectDocumentApi;
