import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Table from "../components/Table";
import EditOffIcon from "@mui/icons-material/EditOff";
import {
  useDeleteSubjectMutation,
  useGetAllSubjectQuery,
} from "../services/AdminSubjectService";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";
import { openSubjectModal, openUpdateSubjectModal } from "../store/modalState";
import AddBoxIcon from "@mui/icons-material/AddBox";
const headers = [
  { title: "", width: "30px" },
  { title: "Mã học phần", width: "15%" },
  { title: "Tên môn học", width: "30%" },
  { title: "Tên tiếng anh", width: "30%" },
  { title: "Review", width: "10%" },
  { title: "Tài liệu", width: "10%" },
  { title: "Yêu thích", width: "10%" },
  { title: "", width: "18%" },
];

function Subject() {
  const message = `Bạn có chắc chắn muốn xóa môn học này không, nếu bạn xóa mọi tài liệu liên quan đến môn học sẽ bị xóa theo`;
  const dispatch = useDispatch();
  const { data: subjects = [], refetch } = useGetAllSubjectQuery();
  const editSubject = (item) => {
    dispatch(openUpdateSubjectModal(item.subject));
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
      height={"60px"}
      justifyContent={"space-between"}
    >
      <Box width={"30px"}>
        <Typography fontWeight={"bold"}>#{item.subject.id}</Typography>
      </Box>
      <Typography sx={{ fontWeight: "bold", width: "15%" }}>
        {item.subject.subjectCode}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", width: "30%" }}
        color={"primary.main"}
      >
        {item.subject.name}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", width: "30%" }}
        color={"primary.main"}
      >
        {item.subject.enName}
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

  const addSubject = () => {
    dispatch(openSubjectModal());
  };
  return (
    <Box height={"100%"} overflow={"auto"} bgcolor={"white"}>
      <Stack
        direction={"row"}
        spacing={2}
        display={"flex"}
        alignItems={"center"}
        px={2}
        height={"50px"}
      >
        <Typography variant="h3" color={"text.secondary"}>
          Danh sách môn học trong hệ thống
        </Typography>
        <Button onClick={addSubject} variant="outlined" color="warning">
          <Stack spacing={0.5} direction={"row"}>
            <Typography>Thêm môn học</Typography>
            <AddBoxIcon />
          </Stack>
        </Button>
      </Stack>
      <Box height={"calc(100% - 50px)"}>
        <Table
          headers={headers}
          items={subjects}
          renderItem={renderItem}
          pageSize={10}
          itemHeight={60.5}
        />
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
