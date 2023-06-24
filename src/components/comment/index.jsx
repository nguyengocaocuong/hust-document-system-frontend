import React from "react";
import CommentInput from "./CommentInput";
import { Box, Stack } from "@mui/material";
import CommentItem from "./CommentItem";

function Comment({ comments, mainColor = "#F2F2F2" }) {
  return (
    <Box
      width={"100%"}
      p={2}
      maxHeight={"100%"}
      overflow={"auto"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <CommentInput add={comments.add} mainColor={mainColor} />
      <Stack spacing={0.5} mt={2}>
        {comments.data.map((comment, index) => (
          <CommentItem
            mainColor={mainColor}
            comment={comment}
            key={index}
            add={comments.add}
            edit={comments.edit}
            clear={comments.clear}
            isOwner={comments.isOwner}
            hidden={comments.hidden}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Comment;
