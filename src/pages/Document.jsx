import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
  StatusFilter,
} from "../settings/sharedSetting";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ListDocuments from "../components/documents/listDocuments";
import TableDocuments from "../components/documents/tableDocuments";
function Document() {
  const [type, setType] = useState(false);
  return (
    <Box
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      sx={{ backgroundColor: "white" }}
    >
      <Box m={2}  maxHeight={"60px"} height={"60px"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h4" color={"text.secondary"}>
            Tài liệu cá nhân của bạn
          </Typography>
          <IconButton onClick={() => setType(!type)}>
            {type ? <PlaylistAddCheckIcon /> : <GridViewIcon />}
          </IconButton>
        </Box>
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
      <ListDocuments title={"Vừa mới truy cập"}/>
      <TableDocuments />
    </Box>
  );
}

export default Document;
