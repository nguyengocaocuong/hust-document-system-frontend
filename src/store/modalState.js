import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answerPostModal: {
    open: false,
    dataModal: null,
  },
  answerSubjectDocumentModal: {
    open: false,
    dataModal: null,
  },
  documentViewerModal: {
    open: false,
    dataModal: null,
  },
  reportModal: {
    open: false,
    dataModal: null,
  },
  reviewTeacherModal: {
    open: false,
    dataModal: null,
  },
  reviewSubjectModal: {
    open: false,
    dataModal: null,
  },
  sharingModal: {
    open: false,
    dataModal: null,
  },
  subjectDocumentModal: {
    open: false,
    dataModal: null,
  },
  subjectModal: {
    open: false,
    dataModal: null,
  },
  teacherModal: {
    open: false,
    dataModal: null,
  },
  updateSubjectModal: {
    open: false,
    dataModal: null,
  },
  updateTeacherModal: {
    open: false,
    dataModal: null,
  },
  reportContentReviewSubjectModal: {
    open: false,
    dataModal: null,
  },
  reportContentSubjectDocumentModal: {
    open: false,
    dataModal: null,
  },
  reportDuplicateSubjectDocumentModal: {
    open: true,
    dataModal: null,
  },
  reportContentReviewTeacherModal: {
    open: false,
    dataModal: null,
  },
};

