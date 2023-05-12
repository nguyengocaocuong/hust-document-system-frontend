import React from "react";
import { Box, Typography } from "@mui/material";
import ListDocuments from "../components/documents/listDocuments";
import TableDocuments from "../components/documents/tableDocuments";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
} from "../settings/sharedSetting";
function Shared() {
  return (
    <Box
      pt={2}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
      sx={{ backgroundColor: "white" }}
    >
      <Box pt={0} p={2} pb={0} maxHeight={"80px"} height={"80px"}>
        <Typography variant="h4" color={"text.secondary"}>
          Tài liệu được chia sẻ
        </Typography>
        <Filter
          data={[
            FileTypeFilter,
            DocumentTypeFilter,
            SemesterFilter,
            SubjectCodeFilter,
          ]}
        />
      </Box>
      <ListDocuments />
      <TableDocuments />
    </Box>
  );
}

export default Shared;
