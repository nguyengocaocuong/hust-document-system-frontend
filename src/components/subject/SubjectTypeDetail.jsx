import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import DocumentCard from "../document/DocumentCard";
import { documentType as type } from "../../settings/SubjectSetting";
import DocumentViewerModal from "../modal/DocumentViewerModal";
import { useState } from "react";
function SubjectTypeDetail({ subjectType = {}, subjectDetail = {} }) {
  const [modalData, setModalData] = useState({ data: null, open: false });
  const openModal = (data) => setModalData({ data, open: true });
  const closeModal = () => setModalData({ data: null, open: false });
  return (
    <Box p={2} width={"100%"}>
      <Box>
        <Typography variant="h5" fontWeight={"bold"}>
          {type[subjectType.type]?.title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {subjectType.documents.map((document, index) => (
          <DocumentCard
            document={document}
            key={index}
            subjectDetail={subjectDetail}
            preview={() => openModal(document)}
          />
        ))}
      </Grid>
      {modalData.open && (
        <DocumentViewerModal
          open={modalData.open}
          closeModal={closeModal}
          docs={[
            {
              uri: `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocuments/${modalData.data?.id}/readFile`,
              fileName: modalData.data?.document.name,
            },
          ]}
        />
      )}
    </Box>
  );
}

export default SubjectTypeDetail;
