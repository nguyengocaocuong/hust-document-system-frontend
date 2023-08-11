import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const historyApi = createApi({
  reducerPath: "history",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/history`,
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
