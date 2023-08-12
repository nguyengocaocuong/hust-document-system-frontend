import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminReportContentTeacherSubjectApi = createApi({
  reducerPath: "adminReportContentTeacherSubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins/reportContentReviewTeacher`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["adminReportContentTeacherSubjectApi"],
  endpoints: (builder) => ({
    getAllReportContentReviewTeacher: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useGetAllReportContentReviewTeacherQuery } =
adminReportContentTeacherSubjectApi;
