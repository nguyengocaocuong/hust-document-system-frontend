import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ListDocuments from "../components/documents/listDocuments";
import TableDocuments from "../components/documents/tableDocuments";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
} from "../settings/sharedSetting";
import Filter from "../components/Filter";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Subject from "./education/Subject";

function Shared() {
  const [type, setType] = useState(false);
  return (
    <Box
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      sx={{ backgroundColor: "white" }}
    >
      <Box m={2} maxHeight={"60px"} height={"60px"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h4" color={"text.secondary"}>
            Tài liệu được chia sẻ
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
          ]}
        />
      </Box>
      <ListDocuments title={"Vừa được chia sẻ"} />
      {type ? <TableDocuments /> : <Subject />}
    </Box>
  );
}

export default Shared;
