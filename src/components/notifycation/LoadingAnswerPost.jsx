import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import {
  clearLoadingNotification,
  toggleNotification,
} from "../../store/notificationState";
import { formatTimeAgo } from "../../utils/ConvertDate";
import { getIconForDocByFileName } from "../../utils/DocumentUtils";
import CloseIcon from "@mui/icons-material/Close";

function LoadingAnswerPost({ notifycation }) {
  const {
    notifications: { LOADING },
  } = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();

  const { documents, startTime, status, subject, answerPost } =
    notifycation;
  const close = () => {
    dispatch(
      clearLoadingNotification({ id: notifycation.id, preState: LOADING })
    );
    dispatch(toggleNotification(true));
  };
  const openAnswerPost = () => {
    close();
  };
  return (
    <Box
      p={2}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={"16px"}>
            Bạn đang tải {documents.length} file trả lời cho bài viết{" "}
            <strong>{subject.name}</strong>
          </Typography>
          <Typography>{formatTimeAgo(startTime)}</Typography>
        </Box>
        <Box>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        display={"flex"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
        sx={{
          color: status === 0 ? "infor" : status === 1 ? "green" : "#E57373",
        }}
      >
        <IconButton>
          {" "}
          {status === 0 ? (
            <FileUploadIcon />
          ) : status === 1 ? (
            <DownloadDoneIcon color={"success"} />
          ) : (
            <RunningWithErrorsIcon color="error" />
          )}
        </IconButton>
        <Box width={"calc(100% - 30px)"}>
          {status === 0 ? (
            <LinearProgress color="success" />
          ) : status === 1 ? (
            <Typography>Đăng tài liệu thành công</Typography>
          ) : (
            <Typography>Lỗi khi tải tài liệu lên</Typography>
          )}
        </Box>
      </Box>
      {status === 1 && (
        <Box px={2}>
          <Box display={"flex"} pt={1} pb={0.5} width={"100%"}>
            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              sx={{ boxShadow: 2, p: 1, borderRadius: 2 }}
            >
              <img
                style={{ width: "40px", height: "40px" }}
                src={getIconForDocByFileName(answerPost?.document.name)}
                alt={answerPost?.document.name}
              />
              <Box display={"flex"} alignItems={"center"} overflow={"hidden"}>
                <Box maxWidth={"100%"}>
                  <Typography fontWeight={"bold"} maxWidth={"100%"} noWrap>
                    {answerPost?.document.name}
                  </Typography>
                  <Typography>
                    {formatTimeAgo(answerPost?.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} pt={1}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", mr: 1 }}
              onClick={openAnswerPost}
            >
              Xem đáp án
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default LoadingAnswerPost;
