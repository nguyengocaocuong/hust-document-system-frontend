import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import BoxFull from "../BoxFull";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Infor = ({ userProfile }) => {
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
          justifyContent={"start"}
          pr={2}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Thông tin người dùng
          </Typography>
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
                <strong
                  style={{ paddingLeft: "12px" }}
                >{`${userProfile.firstName} ${userProfile.lastName}`}</strong>
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
                <strong style={{ paddingLeft: "16px" }}>
                  {userProfile.phoneNumber}
                </strong>
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
                <a href={userProfile.facebookUrl}>
                  <strong style={{ paddingLeft: "16px" }}>
                    {userProfile.facebookUrl}
                  </strong>
                </a>
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
                <a href={userProfile.instagramUrl}>
                  <strong style={{ paddingLeft: "16px" }}>
                    {userProfile.instagramUrl}
                  </strong>
                </a>
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
                <a href={userProfile.twitterUrl}>
                  <strong style={{ paddingLeft: "16px" }}>
                    {userProfile.twitterUrl}
                  </strong>
                </a>
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
                <strong style={{ paddingLeft: "16px" }}>
                  {userProfile.address}
                </strong>
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Divider />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"start"}
          pr={2}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Thông tin tài khoản
          </Typography>
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
                <strong style={{ paddingLeft: "16px" }}>
                  {userProfile.email}
                </strong>
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
                <strong style={{ paddingLeft: "16px" }}>
                  {`${userProfile.username || ""}`}
                </strong>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </BoxFull>
  );
};

export default Infor;
