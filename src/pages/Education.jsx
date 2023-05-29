import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Subject from "../components/subject/Subject";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Filter from "../components/Filter";
import SubjectModal from "../components/modal/SubjectModal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableDocuments from '../components/document/TableDocument'
function Education() {
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
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
        <Box display={"flex"}>
          <Filter onSearching={onSearching} />
          <Tooltip title={"Thêm môn học mới"} onClick={openModal}>
            <IconButton>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {type ? <TableDocuments /> : <Subject />}
      <SubjectModal open={open} closeModal={closeModal} />
    </Box>
  );
}

export default Education;