export const modalState = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeAnswerPostModal: (state) => {
      state.answerPostModal.open = false;
      state.answerPostModal.dataModal = null;
    },
    closeAnswerSubjectDocumentModal: (state) => {
      state.answerSubjectDocumentModal.open = false;
      // state.answerSubjectDocumentModal.dataModal = null;
    },
    closeDocumentViewerModal: (state) => {
      state.documentViewerModal.open = false;
      state.documentViewerModal.dataModal = null;
    },
    closeReportModal: (state) => {
      state.reportModal.open = false;
      state.reportModal.dataModal = null;
    },
    closeReviewTeacherModal: (state) => {
      state.reviewTeacherModal.open = false;
      state.reviewTeacherModal.dataModal = null;
    },
    closeReviewSubjectModal: (state) => {
      state.reviewSubjectModal.open = false;
      state.reviewSubjectModal.dataModal = null;
    },
    closeSharingModal: (state) => {
      state.sharingModal.open = false;
      state.sharingModal.dataModal = null;
    },
    closeSubjectDocumentModal: (state) => {
      state.subjectDocumentModal.open = false;
      // state.subjectDocumentModal.dataModal = null;
    },
    closeSubjectModal: (state) => {
      state.subjectModal.open = false;
      state.subjectModal.dataModal = null;
    },
    closeTeacherModal: (state) => {
      state.teacherModal.open = false;
      state.teacherModal.dataModal = null;
    },
    closeUpdateSubjectModal: (state) => {
      state.updateSubjectModal.open = false;
      state.updateSubjectModal.dataModal = null;
    },
    closeUpdateTeacherModal: (state) => {
      state.updateTeacherModal.open = false;
      state.updateTeacherModal.dataModal = null;
    },
    openAnswerPostModal: (state, action) => {
      if (action.payload === undefined) return;
      state.answerPostModal.dataModal = action.payload;
      state.answerPostModal.open = true;
    },
    openAnswerSubjectDocumentModal: (state, action) => {
      if (action.payload === undefined) return;
      state.answerSubjectDocumentModal.dataModal = action.payload;
      state.answerSubjectDocumentModal.open = true;
    },
    openDocumentViewerModal: (state, action) => {
      if (action.payload === undefined) return;
      state.documentViewerModal.dataModal = action.payload;
      state.documentViewerModal.open = true;
    },
    openReportModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reportModal.dataModal = action.payload;
      state.reportModal.open = true;
    },
    openReviewTeacherModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reviewTeacherModal.dataModal = action.payload;
      state.reviewTeacherModal.open = true;
    },
    openReviewSubjectModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reviewSubjectModal.dataModal = action.payload;
      state.reviewSubjectModal.open = true;
    },
    openSharingModal: (state, action) => {
      if (action.payload === undefined) return;
      state.sharingModal.dataModal = action.payload;
      state.sharingModal.open = true;
    },
    openSubjectDocumentModal: (state, action) => {
      if (action.payload === undefined) return;
      state.subjectDocumentModal.dataModal = action.payload;
      state.subjectDocumentModal.open = true;
    },
    openTeacherModal: (state, action) => {
      state.teacherModal.dataModal = action.payload;
      state.teacherModal.open = true;
    },
    openSubjectModal: (state, action) => {
      state.subjectModal.dataModal = action.payload;
      state.subjectModal.open = true;
    },
    openUpdateSubjectModal: (state, action) => {
      state.updateSubjectModal.dataModal = action.payload;
      state.updateSubjectModal.open = true;
    },
    openUpdateTeacherModal: (state, action) => {
      state.updateTeacherModal.dataModal = action.payload;
      state.updateTeacherModal.open = true;
    },
    closeReportContentReviewSubjectModal: (state) => {
      state.reportContentReviewSubjectModal.open = false;
      state.reportContentReviewSubjectModal.dataModal = null;
    },
    openReportContentReviewSubjectModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reportContentReviewSubjectModal.dataModal = action.payload;
      state.reportContentReviewSubjectModal.open = true;
    },
    closeReportContentSubjectDocumentModal: (state) => {
      state.reportContentSubjectDocumentModal.open = false;
      state.reportContentSubjectDocumentModal.dataModal = null;
    },
    openReportContentSubjectDocumentModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reportContentSubjectDocumentModal.dataModal = action.payload;
      state.reportContentSubjectDocumentModal.open = true;
    },
    closeReportDuplicateSubjectDocumentModal: (state) => {
      state.reportDuplicateSubjectDocumentModal.open = false;
      state.reportDuplicateSubjectDocumentModal.dataModal = null;
    },
    openReportDuplicateSubjectDocumentModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reportDuplicateSubjectDocumentModal.dataModal = action.payload;
      state.reportDuplicateSubjectDocumentModal.open = true;
    },
    closeReportContentReviewTeacherModal: (state) => {
      state.reportContentReviewTeacherModal.open = false;
      state.reportContentReviewTeacherModal.dataModal = null;
    },
    openReportContentReviewTeacherModal: (state, action) => {
      if (action.payload === undefined) return;
      state.reportContentReviewTeacherModal.dataModal = action.payload;
      state.reportContentReviewTeacherModal.open = true;
    },
  },
});
export const {
  closeAnswerModal,
  closeAnswerPostModal,
  closeAnswerSubjectDocumentModal,
  closeDocumentViewerModal,
  closeReportModal,
  closeReviewTeacherModal,
  closeReviewSubjectModal,
  closeSharingModal,
  closeSubjectDocumentModal,
  closeSubjectModal,
  closeTeacherModal,
  closeUpdateSubjectModal,
  closeUpdateTeacherModal,
  openAnswerPostModal,
  openAnswerSubjectDocumentModal,
  openDocumentViewerModal,
  openReportModal,
  openReviewTeacherModal,
  openReviewSubjectModal,
  openSharingModal,
  openSubjectDocumentModal,
  openSubjectModal,
  openTeacherModal,
  openUpdateSubjectModal,
  openUpdateTeacherModal,
  closeReportContentReviewSubjectModal,
  closeReportContentReviewTeacherModal,
  closeReportContentSubjectDocumentModal,
  closeReportDuplicateSubjectDocumentModal,
  openReportContentReviewSubjectModal,
  openReportContentReviewTeacherModal,
  openReportContentSubjectDocumentModal,
  openReportDuplicateSubjectDocumentModal,
} = modalState.actions;
export default modalState.reducer;
