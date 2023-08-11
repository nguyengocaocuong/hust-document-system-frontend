import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const searchApi = createApi({
  reducerPath: "searchs",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/search`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["search"],
  endpoints: (builder) => ({
    searchSubjectDocument: builder.mutation({
      query: (params) => ({
        url: "/search-subject-document",
        method: "GET",
        params: params,
      }),
      providesTags: ["search"],
      transformResponse: (response) => response.content,
    }),
  }),
});

export const { useSearchSubjectDocumentMutation } = searchApi;
