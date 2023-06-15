import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeReportContentReviewSubjectModal } from "../../store/modalState";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "45%",
  backgroundColor: "#f7f7f2",
  borderRadius: 1,
  boxShadow: 24,
};

function ReportContentReviewSubjectModal({ open }) {
  const dispatch = useDispatch();
  const {
    reportContentReviewSubjectModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const closeModal = () => {
    dispatch(closeReportContentReviewSubjectModal());
  };

  return (
    <Modal open={open} onClose={closeModal} sx={{ border: "none" }}>
      <Box sx={{ ...style }}>
        
      </Box>
    </Modal>
  );
}

export default ReportContentReviewSubjectModal;
