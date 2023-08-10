import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import avatarImg from "../../assets/images/avatar/06.jpg";
import React, { useRef, useState } from "react";
import BoxBetween from "../BoxBetween";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
// import { StyledTextarea } from "../EmptyTextarea";
import { convertJsonToFormData } from "../../utils/ConvertData";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateTeacherModal } from "../../store/modalState";
import {
  useGetAllTeacherQuery,
  useUpdateTeacherMutation,
} from "../../services/AdminTeacherService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 1,
  backgroundColor: "white",
  p: 2,
};
function UpdateTeacherModal({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeUpdateTeacherModal());
  };
  const theme = useTheme();
  const {
    updateTeacherModal: { dataModal },
  } = useSelector((state) => state.modalState);
  const [teacher, setTeacher] = useState({
    ...dataModal,
    avatarFile: null,
    dob: null,
  });
  const [updateTeacher] = useUpdateTeacherMutation();
  const avatarRef = useRef();
  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const { refetch } = useGetAllTeacherQuery();

  const createNewTeacher = () => {
    updateTeacher(convertJsonToFormData(teacher)).then((response) => {
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
          <Grid item xl={4}>
            <Box display={"flex"} justifyContent={"center"}  pt="0">
              <Box position={"relative"}>
                <img
                  src={
                    teacher.avatarFile === null ||
                    teacher.avatarFile === undefined
                      ? teacher?.avatar
                        ? teacher?.avatar
                        : avatarImg
                      : URL.createObjectURL(teacher.avatarFile)
                  }
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                  alt=""
                />
                <Box
                  width={"40px"}
                  height={"40px"}
                  sx={{ backgroundColor: "white", borderRadius: "100%" }}
                  p="5px"
                  position={"absolute"}
                  bottom="-10px"
                  right={"-10px"}
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
          </Grid>
          <Grid item xl={8}>
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
                      {/* <StyledTextarea
                        minRows={4.3}
                        maxRows={4.3}
                        sx={{ resize: "none" }}
                        placeholder="Nhập thông tin giới thiệu giảng viên"
                        value={teacher?.description}
                        onChange={handleChange}
                        name="description"
                      /> */}
                    </Box>
                  </Grid>
                  <Grid item xl={12} textAlign={"center"}>
                    <Button
                      size="large"
                      variant="contained"
                      disabled={
                        teacher.name?.length === 0 ||
                        teacher.emailHust?.length === 0
                      }
                      sx={{ textTransform: "capitalize" }}
                      onClick={createNewTeacher}
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default UpdateTeacherModal;
