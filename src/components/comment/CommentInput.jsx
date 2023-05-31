import { Avatar, Box, IconButton, InputBase } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { red } from "@mui/material/colors";

const CommentInput = ({ add, parentCommentId, reply = false }) => {
  const { user } = useSelector((state) => state.authentication);
  const [comment, setComment] = useState("");
  return (
    <Box
      p={1.5}
      borderRadius={"30px"}
      sx={{ backgroundColor: !reply && "#F2F2F2" }}
      display={"flex"}
      alignItems={"center"}
      height={reply ? "45px" : "50px"}
    >
      <Avatar
        src={user.avatar}
        sx={{
          width: reply ? "30px" : "35px",
          height: reply ? "30px" : "35px",
          backgroundColor: `${red[500]}!important`,
        }}
      >
        {user?.lastName.substring(
          user?.lastName.lastIndexOf(" ") + 1,
          user?.lastName.lastIndexOf(" ") + 2
        )}
      </Avatar>
      <InputBase
        placeholder="Viết bình luận"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          height: "100%",
          width: "80%",
          px: 1,
          mx: 1,
          fontSize: "14px",
          borderBottom: "1px solid gray",
          "&:focus": { borderBottom: "2px solid gray" },
        }}
      />
      <IconButton
        onClick={() =>
          add(
            parentCommentId ? { comment, parentCommentId } : { comment },
            () => setComment("")
          )
        }
      >
        <SendIcon
          sx={{
            width: reply ? "20px" : "25px",
            height: reply ? "20px" : "25px",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default CommentInput;
