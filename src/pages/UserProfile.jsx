import { Box, Chip, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxFull from "../components/BoxFull";
import avatar from "../assets/images/avatar/06.jpg";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateIcon from "@mui/icons-material/Create";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Infor from "../components/profile/Infor_";
import EnrollmentSubject from "../components/profile/EnrollmentSubject_";
import Uploaded from "../components/profile/Uploaded";
import Reviewed from "../components/profile/Reviewed";
import { useGetUserProfileByIdMutation } from "../services/UserService";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const [getUserProfileById] = useGetUserProfileByIdMutation();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUserProfileById(id).then((response) => {
      if (!response.error) {
        setUserProfile(response.data.content);
        console.log(response.data)
      }
    });
    // eslint-disable-next-line
  }, []);
  const [isActive, setActive] = useState(0);

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
            opacity: 0.5,
            zIndex: 1,
            transition: "opacity 0.4s",
          },
          "&:hover": {
            "&::before": { opacity: 0.6 },
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
                  src={userProfile?.avatar || avatar}
                  alt="avatar"
                  width={"100%"}
                  height={"auto"}
                  style={{ borderRadius: "100%", minHeight: "100%" }}
                />
              </Box>
            </BoxFull>
          </Box>
          <Box position={"absolute"} left={290} top={"110px"} zIndex={2}>
            <Stack spacing={1}>
              <Typography color={"white"} fontWeight={"bold"} variant="h2">
                {`${userProfile.firstName} ${userProfile.lastName}`}
              </Typography>
              <Typography color={"white"} variant="h4">
                {userProfile.email}
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
            label={<Typography variant="h5">Học phần đang học</Typography>}
          />
          <Chip
            color="primary"
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
            icon={<CloudDoneIcon />}
            label={<Typography variant="h5">Đã chia sẻ</Typography>}
          />
          <Chip
            color="secondary"
            onClick={() => setActive(3)}
            variant={isActive === 3 ? "contained" : "outlined"}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 3 ? 2 : 0,
              height: "40px",
              transition: "background-color 1s",
              "&:hover": { boxShadow: 2 },
            }}
            icon={<CreateIcon />}
            label={<Typography variant="h5">Bài viết</Typography>}
          />
        </Stack>
        <Box width={"100%"} pb={2}>
          {isActive === 0 && <Infor userProfile={userProfile} />}
          {isActive === 1 && <EnrollmentSubject />}
          {isActive === 2 && <Uploaded />}
          {isActive === 3 && <Reviewed />}
        </Box>
      </Box>
    </BoxFull>
  );
}

export default UserProfile;
