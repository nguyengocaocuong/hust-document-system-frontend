import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import SearchBox from "../../components/SearchBox";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import avatar from "../../assets/images/avatar/06.jpg";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

function index() {
  return (
    <Box
      width={"100%"}
      height={"72px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom="1px solid #D8D9D9"
      p={[0, 1]}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton>
          <MenuOpenOutlinedIcon style={{ fontSize: "25px" }} />
        </IconButton>
        <SearchBox placeHolde={"Bạn tìm gì?"} />
      </Box>
      <Box
        width={"400px"}
        sx={{ height: "50px" }}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        p={"5px"}
      >
        <IconButton sx={{ marginRight: "16px" }}>
          <Badge badgeContent={4} color="error">
            <NotificationsActiveOutlinedIcon style={{ fontSize: "25px" }} />
          </Badge>
        </IconButton>
        <Avatar alt="Remy Sharp" src={avatar} />
        <Box ml={"5px"}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nguyễn Ngô Cao Cường
          </Typography>
          <Box
            p="0"
            width={"100px"}
            textAlign={"center"}
            borderRadius={"25px"}
            color="white"
            sx={{
              background:
                "linear-gradient(90deg, rgba(255,0,4,1) 0%, rgba(255,82,82,0.8856792717086834) 0%, rgba(255,0,0,1) 100%)",
            }}
          >
            người dùng
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default index;
