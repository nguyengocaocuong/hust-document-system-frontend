import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const searchApi = createApi({
  reducerPath: "searchs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/customsearch/v1",
  }),
  tagTypes: ["search"],
  endpoints: (builder) => ({
    searchAllInWebsite: builder.mutation({
      query: (data) => ({
        url: "",
        method: "GET",
        params: {
          key: process.env.REACT_APP_GOOGLE_SEARCH_API_KEY,
          cx: process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID,
          q: data.q,
          num: data.num,
          start: data.startIndex,
        },
      }),
      providesTags: ["search"],
    }),
  }),
});

export const { useSearchAllInWebsiteMutation } = searchApi;
