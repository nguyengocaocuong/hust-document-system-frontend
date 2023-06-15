import React from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "../components/Table";
import { useGetAllUserQuery } from "../services/AdminUserService";
import { formatTimeAgo } from "../utils/ConvertDate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const headers = [
  { title: "", width: "30px" },
  { title: "Avatar", width: "55px" },
  { title: "Tên", width: "15%" },
  { title: "Email", width: "18%" },
  { title: "Ngày tham gia", width: "10%" },
  { title: "Trạng thái", width: "9%" },
  { title: "Bài đăng", width: "7%" },
  { title: "Tài liệu", width: "7%" },
  { title: "", width: "18%" },
];
function ListUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: users = [] } = useGetAllUserQuery();

  const previewUser = (item) => {
    navigate(`/users/list-user/${item.id}`);
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
      onClick={() => previewUser(item)}
    >
      <Box width={"30px"}>
        <Typography fontWeight={"bold"}>#{item.id}</Typography>
      </Box>
      <Box width={"55px"}>
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
    <Box p={2} height={"calc(100% - 60px)"} overflow={"auto"}>
      {id ? (
        <UserInfo />
      ) : (
        <Paper elevation={3} sx={{ height: "100%" }}>
          <Table
            headers={headers}
            items={users}
            renderItem={renderItem}
            pageSize={10}
            itemHeight={55}
          />
        </Paper>
      )}
    </Box>
  );
}

export default ListUser;
