import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const reportApi = createApi({
  reducerPath: "report",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/reports`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["report"],
  endpoints: (builder) => ({
    
  }),
});

// export const {

// } = reportApi;
