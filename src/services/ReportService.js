import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const reportApi = createApi({
  reducerPath: "report",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}/users/reports`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
