import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const historyApi = createApi({
  reducerPath: "history",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/history`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["history"],
  endpoints: (builder) => ({
    getAllHistory: builder.query({
      query: () => "",
      transformResponse: (response) => response.content,
    }),
  }),
});

export const {
    useGetAllHistoryQuery
} = historyApi;
