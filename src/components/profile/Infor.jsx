import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
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
import BoxFull from "../BoxFull";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import {
  useUpdateAccountInfoMutation,
  useUpdateUserInfoMutation,
} from "../../services/UserService";
const Infor = () => {
  const [onEditUserInfo, setOnEditUserInfo] = useState(false);
  const [onEditAccountInfo, setOnEditAccountInfo] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const [newUserInfo, setUserInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    address: user.address || "",
    facebookUrl: user.facebookUrl || "",
    twitterUrl: user.twitterUrl || "",
    instagramUrl: user.instagramUrl || "",
    phoneNumber: user.phoneNumber || "",
  });
  const [newAccountInfo, setAccountInfo] = useState({
    newPassword: "",
    oldPassword: "",
    username: user.username || "",
  });

  const handleChangeNewUserInfo = (e) => {
    setUserInfo((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeNewAccountInfo = (e) => {
    setAccountInfo((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const onUpdateUserInfo = () => {
    const formData = new FormData();
    formData.append("firstName", newUserInfo.firstName);
    formData.append("lastName", newUserInfo.lastName);
    formData.append("address", newUserInfo.address);
    formData.append("facebookUrl", newUserInfo.facebookUrl);
    formData.append("twitterUrl", newUserInfo.twitterUrl);
    formData.append("instagramUrl", newUserInfo.instagramUrl);
    formData.append("phoneNumber", newUserInfo.phoneNumber);
    updateUserInfo(formData).then((response) => {
      if (!response.error) {
        setOnEditUserInfo(false);
      }
    });
  };
  const [updateAccountInfo] = useUpdateAccountInfoMutation();
  const onUpdateAccountInfo = () => {
    const formData = new FormData();
    formData.append("newPassword", newAccountInfo.newPassword);
    formData.append("oldPassword", newAccountInfo.oldPassword);
    formData.append("username", newAccountInfo.username);
    updateAccountInfo(formData).then((response) => {
      if (!response.error) {
        setOnEditAccountInfo(false);
      }
    });
  };

  return (
    <BoxFull p={2} minHeight={"100%"}>
      <Stack
        spacing={2}
        p={2}
        borderRadius={1}
        boxShadow={1}
        border={"1px solid #0288d1"}
        width={"100%"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pr={2}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Thông tin người dùng
          </Typography>
          <IconButton
            color="primary"
            onClick={() => setOnEditUserInfo((preState) => !preState)}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={0} width={"100%"}>
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
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <AccountCircleIcon
                style={{ width: "30px", height: "30px", color: " #007bff" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Tên người dùng :</span>{" "}
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      value={newUserInfo.firstName}
                      placeholder="Nhập họ của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="firstName"
                      onChange={handleChangeNewUserInfo}
                    />
                    <InputBase
                      value={newUserInfo.lastName}
                      placeholder="Nhập tên của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="lastName"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <strong
                    style={{ paddingLeft: "12px" }}
                  >{`${user.firstName} ${user.lastName}`}</strong>
                )}
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
            width={"100%"}
            py={1}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <PhoneIcon
                style={{ width: "30px", height: "30px", color: "#28a745" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Số điện thoại :</span>
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      type="phoneNumber"
                      value={newUserInfo.phoneNumber}
                      placeholder="Nhập số điện thoại của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="phoneNumber"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <strong style={{ paddingLeft: "16px" }}>
                    {user.phoneNumber}
                  </strong>
                )}
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
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <FacebookIcon
                style={{ width: "30px", height: "30px", color: "#3b5998" }}
              />
              <Typography
                width={"100%"}
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
              >
                <span style={{ width: "180px" }}>Facebook :</span>{" "}
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      value={newUserInfo.facebookUrl}
                      placeholder="Nhập địa chỉ facebook của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="facebookUrl"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <a href={user.facebookUrl}>
                    <strong style={{ paddingLeft: "16px" }}>
                      {user.facebookUrl}
                    </strong>
                  </a>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            width={"100%"}
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
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <InstagramIcon
                style={{ width: "30px", height: "30px", color: " #e4405f" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Instagram :</span>{" "}
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      value={newUserInfo.instagramUrl}
                      placeholder="Nhập địa chỉ instagram của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="instagramUrl"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <a href={user.instagramUrl}>
                    <strong style={{ paddingLeft: "16px" }}>
                      {user.instagramUrl}
                    </strong>
                  </a>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            width={"100%"}
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
            <Box display={"flex"} alignItems={"end"} width={"100%"}>
              <TwitterIcon
                style={{ width: "30px", height: "30px", color: "#1da1f2" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Twitter :</span>{" "}
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      value={newUserInfo.twitterUrl}
                      placeholder="Nhập địa chỉ twitter của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="twitterUrl"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <a href={user.twitterUrl}>
                    <strong style={{ paddingLeft: "16px" }}>
                      {user.twitterUrl}
                    </strong>
                  </a>
                )}
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
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <ContactMailIcon
                color="warning"
                style={{ width: "30px", height: "30px" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                width={"100%"}
                alignItems={"center"}
              >
                <span style={{ width: "180px" }}>Địa chỉ :</span>
                {onEditUserInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      value={newUserInfo.address}
                      placeholder="Nhập địa chỉ của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="address"
                      onChange={handleChangeNewUserInfo}
                    />
                  </Stack>
                ) : (
                  <strong style={{ paddingLeft: "16px" }}>
                    {user.address}
                  </strong>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            display={onEditUserInfo ? "flex" : "none"}
            alignItems={"center"}
            justifyContent={"end"}
            p={2}
          >
            <Button
              variant={"contained"}
              color={"success"}
              onClick={onUpdateUserInfo}
            >
              Cập nhật
            </Button>
          </Box>
        </Stack>
        <Divider />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pr={2}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Thông tin tài khoản
          </Typography>
          <IconButton
            color="primary"
            onClick={() => setOnEditAccountInfo((preState) => !preState)}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={0}>
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
            width={"100%"}
            py={1}
          >
            <Box display={"flex"} alignItems={"end"} width={"100%"}>
              <EmailIcon
                style={{ width: "30px", height: "30px", color: "#17a2b8" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Địa chỉ email :</span>{" "}
                <strong style={{ paddingLeft: "16px" }}>{user.email}</strong>
              </Typography>
            </Box>
          </Box>
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
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <ManageAccountsIcon
                style={{ width: "30px", height: "30px", color: " #007bff" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Biệt danh :</span>{" "}
                {onEditAccountInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      type="text"
                      value={newAccountInfo.username}
                      placeholder="Nhập biệt danh của bạn"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="username"
                      onChange={handleChangeNewAccountInfo}
                    />
                  </Stack>
                ) : (
                  <strong style={{ paddingLeft: "16px" }}>
                    {`${user.username || ""}`}
                  </strong>
                )}
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
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <VpnKeyIcon
                style={{ width: "30px", height: "30px", color: "red" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Mật khẩu :</span>{" "}
                {onEditAccountInfo ? (
                  <Stack
                    spacing={1.5}
                    width={"calc(100% - 180px)"}
                    direction={"row"}
                    px={1.5}
                  >
                    <InputBase
                      type="password"
                      value={newAccountInfo.newPassword}
                      placeholder="Nhập mật khẩu mới của bạn, bỏ qua nếu không muốn đổi"
                      sx={{
                        bgcolor: "white",
                        py: 1,
                        px: 2,
                        boxShadow: 1,
                        borderRadius: 3,
                        width: "100%",
                      }}
                      name="newPassword"
                      onChange={handleChangeNewAccountInfo}
                    />
                  </Stack>
                ) : (
                  <strong style={{ paddingLeft: "16px" }}>
                    * * * * * * * * *
                  </strong>
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            display={onEditAccountInfo ? "flex" : "none"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              "&:hover": {
                backgroundColor: "#D8D9D9",
              },
            }}
            px={2}
            py={1}
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
              <VpnKeyIcon
                style={{ width: "30px", height: "30px", color: "red" }}
              />
              <Typography
                variant="h4"
                px={2}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <span style={{ width: "180px" }}>Mật khẩu cũ:</span>{" "}
                <Stack
                  spacing={1.5}
                  width={"calc(100% - 180px)"}
                  direction={"row"}
                  px={1.5}
                >
                  <InputBase
                    value={newAccountInfo.oldPassword}
                    placeholder="Nhập mật khẩu cũ của bạn"
                    type="password"
                    sx={{
                      bgcolor: "white",
                      py: 1,
                      px: 2,
                      boxShadow: 1,
                      borderRadius: 3,
                      width: "100%",
                    }}
                    name="oldPassword"
                    onChange={handleChangeNewAccountInfo}
                  />
                </Stack>
              </Typography>
            </Box>
          </Box>
          <Box
            display={onEditAccountInfo ? "flex" : "none"}
            alignItems={"center"}
            justifyContent={"end"}
            p={2}
          >
            <Button
              variant={"contained"}
              color={"success"}
              onClick={onUpdateAccountInfo}
            >
              Cập nhật
            </Button>
          </Box>
        </Stack>
      </Stack>
    </BoxFull>
  );
};

export default Infor;
