import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Subject from "../components/subject/Subject";
import GridViewIcon from "@mui/icons-material/GridView";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Filter from "../components/Filter";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { openSubjectModal } from "../store/modalState";
function Education() {
  const [type, setType] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(openSubjectModal());
  };
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
      <Subject displayType={type} />
    </Box>
  );
}

export default Education;
