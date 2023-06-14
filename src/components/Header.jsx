import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import React from "react";
import SearchBox from "../components/SearchBox";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./notifycation";
import { deepOrange } from "@mui/material/colors";
import { toggleNotification } from "../store/notificationState";
import UploadAnimation from "./UploadAnimation";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
function Header() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const {
    notifications: { LOADING, APPROVE, SHARED },
    isShow,
  } = useSelector((state) => state.notificationState);
  const toggle = () => {
    dispatch(toggleNotification(isShow));
  };
  const isLoading = LOADING.find((item) => item.status === 0) ? true : false;

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
        <IconButton onClick={() => collapseSidebar(!collapsed)}>
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
        {isLoading ? (
          <UploadAnimation
            toggle={toggle}
            total={LOADING.length + APPROVE.length + SHARED.length}
          />
        ) : (
          <IconButton sx={{ marginRight: "16px" }} onClick={toggle}>
            <Badge
              badgeContent={LOADING.length + APPROVE.length + SHARED.length}
              color="error"
            >
              <NotificationsActiveOutlinedIcon style={{ fontSize: "25px" }} />
            </Badge>
          </IconButton>
        )}
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src={user?.avatar}
          >
            {user?.lastName.substring(
              user?.lastName.lastIndexOf(" ") + 1,
              user?.lastName.lastIndexOf(" ") + 2
            )}
          </Avatar>
        </StyledBadge>

        <Box ml={"5px"}>
          <Typography fontSize={"14px"}>
            {`${user?.firstName} ${user?.lastName}`}
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
            {user.roleType === "ADMIN" ? "quản trị viên" : "người dùng"}
          </Box>
        </Box>
      </Box>
      <Notification isShow={isShow} toggle={toggle} />
    </Box>
  );
}

export default Header;
