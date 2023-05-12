import { Box, Typography } from "@mui/material";
import React from "react";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
  StatusFilter,
} from "../settings/sharedSetting";
function Document() {
  return (
    <Box>
      <Typography variant="h4" color={"text.secondary"} pt={1} pl={1}>
        Tài liệu cá nhân của bạn
      </Typography>
      <Filter
        data={[
          FileTypeFilter,
          DocumentTypeFilter,
          SemesterFilter,
          SubjectCodeFilter,
          StatusFilter,
        ]}
      />
    </Box>
  );
}

export default Document;
