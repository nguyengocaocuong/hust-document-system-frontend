import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const searchApi = createApi({
  reducerPath: "searchs",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/search`,
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
