import { Box, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

function SidebarHomeItem() {
  const { collapsed } = useProSidebar();
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={"20px"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background:
            "linear-gradient(90deg, rgba(255,0,4,1) 0%, rgba(255,82,82,0.8856792717086834) 0%, rgba(255,0,0,1) 100%)",
          width: "90%",
          height: "50px",
          borderRadius: "25px",
        }}
      >
        <HomeOutlinedIcon
          style={{
            fontSize: "30px",
            color: "white",
          }}
        />
        {!collapsed && (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              color={"white"}
              ml={"10px"}
              sx={{ fontWeight: 700 }}
            >
              Trang chủ
            </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default SidebarHomeItem;
