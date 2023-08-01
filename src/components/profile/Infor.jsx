import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PropperMenu from "../PropperMenu";
import BoxFull from "../BoxFull";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Infor = () => {
  const actions = () => {
    let action = [
      {
        Icon: EditIcon,
        label: "Chỉnh sửa",
        action: () => {},
      },
      {
        Icon: DeleteIcon,
        label: "Xóa",
        action: () => {},
      },
    ];
    return action;
  };

  return (
    <BoxFull p={2} minHeight={"100%"}>
      <Stack
        spacing={2}
        p={2}
        borderRadius={1}
        boxShadow={1}
        border={"1px solid #0288d1"}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          Thông tin người dùng
        </Typography>
        <Divider />
        <Stack spacing={0}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <AccountCircleIcon
                style={{ width: "30px", height: "30px", color: " #007bff" }}
              />
              <Typography variant="h4" px={2}>
                Tên người dùng : <strong>Nguyễn Ngô Cao Cường</strong>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <EmailIcon
                style={{ width: "30px", height: "30px", color: "#17a2b8" }}
              />
              <Typography variant="h4" px={2}>
                Địa chỉ email : <strong>cuong.nnc184055@sis.hust.edu.vn</strong>
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <PhoneIcon
                style={{ width: "30px", height: "30px", color: "#28a745" }}
              />
              <Typography variant="h4" px={2}>
                Số điện thoại : <strong>0818988577</strong>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <FacebookIcon
                style={{ width: "30px", height: "30px", color: "#3b5998" }}
              />
              <Typography variant="h4" px={2}>
                Facebook :{" "}
                <a href="https://www.facebook.com/Nguyenngocaocuong">
                  <strong>https://www.facebook.com/Nguyenngocaocuong</strong>
                </a>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <InstagramIcon
                style={{ width: "30px", height: "30px", color: " #e4405f" }}
              />
              <Typography variant="h4" px={2}>
                Instagram :{" "}
                <a href="https://www.instagram.com/Nguyenngocaocuong">
                  <strong>https://www.instagram.com/Nguyenngocaocuong</strong>
                </a>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"}>
              <TwitterIcon
                style={{ width: "30px", height: "30px", color: "#1da1f2" }}
              />
              <Typography variant="h4" px={2}>
                Twitter :{" "}
                <a href="https://www.instagram.com/Nguyenngocaocuong">
                  <strong>https://www.instagram.com/Nguyenngocaocuong</strong>
                </a>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
        </Stack>
      </Stack>
    </BoxFull>
  );
};

export default Infor;
