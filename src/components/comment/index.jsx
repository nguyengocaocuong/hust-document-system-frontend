import React from "react";
import CommentInput from "./CommentInput";
import { Box, Stack } from "@mui/material";
import CommentItem from "./CommentItem";

function Comment({ comments}) {
  return (
    <Box width={"100%"} p={2} maxHeight={"100%"} overflow={"auto"}>
      <CommentInput add={comments.add} />
      <Stack spacing={0.5} mt={2}>
        {comments.data.map((comment, index) => (
          <CommentItem
            comment={comment}
            key={index}
            add={comments.add}
            edit={comments.edit}
            clear={comments.clear}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Comment;
