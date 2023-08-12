import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportDuplicateSubjectDocumentApi = createApi({
  reducerPath: "adminReportContentReviewSubject",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/reportDuplicateSubjectDocument`,
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
