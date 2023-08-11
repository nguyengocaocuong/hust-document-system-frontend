import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const instituteApi = createApi({
  reducerPath: "institute",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users/institute`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getAllInsitutes: builder.query({
      query: () =>'',
      transformResponse: (response) => response?.content,
    }),
  }),
});

export const {
  useGetAllInsitutesQuery
} = instituteApi;
