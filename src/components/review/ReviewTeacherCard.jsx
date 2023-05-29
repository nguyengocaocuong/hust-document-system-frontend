import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import SellIcon from "@mui/icons-material/Sell";
function ReviewTeacherCard({ openModal }) {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F3F3",
        borderRadius: "25px",
        p: 2,
        "&:hover": { boxShadow: 4 },
        transition: "box-shadow 0.4s",
      }}
      width={"100%"}
      onClick={openModal}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Avatar sx={{ backgroundColor: red[500], mr: 1 }}>H</Avatar>
        <Box>
          <Typography variant="h4">Đỗ Quốc Huy</Typography>
          <Typography>28-10-2000</Typography>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} my={1}>
        <SellIcon />
        <Typography>
          Giảng viên <strong>Đỗ Quốc Huy</strong>
        </Typography>
      </Box>
      <Typography my={1}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi debitis,
        velit excepturi praesentium, minima consequatur iste voluptatibus
        corrupti numquam assumenda quia temporibus sed veniam consequuntur quod
        provident asperiores? Cumque, beatae.
      </Typography>
      <Box display={"flex"} my={1} alignItems={"center"}>
        <Box display={"flex"} alignItems={"center"} mr={2}>
          <IconButton>
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>{" "}
          <Typography>
            <strong>123</strong> yêu thích
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton>
            <ChatIcon color="success" />
          </IconButton>{" "}
          <Typography>
            <strong>123</strong> bình luận
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewTeacherCard;
