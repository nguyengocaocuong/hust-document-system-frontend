import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PropperMenu from "../PropperMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentInput from "./CommentInput";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
const getAction = (comment, user, clear) => {
  const actions = [
    {
      icon: <CreateIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Chỉnh sửa</Typography>,
      handle: (close) => {
        close();
      },
    },
    {
      icon: <DeleteIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Xóa bình luận</Typography>,
      handle: (close) => {
        clear(comment.id);
        close();
      },
    },
  ];
  return user.id === comment.owner.id ? actions : [actions[0]];
};
const CommentItem = ({ comment, add, clear, childComment = false }) => {
  const [isReply, setReply] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  return (
    <Box>
      <Box
        borderRadius={childComment ? 0 : 1}
        display={"flex"}
        sx={{
          "&:hover": { backgroundColor: "#F2F2F2" },
          backgroundColor: isReply && "#F2F2F2",
          borderLeft: childComment ? "2px solid gray" : "",
        }}
        p={1}
        pl={1}
        ml={childComment ? 4 : 0}
      >
        <Avatar
          src={comment.owner?.avatar}
          sx={{ width: "35px", height: "35px", mr: 1}}
        >
          {comment.owner?.lastName.substring(
            comment.owner?.lastName.lastIndexOf(" ") + 1,
            comment.owner?.lastName.lastIndexOf(" ") + 2
          )}
        </Avatar>
        <Box width={"100%"}>
          <Box display={"flex"} width={"100%"}>
            <Box width={"calc(100% - 50px)"}>
              <Typography fontWeight={700} fontSize={"13px"}>
                {comment.owner?.lastName}
              </Typography>
              <Typography>{comment.comment}</Typography>
              <Box display={"flex"} alignItems={"center"}>
                <Button
                  sx={{ textTransform: "none", mr: 1.5, color: "inherit" }}
                >
                  {" "}
                  <FavoriteIcon
                    sx={{ width: "20px", height: "20px", mr: 0.5 }}
                  />
                  <Typography
                    color={"text.secondary"}
                    fontWeight={"bold"}
                    fontSize={"11px"}
                  >
                    Thích
                  </Typography>
                </Button>
                {!childComment && (
                  <Button
                    sx={{ textTransform: "none", mr: 1.5, color: "inherit" }}
                    onClick={() => setReply(!isReply)}
                  >
                    {" "}
                    <ReplyIcon
                      sx={{ width: "20px", height: "20px", mr: 0.5 }}
                    />
                    <Typography
                      color={"text.secondary"}
                      fontWeight={"bold"}
                      fontSize={"11px"}
                      lineHeight={"20px"}
                    >
                      Trả lời
                    </Typography>
                  </Button>
                )}
              </Box>
            </Box>
            <Box>
              <PropperMenu action={getAction(comment, user, clear)} />
            </Box>
          </Box>
          {isReply && (
            <CommentInput add={add} parentCommentId={comment.id} reply={true} />
          )}
        </Box>
      </Box>
      {comment?.childComment.length > 0 && (
        <Stack>
          {comment.childComment.map((comment, index) => (
            <CommentItem
              comment={comment}
              key={index}
              childComment
              clear={clear}
              add={add}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CommentItem;
