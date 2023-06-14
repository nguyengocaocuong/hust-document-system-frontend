import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PropperMenu from "../PropperMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentInput from "./CommentInput";
import CreateIcon from "@mui/icons-material/Create";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import { openReportModal } from "../../store/modalState";

const CommentItem = ({
  comment,
  add,
  clear,
  childComment = false,
  mainColor = "#F2F2F2",
}) => {
  const [isReply, setReply] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const report = () => {
    dispatch(openReportModal({id:1}));
  };
  const actions = () =>
    user.id === comment.owner.id
      ? [
          {
            Icon: CreateIcon,
            label: "Chỉnh sửa",
            action: () => {},
          },
          {
            Icon: FlagIcon,
            label: "Báo cáo",
            action: report,
          },
          {
            Icon: DeleteIcon,
            label: "Xóa bình luận",
            action: () => clear(comment.id),
          },
        ]
      : [];

  return (
    <Box>
      <Box
        borderRadius={childComment ? 0 : 1}
        display={"flex"}
        sx={{
          "&:hover": { backgroundColor: mainColor },
          backgroundColor: isReply && mainColor,
          borderLeft: childComment ? "2px solid gray" : "",
        }}
        p={1}
        pl={1}
        ml={childComment ? 4 : 0}
      >
        <Avatar
          src={comment.owner?.avatar}
          sx={{
            width: childComment ? "30px" : "35px",
            height: childComment ? "30px" : "35px",
            mr: 1,
            bgcolor: red[500],
          }}
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
                {`${comment.owner?.firstName} ${comment.owner?.lastName}`}
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
              <PropperMenu action={actions()} />
            </Box>
          </Box>
          {isReply && (
            <CommentInput add={add} parentCommentId={comment.id} reply={true} />
          )}
        </Box>
      </Box>
      {comment?.childComment?.length > 0 && (
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
