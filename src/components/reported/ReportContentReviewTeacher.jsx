import {
  Box,
  Chip,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Flag } from "@mui/icons-material";
import Owner from "../Owner";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import {
  useDeleteReportContentReviewTeacherMutation,
  useUpdateReportContentReviewTeacherMutation,
} from "../../services/TeacherService";
function ReportContentReviewTeacher({ report }) {
  const [onEdit, setOnEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(report.message);
  const [message, setMessage] = useState(report.message);
  const [updateReportContentReviewTeacher] =
    useUpdateReportContentReviewTeacherMutation();
  const [deleteReportContentReviewTeacher] =
    useDeleteReportContentReviewTeacherMutation();
  const onUpdate = () => {
    const formData = new FormData();
    formData.append("message", newMessage);
    updateReportContentReviewTeacher({
      reviewTeacherId: report.reviewTeacher.id,
      reportContentReviewTeacherId: report.id,
      body: formData,
    }).then((response) => {
      if (!response.error) {
        setOnEdit(false);
        setMessage(newMessage);
      }
    });
  };
  const onDelete = () => {
    deleteReportContentReviewTeacher({
      reviewTeacherId: report.reviewTeacher.id,
      reportContentReviewTeacherId: report.id,
    }).then((response) => {
      if (!response.error) {
      }
    });
  };
  return (
    <Box
      width={"100%"}
      height={"280px"}
      sx={{
        backgroundColor: "#F0F0F0",
        "&:hover": { boxShadow: 4 },
        cursor: "pointer",
        transition: "box-shadow 0.4s",
      }}
      borderRadius={1}
      overflow={"hidden"}
    >
      <Owner
        owner={report.owner}
        createdAt={report.createdAt}
        listItem={[
          <Chip
            key={1}
            color="error"
            label={"Báo cáo nội dung "}
            icon={<Flag />}
          />,
        ]}
      />
      <Box
        p={1}
        pt={0}
        height={"150px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        overflow={"hidden"}
      >
        <Box
          width={"100%"}
          height={"100%"}
          dangerouslySetInnerHTML={{ __html: report?.reviewTeacher.review }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 1 }}
        ></Box>
      </Box>
      <Divider />
      <Box
        height={"55px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
      >
        <Box display={"flex"} alignItems={"center"} width={"calc(100% - 90px)"}>
          {onEdit ? (
            <Box width={"100%"} position={"relative"}>
              <InputBase
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  px: 1.5,
                  py: 0.5,
                  pr: 4,
                  borderRadius: 3,
                  boxShadow: 1,
                }}
              />
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => {
                  setOnEdit(false);
                  setNewMessage(report.message);
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          ) : (
            <Chip label={message} sx={{ maxWidth: "100%" }} color="warning" />
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          {onEdit ? (
            <Tooltip title="Lưu">
              <IconButton
                disabled={message === newMessage || newMessage === ""}
                color="success"
                onClick={onUpdate}
              >
                <DoneIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Chỉnh sửa">
              <IconButton color="success" onClick={() => setOnEdit(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Loại bỏ báo cáo">
            <IconButton color="error" onClick={onDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportContentReviewTeacher;
