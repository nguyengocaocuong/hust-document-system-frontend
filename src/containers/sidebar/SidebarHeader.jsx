import { Box } from "@mui/material";
import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import logo_notext from "../../assets/images/logo/logo_notext.png";
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
      <Box width={"90%"} p="15px">
        <img src={collapsed ? logo_notext : logo} width={"100%"} alt={"logo"} />
      </Box>
    </Box>
  );
}

export default SidebarHeader;
