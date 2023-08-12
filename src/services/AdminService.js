import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const adminApi = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/admins`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication?.user?.token;
      if (token) {
        headers.set("X-HUST-DOCUMENT-KEY", token);
      }
      return headers;
    },
  }),
  tagTypes: ["admin"],
  endpoints: (builder) => ({
    getDataForDashboard: builder.query({
      query: () => "/dashboard",
      transformResponse: (response) => {
        var ChartLabels = [];
        var today = new Date();
        for (var i = 0; i < 7; i++) {
          var date = new Date(today);
          date.setDate(date.getDate() - i);

          var day = ("0" + date.getDate()).slice(-2);
          var month = ("0" + (date.getMonth() + 1)).slice(-2);

          var formattedDate = day + "/" + month;
          ChartLabels.push(formattedDate);
        }
        const [user, post, review] = response.content;
        let userData = [];
        let postData = [];
        let reviewData = [];
        let subjectDocumentData = [];
        let userTotal = 0;
        let postTotal = 0;
        let reviewTotal = 0;
        let subjectDocumentTotal = 0;

        for (let i = 6; i >= 0 ; i--) {
          const key = ChartLabels[i];
          if (user[key]) {
            userData.push(user[key]);
            userTotal += user[key];
          } else userData.push(0);
          if (post[key]) {
            postData.push(post[key]);
            postTotal += post[key];
          } else postData.push(0);
          if (review[key]) {
            reviewData.push(review[key]);
            reviewTotal += review[key];
          } else reviewData.push(0);
          subjectDocumentData.push(0);
        }
        const AdminDashboashData = {
          labels: ChartLabels.reverse(),
          datasets: [
            {
              label: "Người dùng",
              data: userData,
              borderColor: "#1EA6C6",
              backgroundColor: "#1EA6C6",
            },
            {
              label: "Tài liệu mới",
              data: subjectDocumentData,
              borderColor: "#F43B3B",
              backgroundColor: "#F43B3B",
            },
            {
              label: "Bài review mới",
              data: reviewData,
              borderColor: "#2D56A1",
              backgroundColor: "#2D56A1",
            },
            {
              label: "Bài viết mới",
              data: postData,
              borderColor: "#23F2C4",
              backgroundColor: "#23F2C4",
            },
          ],
        };
        return {
          userTotal: userTotal,
          reviewTotal: reviewTotal,
          postTotal: postTotal,
          subjectDocumentTotal: subjectDocumentTotal,
          AdminDashboashData: AdminDashboashData,
        };
      },
    }),
  }),
});

export const { useGetDataForDashboardQuery } = adminApi;
