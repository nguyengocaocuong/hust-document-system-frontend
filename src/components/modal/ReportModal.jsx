import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeReportModal } from "../../store/modalState";
import ConfirmModal from "./ComfirmModal";
import {
  useReportContentReviewSubjectMutation,
  useReportContentSubjectDocumentMutation,
} from "../../services/SubjectService";
import { useReportContentReviewTeacherMutation } from "../../services/TeacherService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "hidden",
  width: "500px",
  backgroundColor: "white",
  borderRadius: 1,
  boxShadow: 24,
  "&:focus": { border: "none" },
};
function ReportModal({ open }) {
  const dispatch = useDispatch();
  const [reportSubjectDocumentType, setReportSubjectDocumentType] = useState(
    "CONTENT_SUBJECT_DOCUMENT"
  );
  const [message, setMessage] = useState("");
  const {
    reportModal: {
      dataModal: { type, object },
    },
  } = useSelector((state) => state.modalState);
  const closeModal = () => {
    dispatch(closeReportModal());
  };
  const getMessage = () => {
    switch (type) {
      case "CONTENT_REVIEW_TEACHER":
        return "Bạn có chắc chắn muốn báo cáo bài viết này có nội dung không phù hợp không?";
      case "CONTENT_REVIEW_SUBJECT":
        return "Bạn có chắc chắn muốn báo cáo bài viết này có nội dung không phù hợp không?";
      case "SUBJECT_DOCUMENT":
        return "Bạn có chắc chắn muốn báo cáo tài liệu này không?";
      default:
        return "";
    }
  };
  const [confirmState, setConfirmState] = useState({ open: false, item: null });
  const closeConfirmModal = () => setConfirmState({ open: false, item: null });
  const openConfirmModal = (item) => setConfirmState({ open: true, item });
  const [reportContentReviewSubject] = useReportContentReviewSubjectMutation();
  const [reportContentReviewTeacher] = useReportContentReviewTeacherMutation();
  const [reportContentSubjectDocument] =
    useReportContentSubjectDocumentMutation();

  const onReport = () => {
    let body = new FormData();
    switch (type) {
      case "CONTENT_REVIEW_SUBJECT":
        body.append("message", message);
        reportContentReviewSubject({ reviewSubjectId: object.id, body }).then(
          () => {
            closeConfirmModal();
            closeModal();
          }
        );
        return;
      case "CONTENT_REVIEW_TEACHER":
        body.append("message", message);
        reportContentReviewTeacher({ reviewTeacherId: object.id, body }).then(
          () => {
            closeConfirmModal();
            closeModal();
          }
        );
        return;
      case "SUBJECT_DOCUMENT":
        if (reportSubjectDocumentType === "CONTENT_SUBJECT_DOCUMENT") {
          body.append("message", message);
          reportContentSubjectDocument({
            subjectDocumentId: object.id,
            body,
          }).then((response) => {
            if (!response.error) {
              closeConfirmModal();
              closeModal();
            }
          });
        } else {
        }
        return;
      default:
        return "";
    }
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Box display={"flex"} alignItems={"center"} p={2} sx={{}}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            width={"calc(100% - 30px)"}
          >
            Báo cáo
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            width={"calc(100% - 30px)"}
          >
            Hãy nhập nội dung báo cáo
          </Typography>
          <Typography width={"calc(100% - 30px)"}>
            Hãy chung tay góp phần làm cho nội dung của trang web được hoàn
            thiện hơn
          </Typography>
          {(type === "CONTENT_REVIEW_SUBJECT" ||
            type === "CONTENT_REVIEW_TEACHER") && (
            <Box py={2}>
              <InputBase
                sx={{
                  width: "100%",
                  px: 2,
                  border: "2px solid #F0F0F0",
                  height: "50px",
                }}
                placeholder="Nội dung báo cáo"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>
          )}
          {type === "SUBJECT_DOCUMENT" && (
            <Stack spacing={1} pt={2}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  pb={1}
                  onClick={() =>
                    setReportSubjectDocumentType("CONTENT_SUBJECT_DOCUMENT")
                  }
                  sx={{ cursor: "pointer" }}
                >
                  Báo cáo nội dung tài liệu
                </Typography>
                <InputBase
                  sx={{
                    width: "100%",
                    px: 2,
                    border: "2px solid #F0F0F0",
                    height: "50px",
                    display:
                      reportSubjectDocumentType === "CONTENT_SUBJECT_DOCUMENT"
                        ? "flex"
                        : "none",
                    alignItems: "center",
                  }}
                  placeholder="Nội dung báo cáo"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  pb={1}
                  onClick={() =>
                    setReportSubjectDocumentType("DUPLICATE_SUBJECT_DOCUMENT")
                  }
                  sx={{ cursor: "pointer" }}
                >
                  Báo cáo tài liệu bị trùng lặp
                </Typography>
                <InputBase
                  sx={{
                    width: "100%",
                    px: 2,
                    border: "2px solid #F0F0F0",
                    height: "50px",
                    display:
                      reportSubjectDocumentType === "DUPLICATE_SUBJECT_DOCUMENT"
                        ? "flex"
                        : "none",
                    alignItems: "center",
                  }}
                  placeholder="Chèn link tài liệu"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
            </Stack>
          )}
        </Box>

        <Box width={"100%"} display={"flex"} justifyContent={"end"} p={2}>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color={"error"}
            onClick={openConfirmModal}
          >
            Báo cáo
          </Button>
        </Box>
        {confirmState.open && (
          <ConfirmModal
            message={getMessage()}
            open={confirmState.open}
            closeModal={closeConfirmModal}
            action={onReport}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ReportModal;
