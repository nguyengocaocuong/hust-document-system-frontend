import { Box, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDocumentViewerModal } from "../../store/modalState";
import { useRef } from "react";
import { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import { useState } from "react";

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
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const viewer = useRef(null);
  const [refVisible, setRefVisible] = useState(false);
  const {
    documentViewerModal: { dataModal },
  } = useSelector((state) => state.modalState);
  console.log(dataModal)

  const closeModal = () => {
    dispatch(closeDocumentViewerModal());
  };
  useEffect(() => {
    if (refVisible)
      WebViewer(
        {
          path: "/lib",
          isAdminUser: true,
          isReadOnly: true,
          enableAnnotations: false,
          loadAsPDF: true,
          fullAPI: true,
        },
        viewer.current
      ).then((instance) => {
        const { UI } = instance;
        UI.setFitMode(instance.UI.FitMode.FitWidth);
        UI.loadDocument(dataModal.docs[0].uri, {
          filename: dataModal.docs[0].fileName,
          customHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      });
  }, [refVisible]);
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box
          width={"80%"}
          minWidth={"900px"}
          height={"100%"}
          maxHeight={"100vh"}
          overflow={"auto"}
          ref={(el) => {
            viewer.current = el;
            setRefVisible(true);
          }}
        >
        </Box>
      </Box>
    </Modal>
  );
}

export default DocumentViewerModal;
