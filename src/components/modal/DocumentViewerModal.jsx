import { Box, Modal } from "@mui/material";
import React from "react";
import DocumentViewer from "../document/DocumentViewer";
import { useDispatch, useSelector } from "react-redux";
import { closeDocumentViewerModal } from "../../store/modalState";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "100vh",
};
function DocumentViewerModal({ open }) {
  const dispatch = useDispatch();
  const {
    documentViewerModal: { dataModal },
  } = useSelector((state) => state.modalState);

  const closeModal = () => {
    dispatch(closeDocumentViewerModal());
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box
          width={"auto"}
          minWidth={"700px"}
          height={"100%"}
          maxHeight={"100vh"}
          overflow={"auto"}
        >
          <DocumentViewer docs={dataModal.docs} />
        </Box>
      </Box>
    </Modal>
  );
}

export default DocumentViewerModal;
