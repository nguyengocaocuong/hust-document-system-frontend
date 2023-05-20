import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Education() {
  return (
    <Box sx={{backgroundColor:'white'}} height={"100%"}>
      <Outlet />
    </Box>
  );
}

export default Education;
