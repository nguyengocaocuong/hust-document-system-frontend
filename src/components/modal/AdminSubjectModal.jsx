import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
// import { StyledTextarea } from "../EmptyTextarea";
import { useCreateSubjectMutation } from "../../services/SubjectService";
import { convertJsonToFormData } from "../../utils/ConvertData";
import { useDispatch } from "react-redux";
import { closeSubjectModal } from "../../store/modalState";
import { useGetAllSubjectQuery } from "../../services/AdminSubjectService";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};
function AdminSubjectModal({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeSubjectModal());
  };
  const [subject, setSubject] = useState({
    subjectCode: "",
    name: "",
    enName: "",
    institute: "",
    description: "",
  });
  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };
  const theme = useTheme();
  const { refetch: refetchAll } = useGetAllSubjectQuery();
  const [createSubject] = useCreateSubjectMutation();
  const createNewSubject = () => {
    createSubject(convertJsonToFormData(subject)).then(() => {
      setSubject({
        subjectCode: "",
        name: "",
        description: "",
        enName: "",
        institute: "",
      });
      closeModal();
      refetchAll();
    });
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Paper elevation={1}>
          <Box p={2} width={"500px"}>
            <Typography
              variant="h3"
              color={theme.palette.text.secondary}
              mb={2}
            >
              Nhập thông tin môn học
            </Typography>
            <Box pl={1}>
              <Grid container spacing={2}>
                <Grid item xl={6}>
                  <Box>
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                      mb={"5px"}
                    >
                      Tên môn học:
                    </Typography>
                    <TextField
                      name="name"
                      width={"350px"}
                      placeholder="Nhập tên môn học"
                      sx={{ width: "100%" }}
                      value={subject?.name}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xl={6}>
                  <Box>
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                      mb={"5px"}
                    >
                      Tên tiếng anh:
                    </Typography>
                    <TextField
                      name="enName"
                      width={"350px"}
                      placeholder="Nhập tên tiếng anh"
                      sx={{ width: "100%" }}
                      value={subject?.enName}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xl={6}>
                  <Box>
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                      mb={"5px"}
                    >
                      Mã môn học:
                    </Typography>
                    <TextField
                      name="subjectCode"
                      width={"350px"}
                      placeholder="Nhập mã môn học"
                      sx={{ width: "100%" }}
                      value={subject?.subjectCode}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xl={6}>
                  <Box>
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                      mb={"5px"}
                    >
                      Viện quản lý:
                    </Typography>
                    <TextField
                      name="institute"
                      width={"350px"}
                      placeholder="Nhập tên viện quản lý"
                      sx={{ width: "100%" }}
                      value={subject?.institute}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xl={12}>
                  <Box>
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                      mb={"5px"}
                    >
                      Mô tả môn học:
                    </Typography>
                    {/* <StyledTextarea
                      maxRows={10}
                      minRows={10}
                      placeholder="Nhập mô tả môn học"
                      value={subject?.description}
                      name="description"
                      sx={{ resize: "none" }}
                      onChange={handleChange}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xl={12} textAlign={"center"}>
                  <Button
                    disabled={
                      subject.description.length === 0 ||
                      subject.name.length === 0 ||
                      subject.subjectCode.length === 0
                    }
                    size="large"
                    variant="contained"
                    onClick={createNewSubject}
                  >
                    Thêm môn học
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default AdminSubjectModal;
