import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useSelector } from "react-redux";
function Actions({ favorite, comment, answer }) {
  const width = answer ? 100 / 3 : 50;
  const { user } = useSelector((state) => state.authentication);
  const isFavorite = favorite?.data?.find((f) => f.user.id === user.id)
    ? true
    : false;
  return (
    <Box p={2}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={1}
      >
        {favorite && (
          <Box display={"flex"} alignItems={"center"}>
            <FavoriteIcon
              sx={{
                width: "20px",
                height: "20px",
                color: "inherit",
              }}
            />
            <Typography ml={0.5}>{favorite.data.length} yêu thích</Typography>
          </Box>
        )}
        <Box display={"flex"} alignItems={"center"}>
          {answer && (
            <Box display={"flex"} alignItems={"center"} mr={2}>
              <QuestionAnswerIcon sx={{ width: "20px", height: "20px" }} />
              <Typography ml={0.5}>{answer.data.length} câu trả lời</Typography>
            </Box>
          )}
          {comment && (
            <Box display={"flex"} alignItems={"center"}>
              <ChatBubbleOutlinedIcon sx={{ width: "20px", height: "20px" }} />
              <Typography ml={0.5}>{comment.data.length} bình luận</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} alignItems={"center"} p={1}>
        {favorite && (
          <Button
            sx={{
              textTransform: "capitalize",
              width: `${width}%`,
              color: "inherit",
            }}
            onClick={favorite?.onClick}
          >
            <FavoriteIcon
              sx={{
                width: "25px",
                height: "25px",
                color: isFavorite ? "red" : "inherit",
              }}
            />{" "}
            <Typography ml={0.5}>
              {isFavorite ? "Bỏ thích" : "Yêu thích"}
            </Typography>
          </Button>
        )}
        {answer && (
          <Button
            sx={{
              textTransform: "capitalize",
              width: `${width}%`,
              color: "inherit",
            }}
            onClick={() => answer?.onClick("answer")}
          >
            <QuestionAnswerIcon sx={{ width: "25px", height: "25px" }} />{" "}
            <Typography ml={0.5}>Đáp án</Typography>
          </Button>
        )}
        {comment && (
          <Button
            sx={{
              textTransform: "capitalize",
              width: `${width}%`,
              color: "inherit",
            }}
            onClick={() => comment?.onClick("comment")}
          >
            <ChatBubbleOutlinedIcon sx={{ width: "25px", height: "25px" }} />{" "}
            <Typography ml={0.5}>Bình luận</Typography>
          </Button>
        )}
      </Box>
      <Divider />
    </Box>
  );
}

export default Actions;
