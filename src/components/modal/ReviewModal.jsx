import { Box, Modal } from "@mui/material";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ReviewModal({ modalData, closeModal }) {
  return (
    <Modal open={modalData.open} onClose={closeModal}>
      <Box sx={{ ...style }}></Box>
    </Modal>
  );
}

export default ReviewModal;
