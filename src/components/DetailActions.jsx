import React from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import TranslateIcon from "@mui/icons-material/Translate";

import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
function DetailActions({
  handleSelectedId,
  selectedId,
  comments = [],
  favorites = {},
  answers = [],
}) {
  const { user } = useSelector((state) => state.authentication);
  const favorited =
    favorites.data?.find((favorite) => favorite.user.id === user.id) !==
    undefined;
  return (
    <Box height={"80px"} px={1}>
      <Box
        width={"100%"}
        display="flex"
        justifyContent="space-between"
        pt={"5px"}
        pb={"5px"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <FavoriteOutlinedIcon sx={{ fontSize: "18px" }} />
          <Typography fontSize={"14px"} ml={"5px"}>
            {favorites.data?.length} người
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Box display={"flex"} alignItems={"center"} mr={2}>
            <Typography fontSize={"14px"} mr={"5px"}>
              {answers.length}
            </Typography>
            <QuestionAnswerOutlinedIcon sx={{ fontSize: "18px" }} />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography fontSize={"14px"} mr={"5px"}>
              {comments.length}
            </Typography>
            <InsertCommentOutlinedIcon sx={{ fontSize: "18px" }} />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} justifyContent={"space-between"} p={"5px"}>
        <IconButton
          onClick={favorites.toggleFavorite}
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
            color: selectedId === 3 ? "red" : "",
            "&:hover": { backgroundColor: "#ECDCDC" },
          }}
          onClick={() => handleSelectedId(3)}
        >
          <TranslateIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </Box>
      <Divider />
    </Box>
  );
}

export default DetailActions;
