import React from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "../components/Table";
import { useGetAllUserQuery } from "../services/AdminUserService";
import { formatTimeAgo } from "../utils/ConvertDate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOffIcon from "@mui/icons-material/EditOff";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const headers = [
  { title: "", width: "30px" },
  { title: "Avatar", width: "60px" },
  { title: "Tên", width: "15%" },
  { title: "Email", width: "18%" },
  { title: "Ngày tham gia", width: "10%" },
  { title: "Trạng thái", width: "9%" },
  { title: "Bài đăng", width: "7%" },
  { title: "Tài liệu", width: "7%" },
  { title: "", width: "18%" },
];
function User() {
  const { data: users = [] } = useGetAllUserQuery();

  const previewUser = (item) => {
    alert("view user");
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
      onClick={() => previewUser(item)}
    >
      <Box width={"30px"}>
        <Typography fontWeight={"bold"}>#{item.id}</Typography>
      </Box>
      <Box width={"60px"}>
        <Avatar alt="" src={item.avatar} />
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "15%" }}
        color={"primary.main"}
      >
        {`${item.firstName} ${item.lastName}`}
      </Typography>
      <Typography sx={{ fontWeight: "bold", width: "18%" }}>
        {item.email}
      </Typography>
      <Typography width={"10%"} noWrap>
        {formatTimeAgo(item.createdAt)}
      </Typography>
      <Box width={"9%"}>
        <Chip
          label={item.enable ? "Đã kích hoạt" : "Chưa kích hoạt"}
          color={item.enable ? "success" : "warning"}
        />
      </Box>
      <Typography sx={{ fontSize: "13px" }} width={"7%"}>
        10 bài đăng
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"7%"}>
        32 tài liệu
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
          {!item.enable && (
            <Tooltip title={"Kích hoạt"}>
              <IconButton>
                <ToggleOffIcon
                  color={"primary"}
                  sx={{ width: "18px", height: "18px" }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Chỉnh sửa thông tin"}>
            <IconButton>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Xem tài liệu"}>
            <IconButton>
              <RemoveRedEyeIcon
                color={"success"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box height={"100%"} overflow={"auto"} bgcolor={"white"}>
      <Typography variant="h3" color={"text.secondary"} height={"50px"} p={2}>
        Danh sách người dùng
      </Typography>
      <Table
        headers={headers}
        items={users}
        renderItem={renderItem}
        pageSize={10}
        itemHeight={60.5}
      />
    </Box>
  );
}

export default User;
