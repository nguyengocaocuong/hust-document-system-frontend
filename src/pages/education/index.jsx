import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
  StatusFilter,
} from "../../settings/sharedSetting";
import Filter from "../../components/Filter";
function Education() {
  return (
    <Box bgcolor={"white"} height={"100%"}>
      <Box p={2}>
        <Typography variant="h3" color={"text.secondary"}>
          Tài liệu học tập
        </Typography>
      </Box>
      <Box p={2} pt={0}>
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
      <Outlet />
    </Box>
  );
}

export default Education;
