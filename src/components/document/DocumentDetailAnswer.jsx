import { Box, Button, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import DocumentAnswer from "./DocumentAnswer";
import AddIcon from "@mui/icons-material/Add";
import AnswerModal from "../modal/AnswerModal";
const MemoDocumentAnswer = memo(({ answers }) => (
  <Stack spacing={1}>
    {answers.map((answer, index) => (
      <DocumentAnswer key={index} answer={answer} />
    ))}
  </Stack>
));
function DocumentDetailtAnswer({ answers }) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
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
        onClick={openModal}
      >
        <AddIcon /> Thêm tài liệu mới
      </Button>
      <Box
        pb={2}
        maxHeight={"calc(100% - 72px)"}
        overflow={"auto"}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <MemoDocumentAnswer answers={answers.data} />
      </Box>
      <AnswerModal
        open={open}
        closeModal={closeModal}
        addAnswer={answers.add}
      />
    </Box>
  );
}

export default DocumentDetailtAnswer;
