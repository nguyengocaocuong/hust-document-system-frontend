import { Box } from "@mui/material";
import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import logo_white from "../../assets/images/logo/logo-white.png";
import logo from "../../assets/images/logo/logo.png";
function SidebarHeader() {
  const { collapsed } = useProSidebar();
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mb="15px"
    >
      <Box width={"100%"} p={2} pb={0} overflow={'hidden'}>
        <img
          src={collapsed ? logo_white : logo}
          width={"220px"}
          alt={"logo"}
        />
      </Box>
    </Box>
  );
}

export default SidebarHeader;
