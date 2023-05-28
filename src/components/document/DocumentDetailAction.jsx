import React from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import TranslateIcon from "@mui/icons-material/Translate";

import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
function DocumentCardDetailAction({
  handleSelectedId,
  selectedId,
  totalComment = 0,
  favorite = {},
  totalAnswer = 0,
}) {
  const { user } = useSelector((state) => state.authentication);
  const favorited =
    favorite.data?.find((favorite) => favorite.user.id === user.id) !==
    undefined;
  return (
    <Box maxHeight={"80px"} pr={1} pl={1}>
      <Box
        width={"100%"}
        display="flex"
        justifyContent="space-between"
        pt={"5px"}
        pb={"5px"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <FavoriteOutlinedIcon sx={{ fontSize: "18px", color: "red" }} />
          <Typography fontSize={"14px"} ml={"5px"}>
            {favorite.data?.length} người
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Box display={"flex"} alignItems={"center"} mr={2}>
            <Typography fontSize={"14px"} mr={"5px"}>
              {totalAnswer}
            </Typography>
            <QuestionAnswerOutlinedIcon sx={{ fontSize: "18px" }} />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography fontSize={"14px"} mr={"5px"}>
              {totalComment}
            </Typography>
            <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} justifyContent={"space-between"} p={"5px"}>
        <IconButton
          onClick={favorite.toggleFavorite}
          sx={{
            width: "calc(30%)",
            textAlign: "center",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
        >
          <FavoriteOutlinedIcon
            sx={{
              fontSize: "25px",
              color: favorited ? "red" : "",
            }}
          />
          <Typography variant="body1">
            {favorited ? "Bỏ thích" : "Yêu thích"}
          </Typography>
        </IconButton>
        <IconButton
          sx={{
            width: "calc(30%)",
            textAlign: "center",
            borderRadius: "5px",
            color: selectedId === 1 ? "red" : "",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
          onClick={() => handleSelectedId(1)}
        >
          <QuestionAnswerOutlinedIcon sx={{ fontSize: "25px" }} />
          <Typography variant="body1" style={{}}>
            Câu trả lời
          </Typography>
        </IconButton>
        <IconButton
          sx={{
            width: "calc(30%)",
            textAlign: "center",
            borderRadius: "5px",
            color: selectedId === 2 ? "red" : "",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
          onClick={() => handleSelectedId(2)}
        >
          <InsertCommentOutlinedIcon sx={{ fontSize: "25px" }} />
          <Typography variant="body1">Bình luận</Typography>
        </IconButton>
        <IconButton
          sx={{
            width: "calc(10%)",
            textAlign: "center",
            borderRadius: "5px",
            "&:hover": { color: "red" },
          }}
        >
          <TranslateIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </Box>
      <Divider />
    </Box>
  );
}

export default DocumentCardDetailAction;
