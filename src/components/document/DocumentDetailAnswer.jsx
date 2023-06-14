import { Box, Button, Stack } from "@mui/material";
import React, { memo } from "react";
import DocumentAnswer from "./DocumentAnswer";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  openAnswerPostModal,
  openAnswerSubjectDocumentModal,
} from "../../store/modalState";
const MemoDocumentAnswer = memo(({ answers, toggleFavorite }) => (
  <Stack spacing={1.5}>
    {answers.map((answer, index) => (
      <DocumentAnswer
        key={index}
        answer={answer}
        toggleFavorite={toggleFavorite}
      />
    ))}
  </Stack>
));
function DocumentDetailtAnswer({ answers }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const openAnswerModal = () => {
    if (location.pathname.startsWith("/post/")) {
      dispatch(openAnswerPostModal({ postId: id }));
    }
    if (location.pathname.includes("/subject-document/")) {
      dispatch(openAnswerSubjectDocumentModal({ subjectDocumentId: id }));
    }
  };
  return (
    <Box
      width={"100%"}
      pr={2}
      pl={2}
      mt={2}
      maxHeight={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Button
        sx={{ width: "100%", color: "red", mb: 2, height: "40px" }}
        size="large"
        variant="outlined"
        color={"error"}
        onClick={openAnswerModal}
      >
        <AddIcon /> Thêm tài liệu mới
      </Button>
      <Box
        pb={2}
        maxHeight={"calc(100% - 72px)"}
        overflow={"auto"}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <MemoDocumentAnswer
          answers={answers.data}
          toggleFavorite={answers.toggleFavoriteAnswer}
        />
      </Box>
    </Box>
  );
}

export default DocumentDetailtAnswer;
