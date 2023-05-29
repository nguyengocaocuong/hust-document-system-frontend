import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Filter from "../components/Filter";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
} from "../settings/SharedSetting";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
// import ListDocuments from "../components/document/listDocuments";
import TableDocuments from "../components/document/TableDocument";
import Subject from "../components/subject/Subject";
import { Documents } from "../data/Documents";
function Document() {
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
      {/* <ListDocuments title={"Vừa được chia sẻ"} items={Documents}/> */}
      {type ? <TableDocuments /> : <Subject />}
    </Box>
  );
}

export default Document;
