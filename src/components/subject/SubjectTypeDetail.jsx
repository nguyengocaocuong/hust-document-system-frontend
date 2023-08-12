import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import DocumentCard from "../document/DocumentCard";
import { documentType as type } from "../../settings/SubjectSetting";
import { useDispatch } from "react-redux";
import {
  openDocumentViewerModal,
  openSharingModal,
} from "../../store/modalState";
function SubjectTypeDetail({ subjectType = {}, subjectDetail = {} }) {
  const dispatch = useDispatch();
  const previewDocument = (subjectDocument) => {
    dispatch(
      openDocumentViewerModal({
        docs: [
          {
            uri: `https://hust-document-system-backend-vxw4qk34wa-as.a.run.app/api/v1/users/subjects/subjectDocument/${subjectDocument?.id}/readFile`,
            fileName: subjectDocument.document.name,
          },
        ],
      })
    );
  };
  const sharingDocument = (subjectDocument) => {
    dispatch(openSharingModal({ subjectDocumentId: subjectDocument.id }));
  };
  return (
    <Box p={2} width={"100%"} >
      <Typography variant="h4" fontWeight={"bold"} py={1}>
        {type[subjectType.type]?.title}
      </Typography>
      <Grid container spacing={2}>
        {subjectType.documents.map((document, index) => (
          <DocumentCard
            document={document}
            key={index}
            subjectDetail={subjectDetail}
            preview={() => previewDocument(document)}
            share={() => sharingDocument(document)}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default SubjectTypeDetail;
