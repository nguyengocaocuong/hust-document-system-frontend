import React from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  Box,
  CardActions,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
function PostCardActions({
  totalFavorite = 0,
  totalAnswer = 0,
  totalComment = 0,
}) {
  return (
    <CardActions
      disableSpacing
      style={{ padding: "16px", display: "block", paddingBottom: "0" }}
    >
      <Divider />
      <Box
        width={"100%"}
        display="flex"
        justifyContent="space-between"
        pt={"5px"}
        pb={"5px"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <FavoriteOutlinedIcon sx={{ fontSize: "18px", color: "red" }} />
          <Typography fontSize={"12px"} ml={"5px"}>
            {totalFavorite} người
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Typography fontSize={"12px"} mr={"10px"}>
            {totalAnswer} câu trả lời
          </Typography>
          <Typography fontSize={"12px"}>{totalComment} bình luận</Typography>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} justifyContent={"space-between"} p={"5px"}>
        <IconButton
          sx={{
            width: "30%",
            textAlign: "center",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <IconButton
          sx={{
            width: "30%",
            textAlign: "center",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
        >
          <QuestionAnswerOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <IconButton
          sx={{
            width: "30%",
            textAlign: "center",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
        >
          <InsertCommentOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>
    </CardActions>
  );
}

export default PostCardActions;
