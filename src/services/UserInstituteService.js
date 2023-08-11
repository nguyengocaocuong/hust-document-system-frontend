import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const instituteApi = createApi({
  reducerPath: "institute",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/institute`,
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
