import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import BoxFull from "../components/BoxFull";
import avatar from "../assets/images/avatar/06.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import PropperMenu from "../components/PropperMenu";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import MultipleSelect from "../components/MultipleSelect";
import { useGetAllSubjectForFilterQuery } from "../services/FilterService";
import { formatTimeAgo } from "../utils/ConvertDate";
import RestoreIcon from "@mui/icons-material/Restore";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import DownloadIcon from "@mui/icons-material/Download";
const Infor = () => {
  const { data: subjectDocumentFilter = { title: "Loại tài liệu", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const [isAddSubject, setIsAddSubject] = useState(false);
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

  const [selectedSubject, setSelectedSubject] = useState([
    {
      id: 1,
      subjectCode: "PHYSICAL 123",
      name: "Vật lý đại cương",
    },
    {
      id: 2,
      subjectCode: "PHYSICAL 123",
      name: "Vật lý đại cương",
    },
    {
      id: 3,
      subjectCode: "PHYSICAL 123",
      name: "Vật lý đại cương",
    },
  ]);

  const onAddSubject = (id) => {
    const newSubject = subjectDocumentFilter.item.find(
      (item) => item.value === id
    );
    console.log(newSubject);
    if (newSubject)
      setSelectedSubject((preState) => [...preState, newSubject.data]);
  };
  const onDeleteSubject = (id) => {
    setSelectedSubject((preState) => preState.filter((item) => item.id !== id));
  };
  return (
    <BoxFull p={2} minHeight={"100%"}>
      <Stack
        spacing={2}
        p={2}
        bgcolor={"#D8D9D9"}
        borderRadius={2}
        boxShadow={1}
        border={"1px solid blue"}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          Thông tin người dùng
        </Typography>
        <Stack spacing={2} px={2}>
          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} alignItems={"end"}>
              <AccountCircleIcon style={{ width: "30px", height: "30px" }} />
              <Typography variant="h4" px={2}>
                Tên người dùng : <strong>Nguyễn Ngô Cao Cường</strong>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} alignItems={"end"}>
              <EmailIcon style={{ width: "30px", height: "30px" }} />
              <Typography variant="h4" px={2}>
                Địa chỉ email : <strong>cuong.nnc184055@sis.hust.edu.vn</strong>
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} alignItems={"end"}>
              <PhoneIcon style={{ width: "30px", height: "30px" }} />
              <Typography variant="h4" px={2}>
                Số điện thoại : <strong>0818988577</strong>
              </Typography>
            </Box>
            <PropperMenu action={actions()} />
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
            Môn học đang theo học
          </Typography>
          <Box display={"flex"}>
            <Box
              sx={{
                width: isAddSubject ? "250px" : 0,
                opacity: 1,
                transition: "width 0.4s",
                overflow: "hidden",
              }}
            >
              <MultipleSelect
                width="98%"
                items={subjectDocumentFilter.item.map((subject) => ({
                  label: (
                    <Typography style={{ marginLeft: "5px" }}>
                      {subject.label}
                    </Typography>
                  ),
                  value: subject.value,
                }))}
                handle={onAddSubject}
              />
            </Box>
            <Tooltip title={"Thêm môn học"}>
              <IconButton
                onClick={() => setIsAddSubject(!isAddSubject)}
                sx={{ bgcolor: "#5959cc", "&:hover": { bgcolor: "blue" } }}
              >
                <AddIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <BoxFull px={2}>
          <Grid container spacing={3}>
            {selectedSubject.map((item) => (
              <Grid item xl={4} key={item.index}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  bgcolor={"white"}
                  borderRadius={2}
                  px={2}
                  py={1}
                >
                  <Stack spacing={0.5} width={"90%"}>
                    <Typography
                      variant="h4"
                      noWrap
                      maxWidth={"85%"}
                      overflow={"hidden"}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      display={"flex"}
                      alignItems={"end"}
                      fontWeight={"bold"}
                    >
                      #{item.subjectCode}
                    </Typography>
                  </Stack>
                  <IconButton onClick={() => onDeleteSubject(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </BoxFull>
      </Stack>
    </BoxFull>
  );
};

const FavoriteSubject = () => {
  return <BoxFull></BoxFull>;
};
const Setting = () => {
  return <BoxFull></BoxFull>;
};
const History = () => {
  const navigate = useNavigate();
  const [isHelperBox, setHelperBox] = useState(false);
  return (
    <BoxFull>
      <Stack
        spacing={0}
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        pb={isHelperBox && "100px"}
      >
        <Stack
          py={1}
          px={2}
          spacing={2}
          direction={"row"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          sx={{
            "&:hover": {
              backgroundColor: "#E7F8CE",
            },
            borderBottom: "0.2px solid #D8D9D9",
          }}
        >
          <Checkbox onChange={() => setHelperBox((preState) => !preState)} color="success"/>
          <IconButton
            onClick={() => navigate("/education/subject-document/13")}
          >
            <RestoreIcon />
          </IconButton>
          <Typography variant="h5" width={"10%"} noWrap>
            {formatTimeAgo(new Date().toLocaleDateString())}
          </Typography>
          <Typography variant="h4" fontWeight={"bold"} width={"30%"} noWrap>
            Đề thi cuối kỳ.pdf
          </Typography>
          <Typography variant="h6" width={"50%"} noWrap>
            http://localhost:3000/education/subject-document/13
          </Typography>
          <IconButton
            onClick={() => navigate("/education/subject-document/13")}
            sx={{ "&:hover": { color: "blue" } }}
          >
            <RestoreIcon />
          </IconButton>
          <IconButton sx={{ "&:hover": { color: "red" } }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        position={"fixed"}
        width={"100%"}
        bgcolor={"white"}
        bottom={0}
        left={0}
        boxShadow={10}
        sx={{
          transition: "height 0.4s",
          height: isHelperBox ? "90px" : 0,
          overflow: "hidden",
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={isHelperBox ? 2 : 0}
      >
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            display={"flex"}
            alignItems={"center"}
            onClick={()=> window.open('http://localhost:3000/education/subject-document/13')}
          >
            <LanguageIcon sx={{ mr: 1 }} />
            Mở tài liệu
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="warning"
            display={"flex"}
            alignItems={"center"}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Mở tài liệu
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            display={"flex"}
            alignItems={"center"}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Xóa lịch sử
          </Button>
        </Stack>
      </Box>
    </BoxFull>
  );
};
function Profile() {
  const fileInputRef = useRef();
  const { user } = useSelector((state) => state.authentication);
  const [isActive, setActive] = useState(0);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    setUserState({ ...user });
  }, [user]);
  const onSelectFileAvatar = (e) => {
    setUserState((preState) => ({
      ...preState,
      avatarFile: e.target.files[0],
    }));
  };
  return (
    <BoxFull bgcolor={"white"} overflow={"auto"}>
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
                      : avatar
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
            color="primary"
            variant={isActive === 0 ? "contained" : "outlined"}
            onClick={() => setActive(0)}
            sx={{
              p: 1.5,
              cursor: "pointer",
              boxShadow: isActive === 0 ? 2 : 0,
              "&:hover": { boxShadow: 2 },
              height: "40px",
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
            }}
            icon={<FavoriteIcon />}
            label={<Typography variant="h5">Môn học yêu thích</Typography>}
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
        <Box width={"100%"} height={"100%"}>
          {isActive === 0 && <Infor />}
          {isActive === 1 && <FavoriteSubject />}
          {isActive === 2 && <Setting />}
          {isActive === 3 && <History />}
        </Box>
      </Box>
    </BoxFull>
  );
}

export default Profile;
