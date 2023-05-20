import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useProSidebar } from 'react-pro-sidebar';
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useSelector } from "react-redux";
import Notification from "./Notification";
const data = [
  {
    type: "SHARED",
    by: {
      firstName: "Nguyen Ngo",
      lastName: "Cao Cuong",
      avartar:
        "https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg",
    },
    document: { name: "document.pdf", path: "" },
  },
  {
    type: "SHARED",
    by: {
      firstName: "Nguyen Ngo",
      lastName: "Cao Cuong",
      avartar:
        "https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg",
    },
    document: { name: "document.pdf", path: "" },
  },
  {
    type: "APPROVE",
    by: {
      firstName: "Nguyen Ngo",
      lastName: "Cao Cuong",
      avartar:
        "https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg",
    },
    document: { name: "document.pdf", path: "" },
  },
];
function Header() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { user } = useSelector((state) => state.authentication);
  const [isShow, setShow] = useState(false);
  const toggle = ()=>{
    setShow(!isShow)
  }
  const [notificationData, setNotificationData] = useState(data)

  return (
    <Box
      width={"100%"}
      height={"72px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom="1px solid #D8D9D9"
      sx={{ backgroundColor: "white" }}
      p={[0, 1]}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton onClick={()=> collapseSidebar(!collapsed)}>
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
        <IconButton sx={{ marginRight: "16px" }} onClick={toggle}>
          <Badge badgeContent={data.length} color="error">
            <NotificationsActiveOutlinedIcon style={{ fontSize: "25px" }} />
          </Badge>
        </IconButton>
        <Avatar alt="Remy Sharp" src={user.avatar} />
        <Box ml={"5px"}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {`${user.firstName} ${user.lastName}`}
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
      <Notification isShow={isShow} toggle={toggle} data={notificationData} setNotificationData={setNotificationData}/>
    </Box>
  );
}

export default Header;
