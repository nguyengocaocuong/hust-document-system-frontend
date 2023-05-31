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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import SellIcon from "@mui/icons-material/Sell";
import { formatTimeAgo } from "../../utils/ConvertDate";
function ReviewTeacherCard({ openModal, review }) {
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
        <Avatar sx={{ backgroundColor: red[500], mr: 1 }} src={review?.owner.avatar}>H</Avatar>
        <Box>
          <Typography variant="h5">{`${review?.owner.firstName} ${review?.owner.lastName}`}</Typography>
          <Typography>{formatTimeAgo(review?.createdAt)}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} my={1}>
        <SellIcon />
        <Typography>
          Môn học <strong>{review?.subject.name}</strong>
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"150px"}
        maxHeight={"150px"}
        overflow={"hidden"}
      >
        <div
          dangerouslySetInnerHTML={{ __html: review?.review }}
          id="review-content"
        />
      </Box>

      <Box display={"flex"} my={1} alignItems={"center"}>
        <Box display={"flex"} alignItems={"center"} mr={2}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              alert("tym");
            }}
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>{" "}
          <Typography>
            <strong>{review?.totalFavorite}</strong> yêu thích
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton>
            <ChatIcon color="success" />
          </IconButton>{" "}
          <Typography>
            <strong>{review?.totalComment}</strong> bình luận
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewTeacherCard;
