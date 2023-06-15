import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOffIcon from "@mui/icons-material/EditOff";
import {
  useDeleteSubjectMutation,
  useGetAllSubjectQuery,
} from "../services/AdminSubjectService";
import { useNavigate, useParams } from "react-router-dom";
import SubjectDetail from "./SubjectDetail";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";
import { openUpdateSubjectModal } from "../store/modalState";
const headers = [
  { title: "", width: "30px" },
  { title: "Tên môn học", width: "15%" },
  { title: "Mã học phần", width: "15%" },
  { title: "Mô tả", width: "25%" },
  { title: "Review", width: "10%" },
  { title: "Tài liệu", width: "10%" },
  { title: "Yêu thích", width: "10%" },
  { title: "", width: "18%" },
];

function Subject() {
  const message = `Bạn có chắc chắn muốn xóa môn học này không, nếu bạn xóa mọi tài liệu liên quan đến môn học sẽ bị xóa theo`;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: subjects = [], refetch } = useGetAllSubjectQuery();
  const editSubject = (item) => {
    dispatch(openUpdateSubjectModal(item.subject));
  };
  const view = (item) => {
    navigate(`/subject/${item.subject.id}`);
  };

  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item: item.subject });

  const [deleteSubject] = useDeleteSubjectMutation();
  const onDelete = (type) => {
    if (type) deleteSubject(open.item.id).then(() => refetch());
    closeModal();
  };
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"55px"}
      justifyContent={"space-between"}
    >
      <Box width={"30px"}>
        <Typography fontWeight={"bold"}>#{item.subject.id}</Typography>
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "15%" }}
        color={"primary.main"}
      >
        {item.subject.name}
      </Typography>
      <Typography sx={{ fontWeight: "bold", width: "15%" }}>
        {item.subject.subjectCode}
      </Typography>
      <Typography sx={{ fontWeight: "bold", width: "25%" }}>
        {item.subject.description}
      </Typography>
      <Typography width={"10%"} noWrap>
        {item.reviewSubjectTotal} bài viết
      </Typography>
      <Typography width={"10%"} noWrap>
        {item.subjectDocumentTotal} tài liệu
      </Typography>
      <Typography width={"10%"} noWrap>
        {item.favoriteSubjectTotal} yêu thích
      </Typography>
      <Box
        width={"18%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <Tooltip title={"Chỉnh sửa môn học"}>
            <IconButton onClick={() => editSubject(item)}>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xem chi tiết"}>
            <IconButton onClick={() => view(item)}>
              <RemoveRedEyeIcon
                color={"success"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa môn học"}>
            <IconButton onClick={() => openModal(item)}>
              <DeleteOutlineOutlinedIcon
                color={"error"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box height={"100%"} overflow={"auto"}>
      <Typography variant="h3" color={"text.primary"} height={"60px"} p={2}>
        Danh sách môn học trong hệ thống
      </Typography>
      <Box p={2} height={"calc(100% - 60px)"}>
        {id ? (
          <SubjectDetail />
        ) : (
          <Paper elevation={3} sx={{ height: "100%" }}>
            <Table
              headers={headers}
              items={subjects}
              renderItem={renderItem}
              pageSize={10}
              itemHeight={55}
            />
          </Paper>
        )}
      </Box>
      {open.open && (
        <ConfirmModal
          message={message}
          open={open.open}
          closeModal={closeModal}
          action={onDelete}
        />
      )}
    </Box>
  );
}

export default Subject;
