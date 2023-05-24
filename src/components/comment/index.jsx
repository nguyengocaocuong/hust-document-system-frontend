import React from "react";
import CommentInput from "./CommentInput";
import { Box, Stack } from "@mui/material";
import CommentItem from "./CommentItem";
import {
  useCommentSubjectDocumentMutation,
  useDeleteCommentSubjectDocumentMutation,
  useGetAllCommentSubjectDocumentQuery,
} from "../../services/SubjectService";
import { convertJsonToFormData } from "../../utils/ConvertData";
function Comment({ type, subjectDocumentId, handleEdit }) {
  const [commentSubjectDocument] = useCommentSubjectDocumentMutation();
  const [deleteCommentSubjectDocument] =
    useDeleteCommentSubjectDocumentMutation();
  const { data = [], refetch } =
    useGetAllCommentSubjectDocumentQuery(subjectDocumentId);
  const handleSubmit = (data, reset) => {
    switch (type) {
      case "SUBJECT_DOCUMENT":
        commentSubjectDocument(
          convertJsonToFormData({ subjectDocumentId, ...data })
        ).then((response) => {
          refetch();
          reset();
        });
        break;
      default: break;
    }
  };
  const handleClear = (id) => {
    switch (type) {
      case "SUBJECT_DOCUMENT":
        deleteCommentSubjectDocument(id);
        break;
      default: break;
    }
  };
  return (
    <Box width={"100%"} p={2} maxHeight={"100%"} overflow={"auto"}>
      <CommentInput handleSubmit={handleSubmit} />
      <Stack spacing={0.5} mt={2}>
        {data.map((comment, index) => (
          <CommentItem
            comment={comment}
            key={index}
            handleEdit={handleEdit}
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Comment;
