import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import Subject from "../components/subject/Subject";
import Filter from "../components/Filter";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { openSubjectModal } from "../store/modalState";
function Education() {
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
          justifyContent={"start"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Tài liệu học tập
          </Typography>
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
      <Subject />
    </Box>
  );
}

export default Education;
