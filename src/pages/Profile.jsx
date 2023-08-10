import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import BoxFull from "../components/BoxFull";
import avatar from "../assets/images/avatar/06.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import Infor from "../components/profile/Infor";
import History from "../components/profile/History";
import EnrollmentSubject from "../components/profile/EnrollmentSubject";
import Setting from "../components/profile/Setting";
import { useUpdateAvatarMutation } from "../services/UserService";

function Profile() {
  const fileInputRef = useRef();
  const { user } = useSelector((state) => state.authentication);
  const [isActive, setActive] = useState(0);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    setUserState({ ...user });
  }, [user]);

  const [updateAvatar] = useUpdateAvatarMutation();
  const onSelectFileAvatar = (e) => {
    setUserState((preState) => ({
      ...preState,
      avatarFile: e.target.files[0],
    }));
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("avatarFile", e.target.files[0]);
      updateAvatar(formData);
    }
  };

  return (
    <BoxFull
      bgcolor={"white"}
      overflow={"auto"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Box
        width={"100%"}
        height={"200px"}
        bgcolor={"black"}
        sx={{
          backgroundImage:
            "url(https://ts.hust.edu.vn/public/uploads/p6il-banne-01.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "gray",
            top: 0,
            left: 0,
            opacity: 0.6,
            zIndex: 1,
            transition: "opacity 0.4s",
          },
          "&:hover": {
            "&::before": { opacity: 0.7 },
          },
        }}
      >
        <BoxFull sx={{ position: "relative" }}>
          <Box
            width={"180px"}
            height={"180px"}
            position={"absolute"}
            top={"80px"}
            left={90}
            bgcolor={"white"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            zIndex={2}
            boxShadow={1}
            borderRadius={"100%"}
            p={1}
          >
            <BoxFull position={"relative"}>
              <Box
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                borderRadius={"100%"}
              >
                <img
                  src={
                    userState?.avatarFile
                      ? URL.createObjectURL(userState?.avatarFile)
                      : userState.avatar || avatar
                  }
                  alt="avatar"
                  width={"100%"}
                  height={"auto"}
                  style={{ borderRadius: "100%", minHeight: "100%" }}
                />
              </Box>
              <Box
                width={"40px"}
                height={"40px"}
                borderRadius={"100%"}
                bgcolor={"white"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                position={"absolute"}
                right={"10px"}
                bottom={0}
                boxShadow={1}
              >
                <IconButton
                  color="primary"
                  onClick={() => fileInputRef.current.click()}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={onSelectFileAvatar}
                multiple={false}
              />
            </BoxFull>
          </Box>
          <Box position={"absolute"} left={290} top={"110px"} zIndex={2}>
            <Stack spacing={1}>
              <Typography color={"white"} fontWeight={"bold"} variant="h2">
                Nguyen Ngo Cao Cuong
              </Typography>
              <Typography color={"white"} variant="h4">
                cuong.nnc184055@sis.hust.edu.vn
              </Typography>
            </Stack>
          </Box>
        </BoxFull>
      </Box>
      <Box width={"100%"} pt={8} px={10} height={"calc(100% - 280px)"}>
        <Stack spacing={2} direction={"row"} width={"100%"} p={2}>
          <Chip
            color="info"
            variant={isActive === 0 ? "contained" : "outlined"}
            onClick={() => setActive(0)}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 0 ? 2 : 0,
              "&:hover": { boxShadow: 2 },
              height: "40px",
              transition: "background-color 1s",
            }}
            icon={<ContactPageIcon />}
            label={<Typography variant="h5">Thông tin cá nhân</Typography>}
          />
          <Chip
            color="error"
            onClick={() => setActive(1)}
            variant={isActive === 1 ? "contained" : "outlined"}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 1 ? 2 : 0,
              "&:hover": { boxShadow: 2 },
              height: "40px",
              transition: "background-color 1s",
            }}
            icon={<FavoriteIcon />}
            label={<Typography variant="h5">Môn học đang học</Typography>}
          />
          <Chip
            color="warning"
            onClick={() => setActive(2)}
            variant={isActive === 2 ? "contained" : "outlined"}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 2 ? 2 : 0,
              height: "40px",
              transition: "background-color 1s",
              "&:hover": { boxShadow: 2 },
            }}
            icon={<SettingsIcon />}
            label={<Typography variant="h5">Thiết lập cài đặt</Typography>}
          />
          <Chip
            color="success"
            onClick={() => setActive(3)}
            variant={isActive === 3 ? "contained" : "outlined"}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 3 ? 2 : 0,
              "&:hover": { boxShadow: 2 },
              height: "40px",
            }}
            icon={<ManageHistoryOutlinedIcon />}
            label={<Typography variant="h5">Lịch sử truy cập</Typography>}
          />
        </Stack>
        <Box width={"100%"} pb={2}>
          {isActive === 0 && <Infor />}
          {isActive === 1 && <EnrollmentSubject />}
          {isActive === 2 && <Setting />}
          {isActive === 3 && <History />}
        </Box>
      </Box>
    </BoxFull>
  );
}

export default Profile;
