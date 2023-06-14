import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  notifications: {
    SHARED: [
      {
        type: "SHARED",
        id: 12,
        subjectDocument: {
          id: 4,
          subjectDocumentType: "EXAM",
          type: "PDF",
          document: {
            id: 28,
            createdAt: "2023-06-06T11:33:26.469+00:00",
            name: "NGỮ PHÁP SHINKANZEN N2.pdf",
            contentType: "application/pdf",
            thumbnail:
              "https://storage.googleapis.com/hust-document-storage/dbe36f33-60b4-41df-8d6c-7c873618dee4/thumbnail.png",
            path: "dbe36f33-60b4-41df-8d6c-7c873618dee4/NGỮ PHÁP SHINKANZEN N2.pdf",
            url: null,
          },
          description: "Tài liệu",
          owner: {
            id: 1,
            lastName: "Cao Cường",
            firstName: "Nguyễn Ngô ",
            email: "cuong.nnc184055@sis.hust.edu.vn",
            dob: null,
            avatar:
              "https://storage.googleapis.com/hust-document-storage/180d43bb-5b86-4c50-8954-6f00f7d09df5/WIN_20230407_22_38_56_Pro.jpg",
            createdAt: "2023-06-05T09:27:01.991+00:00",
            phoneNumber: "0818988577",
            facebookUrl: "facebookurl",
            instagramUrl: "facebookurl",
            twitterUrl: "facebookurl",
            token: null,
          },
          semester: null,
          subject: {
            id: 1,
            name: "Giải tích 2",
            description: "Mô tả môn học giải tích 2",
            createdAt: "2023-06-05T09:27:50.450+00:00",
            subjectCode: "MATH123",
            totalComment: 0,
            totalDocument: 0,
            totalFavorite: 0,
            totalAnswer: 0,
            subjectDocuments: null,
          },
          createdAt: "2023-06-07T03:12:40.000+00:00",
          lastEditedAt: "2023-06-09T10:51:59.213+00:00",
          commentSubjectDocumentList: null,
          answerSubjectDocumentList: null,
          favoriteSubjectDocumentList: null,
          shared: null,
          deletedAt: "2023-05-09T10:13:00.000+00:00",
          public: false,
        },
        user: {
          id: 4,
          lastName: "Hiếu",
          firstName: "Nguyễn Đức",
          email: "hieu.nd1824122@sis.hust.edu.vn",
          dob: null,
          avatar:
            "https://storage.googleapis.com/hust-document-storage/78a1d7c4-b9e9-4f31-963e-750d2d551e53/346083026_281195167594658_3456511823693487059_n.jpg",
          createdAt: "2023-06-07T01:27:18.027+00:00",
          phoneNumber: "null",
          facebookUrl: "null",
          instagramUrl: "null",
          twitterUrl: "null",
          token: null,
        },
        sharedAt: "2023-06-08T08:27:39.396+00:00",
      },
    ],
    APPROVE: [
      {
        type: "APPROVE",
        id: 1,
        approveType: "REVIEW_SUBJECT",
        review: {
          id: 1,
          approved: "APPROVED",
          subject: { name: "Giải tích 2" },
        },
      },
      {
        type: "APPROVE",
        id: 2,
        approveType: "REVIEW_TEACHER",
        review: {
          id: 1,
          approved: "REJECT",
          teacher: { name: "Đỗ Quốc Huy" },
          message: "Bài bạn viết có nội dung không lành mạnh"
        },
      },
    ],
    LOADING: [],
  },
};

export const notificationState = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    toggleNotification: (state, action) => {
      state.isShow = !action.payload;
    },
    clearSharedNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.SHARED = preState.filter((item) => item.id !== id);
    },
    clearLoadingNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.LOADING = preState.filter((item) => item.id !== id);
    },
    clearApproveNotification: (state, action) => {
      let { id, preState } = action.payload;
      state.notifications.APPROVE = preState.filter((item) => item.id !== id);
    },
    addSharedNotification: (state, action) => {
      state.notifications.SHARED = action.payload;
    },
    addApproveNotification: (state, action) => {
      state.notifications.APPROVE = action.payload;
    },
    addLoadingNotification: (state, action) => {
      state.notifications.LOADING = action.payload;
    },
  },
});

export const {
  toggleNotification,
  clearSharedNotification,
  clearLoadingNotification,
  clearApproveNotification,
  addApproveNotification,
  addLoadingNotification,
  addSharedNotification,
} = notificationState.actions;
export default notificationState.reducer;
