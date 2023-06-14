import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AnswerPostModal from "./AnswerPostModal";
import AnswerSubjectDocumentModal from "./AnswerSubjectDocumentModal";
import DocumentViewerModal from "./DocumentViewerModal";
import ReportModal from "./ReportModal";
import ReviewTeacherModal from "./ReviewTeacherModal";
import ReviewSubjectModal from "./ReviewSubjectModal";
import SharingModal from "./SharingModal";
import SubjectDocumentModal from "./SubjectDocumentModal";
import TeacherModal from "./TeacherModal";
import SubjectModal from "./SubjectModal";
function Modal() {
  const {
    answerPostModal,
    answerSubjectDocumentModal,
    documentViewerModal,
    reportModal,
    reviewTeacherModal,
    reviewSubjectModal,
    sharingModal,
    subjectDocumentModal,
    teacherModal,
    subjectModal,
  } = useSelector((state) => state.modalState);
  return (
    <Box>
      {answerPostModal.open && <AnswerPostModal open={answerPostModal.open} />}
      {(answerSubjectDocumentModal.open || answerSubjectDocumentModal.dataModal) && (
        <AnswerSubjectDocumentModal open={answerSubjectDocumentModal.open} />
      )}
      {documentViewerModal.open && (
        <DocumentViewerModal open={documentViewerModal.open} />
      )}
      {reportModal.open && <ReportModal open={reportModal.open} />}
      {reviewTeacherModal.open && (
        <ReviewTeacherModal open={reviewTeacherModal.open} />
      )}
      {reviewSubjectModal.open && (
        <ReviewSubjectModal open={reviewSubjectModal.open} />
      )}
      {sharingModal.open && <SharingModal open={sharingModal.open} />}
      {(subjectDocumentModal.open || subjectDocumentModal.dataModal) && (
        <SubjectDocumentModal open={subjectDocumentModal.open} />
      )}
      {teacherModal.open && <TeacherModal open={teacherModal.open} />}
      {subjectModal.open && <SubjectModal open={subjectModal.open} />}
    </Box>
  );
}

export default Modal;
