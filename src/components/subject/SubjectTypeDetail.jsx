import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import DocumentCard from "../documents/documentsCard";
import { documentType as type } from "../../settings/SubjectSetting";

function SubjectTypeDetail({ subjectType = {}, subjectDetail = {} }) {
  return (
    <Box p={2} width={"100%"}>
      <Box>
        <Typography variant="h5" fontWeight={"bold"}>{type[subjectType.type]?.title}</Typography>
      </Box>
      <Grid container spacing={2}>
        {subjectType.documents.map((document, index) => (
          <DocumentCard
            document={document}
            key={index}
            subjectDetail={subjectDetail}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default SubjectTypeDetail;
