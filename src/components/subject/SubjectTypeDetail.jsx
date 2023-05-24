import { Box, Grid } from "@mui/material";
import React from "react";
import DocumentCard from "../documents/documentsCard";

function SubjectTypeDetail({ subjectType = {}, subjectDetail = {} }) {
  return (
    <Box p={2} width={"100%"} maxHeight={"100%"} overflow={"auto"}>
      <Grid container spacing={2}>
        {subjectType.documents.map((document, index) => (
          <DocumentCard document={document} key={index} subjectDetail={subjectDetail}/>
        ))}
      </Grid>
    </Box>
  );
}

export default SubjectTypeDetail;
