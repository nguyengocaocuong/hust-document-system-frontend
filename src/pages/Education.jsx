import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Subject from "../components/subject/Subject";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Filter from "../components/Filter";
import TableDocuments from "../components/documents/tableDocuments";
import { useGetAllSubjectQuery } from "../services/SubjectService";

function Education() {
  const [type, setType] = useState(false);
  const { data: subjects = [] } = useGetAllSubjectQuery();
  const onSearching = (data) => {
    console.log(data);
  };
  return (
    <Box sx={{ backgroundColor: "white" }} height={"100%"} overflow={"auto"}>
      <Box p={2}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Tài liệu học tập
          </Typography>
          <IconButton onClick={() => setType(!type)}>
            {type ? <PlaylistAddCheckIcon /> : <GridViewIcon />}
          </IconButton>
        </Box>
        <Filter onSearching={onSearching} />
      </Box>
      {type ? <TableDocuments /> : <Subject subjects={subjects} />}
    </Box>
  );
}

export default Education;
