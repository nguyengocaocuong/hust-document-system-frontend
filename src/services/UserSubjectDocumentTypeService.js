import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const subjectDocumentTypeApi = createApi({
  reducerPath: "subjectDocumentType",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/subjectDocumentType`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["subjectDocumentType"],
  endpoints: (builder) => ({
    getAllSubjectDocumentTypes: builder.query({
      query: () =>'',
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const {
  useGetAllSubjectDocumentTypesQuery
} = subjectDocumentTypeApi;
