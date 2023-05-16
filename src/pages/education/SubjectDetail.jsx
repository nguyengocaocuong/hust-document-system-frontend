import { Box } from "@mui/material";
import React from "react";
import ListDocuments from "../../components/documents/listDocuments";

function SubjectDetail() {
  return (
    <Box height={"100%"} overflow={"auto"}>
      <ListDocuments title={"Slide học phần"} />
    </Box>
  );
}

export default SubjectDetail;
