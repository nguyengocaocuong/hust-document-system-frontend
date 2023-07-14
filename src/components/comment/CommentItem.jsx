import {
  Avatar,
  Box,
  Button,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropperMenu from "../PropperMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentInput from "./CommentInput";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { formatTimeAgo } from "../../utils/ConvertDate";
const CommentItem = ({
  comment,
  add,
  edit,
  clear,
  isOwner = false,
  hidden,
  childComment = false,
  mainColor = "#F2F2F2",
}) => {
  const [isReply, setReply] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const [value, setValue] = useState({
    isShow: false,
    comment: comment.comment || "",
  });
  const onEdit = () => {
    setValue({ comment: comment.comment, isShow: true });
  };
  const onChangeComment = (e) => {
    setValue({ isShow: true, comment: e.target.value });
  };
  const closeEdit = () => {
    setValue({ comment: comment.comment, isShow: false });
  };
  const actions = () => {
    let action = [];
    if (isOwner && user.id !== comment.owner.id)
      action.push({
        Icon: VisibilityOffIcon,
        label: "Ẩn bình luận",
        action: () => hidden(comment.id),
      });
    if (user.id === comment.owner.id) {
      action.push({
        Icon: CreateIcon,
        label: "Chỉnh sửa",
        action: onEdit,
      });
      action.push({
        Icon: DeleteIcon,
        label: "Xóa bình luận",
        action: () => clear(comment.id),
      });
    }
    return action;
  };
  return (
    <Box>
      <Box
        borderRadius={childComment ? 0 : 1}
        display={"flex"}
        sx={{
          "&:hover": { backgroundColor: mainColor },
          backgroundColor: isReply || (value.isShow && mainColor),
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
              {value.isShow ? (
                <Box width={"100%"}>
                  <InputBase
                    value={value.comment}
                    sx={{
                      backgroundColor: "white",
                      px: 1,
                      py: 0.5,
                      width: "100%",
                      borderRadius: 1,
                      boxShadow: 2,
                    }}
                    onChange={onChangeComment}
                  />
                  <Box display={"flex"} justifyContent={"end"}>
                    <Stack spacing={1} direction={"row"} py={0.5}>
                      <Button
                        color="primary"
                        sx={{ textTransform: "none" }}
                        variant="outlined"
                        onClick={() =>
                          edit(
                            { id: comment.id, comment: value.comment },
                            closeEdit
                          )
                        }
                      >
                        Cập nhật
                      </Button>
                      <Button
                        color="error"
                        sx={{ textTransform: "none" }}
                        variant="contained"
                        onClick={() => setValue({ comment: "", isShow: false })}
                      >
                        Hủy bỏ
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              ) : (
                <Typography fontSize={childComment ? "13.5px" : "15px"}>
                  {comment.comment}
                </Typography>
              )}
              <Typography fontSize={childComment ? "11px" : "12px"}>
                {formatTimeAgo(comment.createdAt)}
              </Typography>
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
            <CommentInput
              add={(data, close) =>
                add(data, () => {
                  close();
                  setReply(false);
                })
              }
              parentCommentId={comment.id}
              reply={true}
            />
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
              hidden={hidden}
              isOwner={isOwner}
              edit={edit}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CommentItem;
