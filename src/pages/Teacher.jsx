import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useParams } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useGetAllTeacherQuery } from "../services/AdminTeacherService";
import TeacherDetail from "./TeacherDetail";
const headers = [
  { title: "", width: "55px" },
  { title: "Tên giảng viên", width: "13%" },
  { title: "Email trường", width: "17%" },
  { title: "Email cá nhân", width: "17%" },
  { title: "Giới thiệu", width: "20%" },
  { title: "Review", width: "7%" },
  { title: "", width: "15%" },
];

function Teacher() {
  const { id } = useParams();
  const { data: teachers = [] } = useGetAllTeacherQuery();
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
      <Box width={"55px"} p={1} height={"100%"}>
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
            <IconButton>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xem chi tiết"}>
            <IconButton>
              <RemoveRedEyeIcon
                color={"success"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xóa môn học"}>
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
  return id ? (
    <TeacherDetail />
  ) : (
    <Box height={"100%"} overflow={"auto"}>
      <Typography variant="h3" color={"text.primary"} height={"60px"} p={2}>
        Danh sách giảng viên
      </Typography>
      <Box p={2} height={"calc(100% - 60px)"}>
        <Paper elevation={3} sx={{ height: "100%" }}>
          <Table
            headers={headers}
            items={teachers}
            renderItem={renderItem}
            pageSize={10}
            itemHeight={55}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Teacher;
