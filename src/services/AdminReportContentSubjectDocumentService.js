import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportContentSubjectDocumentApi = createApi({
  reducerPath: "adminReportContentSubjectDocument",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/admins/reportContentSubjectDocument`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminReportContentSubjectDocument"],
  endpoints: (builder) => ({
    getAllReportContentSubjectDocument: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useGetAllReportContentSubjectDocumentQuery } =
  adminReportContentSubjectDocumentApi;
