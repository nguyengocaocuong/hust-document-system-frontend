import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UpdateSubjectModal from "./UpdateSubjectModal";
import UpdateTeacherModal from "./UpdateTeacherModal";
import ReportContentReviewSubjectModal from "./ReportContentReviewSubjectModal";
import ReportContentSubjectDocumentModal from "./ReportContentSubjectDocumentModal";
import ReportDuplicateSubjectDocumentModal from "./ReportDuplicateSubjectDocumentModal";
import ReportContentReviewTeacherModal from "./ReportContentReviewTeacherModal";
import NewReviewSubjectModal from "./NewReviewSubjectModal";
import NewReviewTeacherModal from "./NewReviewTeacherModal";
function AdminModal() {
  const {
    updateSubjectModal,
    updateTeacherModal,
    reportContentReviewSubjectModal,
    reportContentSubjectDocumentModal,
    reportDuplicateSubjectDocumentModal,
    reportContentReviewTeacherModal,
    newReviewSubjectModal,
    newReviewTeacherModal,
  } = useSelector((state) => state.modalState);
  return (
    <Box>
      {updateSubjectModal.open && (
        <UpdateSubjectModal open={updateSubjectModal.open} />
      )}
      {updateTeacherModal.open && (
        <UpdateTeacherModal open={updateTeacherModal.open} />
      )}
      {reportContentReviewSubjectModal.open && (
        <ReportContentReviewSubjectModal
          open={reportContentReviewSubjectModal.open}
        />
      )}
      {reportContentSubjectDocumentModal.open && (
        <ReportContentSubjectDocumentModal
          open={reportContentSubjectDocumentModal.open}
        />
      )}
      {reportDuplicateSubjectDocumentModal.open && (
        <ReportDuplicateSubjectDocumentModal
          open={reportDuplicateSubjectDocumentModal.open}
        />
      )}
      {reportContentReviewTeacherModal.open && (
        <ReportContentReviewTeacherModal
          open={reportContentReviewTeacherModal.open}
        />
      )}
      {newReviewSubjectModal.open && (
        <NewReviewSubjectModal
          open={newReviewSubjectModal.open}
        />
      )}
      {newReviewTeacherModal.open && (
        <NewReviewTeacherModal
          open={newReviewTeacherModal.open}
        />
      )}
    </Box>
  );
}

export default AdminModal;
