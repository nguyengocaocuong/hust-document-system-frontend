import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOffIcon from "@mui/icons-material/EditOff";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  useDeleteTeacherMutation,
  useGetAllTeacherQuery,
} from "../services/AdminTeacherService";
import { useDispatch } from "react-redux";
import { openUpdateTeacherModal } from "../store/modalState";
import { useState } from "react";
import ConfirmModal from "../components/modal/ComfirmModal";
const headers = [
  { title: "", width: "60px" },
  { title: "Tên giảng viên", width: "13%" },
  { title: "Email trường", width: "17%" },
  { title: "Email cá nhân", width: "17%" },
  { title: "Giới thiệu", width: "20%" },
  { title: "Review", width: "7%" },
  { title: "", width: "15%" },
];

function Teacher() {
  const message = `Bạn có chắc chắn muốn xóa giảng viên này không, nếu bạn xóa mọi bài viết liên quan giảng viên học sẽ bị xóa theo`;
  const dispatch = useDispatch();
  const { data: teachers = [], refetch } = useGetAllTeacherQuery();
  const editTeacher = (item) => {
    dispatch(openUpdateTeacherModal(item.teacher));
  };
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item: item.teacher });

  const [deleteSubject] = useDeleteTeacherMutation();
  const onDelete = (type) => {
    if (type) deleteSubject(open.item.id).then(() => refetch());
    closeModal();
  };

  const view = (item) => {
    alert("view teacher");
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
      <Box width={"60px"} p={1} height={"100%"}>
        <img
          src={item.teacher.avatar}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "13%" }}
        color={"primary.main"}
      >
        {item.teacher.name}
      </Typography>

      <Typography
        sx={{ fontWeight: "bold", width: "17%" }}
        color={"primary.main"}
      >
        {item.teacher.emailHust}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", width: "17%" }}
        color={"primary.main"}
      >
        {item.teacher.emailPrivate}
      </Typography>

      <Typography
        sx={{
          fontWeight: "bold",
          width: "20%",
          height: "100%",
          overflow: "hidden",
          py: 1,
        }}
      >
        {item.teacher.description}
      </Typography>
      <Typography width={"7%"} noWrap>
        {item.reviewTeacherTotal} bài viết
      </Typography>
      <Box
        width={"15%"}
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
          <Tooltip title={"Chỉnh sửa tài liệu"}>
            <IconButton onClick={() => editTeacher(item)}>
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
          <Tooltip title={"Xóa môn học"} onClick={() => openModal(item)}>
            <IconButton>
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
    <Box height={"100%"} overflow={"hidden"} bgcolor={"white"}>
      <Typography variant="h3" color={"text.primary"} height={"50px"} p={2}>
        Danh sách giảng viên
      </Typography>
      <Box height={"calc(100% - 50px)"}>
        <Table
          headers={headers}
          items={teachers}
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

export default Teacher;
