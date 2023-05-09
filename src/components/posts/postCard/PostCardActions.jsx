import React, { useState } from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { Box, CardActions, Divider, Typography } from "@mui/material";
function PostCardActions() {
  const [like, setLike] = useState(false);

  return (
    <CardActions
      disableSpacing
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box width={"calc(70%)"} textAlign={"start"}>
        <Typography fontSize={"12px"}>{like ? "24" : "23"} người</Typography>
        <Divider />
        {like ? (
          <FavoriteOutlinedIcon sx={{ fontSize: "25px", color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "20px" }} />
        )}
      </Box>
      <Box width={"30%"} display={"flex"}>
        <Box width={"50%"} textAlign={"center"}>
          <Typography fontSize={"12px"}>23 câu trả lời</Typography>
          <Divider />
          <QuestionAnswerOutlinedIcon sx={{ fontSize: "20px" }} />
        </Box>
        <Box width={"50%"} textAlign={"center"}>
          <Typography fontSize={"12px"}>13 bình luận</Typography>
          <Divider />
          <InsertCommentOutlinedIcon sx={{ fontSize: "20px" }} />
        </Box>
      </Box>
    </CardActions>
  );
}

export default PostCardActions;
