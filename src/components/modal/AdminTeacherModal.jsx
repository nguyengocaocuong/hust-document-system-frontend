import {
  Box,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import avatarImg from "../../assets/images/avatar/06.jpg";
import React, { useRef, useState } from "react";
import BoxBetween from "../BoxBetween";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { StyledTextarea } from "../EmptyTextarea";
import { useCreateTeacherMutation } from "../../services/TeacherService";
import { convertJsonToFormData } from "../../utils/ConvertData";
import { useDispatch } from "react-redux";
import { closeTeacherModal } from "../../store/modalState";
import { useGetAllTeacherQuery } from "../../services/AdminTeacherService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 1,
  backgroundColor: "white",
  p: 4,
};
function AdminTeacherModal({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeTeacherModal());
  };
  const theme = useTheme();
  const [teacher, setTeacher] = useState({
    name: "",
    emailHust: "",
    emailPrivate: "",
    avatar: "",
    avatarFile: null,
    subjects: [1],
    phoneNumber: "",
    description: "",
    dob: null,
  });
  const [createTeacher] = useCreateTeacherMutation();
  const avatarRef = useRef();
  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const { refetch } = useGetAllTeacherQuery();
  const createNewTeacher = () => {
    createTeacher(convertJsonToFormData(teacher)).then((response) => {
      refetch();
      closeModal();
    });
  };
  return (
    <Modal
      open={open}
      onClose={closeModal}
      sx={{ backgroundColor: "transparent" }}
    >
      <Box sx={{ ...style }}>
        <Grid container spacing={2}>
          <Grid item xl={3}>
            <Paper elevation={1}>
              <Box p={2}>
                <Typography
                  variant="h3"
                  color={theme.palette.text.secondary}
                  mb={"20px"}
                >
                  Ảnh đại diện
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"center"} p="15px" pt="0">
                <Box position={"relative"}>
                  <img
                    src={
                      teacher.avatarFile === null
                        ? teacher?.avatar
                          ? teacher?.avatar
                          : avatarImg
                        : URL.createObjectURL(teacher.avatarFile)
                    }
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "60px",
                    }}
                    alt=""
                  />
                  <Box
                    width={"40px"}
                    height={"40px"}
                    sx={{ backgroundColor: "white", borderRadius: "100%" }}
                    p="5px"
                    position={"absolute"}
                    bottom="0"
                    right={"0"}
                  >
                    <BoxBetween
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                      }}
                    >
                      <IconButton onClick={() => avatarRef.current.click()}>
                        <ModeEditOutlinedIcon style={{ color: "white" }} />
                      </IconButton>
                      <input
                        type="file"
                        display="none"
                        ref={avatarRef}
                        onChange={(e) =>
                          setTeacher({
                            ...teacher,
                            avatarFile: e.target.files[0],
                          })
                        }
                        accept="image/*"
                      />
                    </BoxBetween>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xl={9}>
            <Paper elevation={1}>
              <Box p={2}>
                <Box>
                  <Typography
                    variant="h3"
                    color={theme.palette.text.secondary}
                    mb={1}
                  >
                    Thông tin giảng viên
                  </Typography>
                </Box>
                <Box pl={1}>
                  <Grid container spacing={2}>
                    <Grid item xl={6}>
                      <Box mb={"15px"}>
                        <Typography
                          variant="h5"
                          color={theme.palette.text.secondary}
                          mb={"5px"}
                        >
                          Họ tên giảng viên:
                        </Typography>
                        <TextField
                          required
                          placeholder="Nhập họ tên giảng viên"
                          size="small"
                          sx={{ width: "100%" }}
                          value={teacher?.name}
                          name="name"
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xl={6}>
                      <Box mb={"15px"}>
                        <Typography
                          variant="h5"
                          color={theme.palette.text.secondary}
                          mb={"5px"}
                        >
                          Số điện thoại:
                        </Typography>
                        <TextField
                          placeholder="Nhập số điện thoại"
                          size="small"
                          sx={{ width: "100%" }}
                          value={teacher.phoneNumber}
                          name="phoneNumber"
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xl={6}>
                      <Box mb={"15px"}>
                        <Typography
                          variant="h5"
                          color={theme.palette.text.secondary}
                          mb={"5px"}
                        >
                          Email trường:
                        </Typography>
                        <TextField
                          type="email"
                          required
                          placeholder="Nhập email trường của giảng viên"
                          size="small"
                          sx={{ width: "100%" }}
                          value={teacher?.emailHust}
                          name="emailHust"
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xl={6}>
                      <Box mb={"15px"}>
                        <Typography
                          variant="h5"
                          color={theme.palette.text.secondary}
                          mb={"5px"}
                        >
                          Email cá nhân:
                        </Typography>
                        <TextField
                          type="email"
                          required
                          placeholder="Nhập email cá nhân của giảng viên"
                          size="small"
                          sx={{ width: "100%" }}
                          value={teacher?.emailPrivate}
                          name="emailPrivate"
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xl={12}>
                      <Box mb={"15px"}>
                        <Typography
                          variant="h5"
                          color={theme.palette.text.secondary}
                          mb={"5px"}
                        >
                          Giới thiệu giảng viên:
                        </Typography>
                        <StyledTextarea
                          minRows={4.3}
                          maxRows={4.3}
                          sx={{ resize: "none" }}
                          placeholder="Nhập thông tin giới thiệu giảng viên"
                          value={teacher?.description}
                          onChange={handleChange}
                          name="description"
                        />
                      </Box>
                    </Grid>
                    <Grid item xl={12} textAlign={"center"}>
                      <Button
                        size="large"
                        variant="contained"
                        disabled={
                          teacher.name.length === 0 ||
                          teacher.emailHust.length === 0
                        }
                        sx={{ textTransform: "capitalize" }}
                        onClick={createNewTeacher}
                      >
                        Thêm giảng viên
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default AdminTeacherModal;
