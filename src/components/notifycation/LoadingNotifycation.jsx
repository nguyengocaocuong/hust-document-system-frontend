import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { formatTimeAgo } from "../../utils/ConvertDate";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { clearLoadingNotification } from "../../store/notificationState";
import { getIconForDocByFileName } from "../../utils/DocumentUtils";
import { useNavigate } from "react-router-dom";
import { toggleNotification } from "../../store/notificationState";
function LoadingNotifycation({ notifycation }) {
  const {
    notifications: { LOADING },
  } = useSelector((state) => state.notificationState);
  const dispatch = useDispatch();

  const {
    documents,
    startTime,
    status,
    subject,
    subjectDocument,
    objectType,
  } = notifycation;
  const close = () => {
    dispatch(
      clearLoadingNotification({ id: notifycation.id, preState: LOADING })
    );
    dispatch(toggleNotification(true));
  };
  const navigate = useNavigate();
  const openSubjectDocument = () => {
    navigate(`/education/subject-document/${subjectDocument.id}`);
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
            Bạn đang tải {documents.length} file tài liệu cho môn học{" "}
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
      {status === 1 && objectType === "SUBJECT_DOCUMENT" && (
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
                src={getIconForDocByFileName(subjectDocument.document.name)}
                alt={subjectDocument.document.name}
              />
              <Box display={"flex"} alignItems={"center"} overflow={"hidden"}>
                <Box maxWidth={"100%"}>
                  <Typography fontWeight={"bold"} maxWidth={"100%"} noWrap>
                    {subjectDocument.document.name}
                  </Typography>
                  <Typography>
                    {formatTimeAgo(subjectDocument.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} pt={1}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", mr: 1 }}
              onClick={openSubjectDocument}
            >
              Xem tài liệu
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default LoadingNotifycation;
