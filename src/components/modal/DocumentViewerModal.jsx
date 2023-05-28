import { Box, Modal } from "@mui/material";
import React from "react";
import DocumentViewer from "../document/DocumentViewer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  pb: 3,
};
function DocumentViewerModal({ open, closeModal, docs = [] }) {
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box height={"100vh"} width={"50vw"} overflow={"auto"}>
          <DocumentViewer docs={docs} />
        </Box>
      </Box>
    </Modal>
  );
}

export default DocumentViewerModal;
