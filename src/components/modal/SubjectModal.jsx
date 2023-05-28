import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import EmptyTextarea, { StyledTextarea } from "../EmptyTextarea";
import { useCreateSubjectMutation, useGetAllSubjectForFilterQuery } from "../../services/SubjectService";
import { convertJsonToFormData } from "../../utils/ConvertData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};
function SubjectModal({ open, closeModal}) {
  const [subject, setSubject] = useState({
    subjectCode: "",
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };
  const theme = useTheme();
  const {refetch} = useGetAllSubjectForFilterQuery()
  const [createSubject] = useCreateSubjectMutation();
  const createNewSubject = () => {
    createSubject(convertJsonToFormData(subject)).then((response) => {
      setSubject({ subjectCode: "", name: "", description: "" });
      closeModal()
      refetch()
    });
  };
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...style }}>
        <Paper elevation={1}>
          <Box p={2} width={"350px"}>
            <Typography
              variant="h3"
              color={theme.palette.text.secondary}
              mb={2}
            >
              Nhập thông tin môn học
            </Typography>
            <Box pl={1}>
              <Grid container spacing={2}>
                <Grid item xl={12}>
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
                      hiddenLabel
                      placeholder="Nhập tên môn học"
                      size="small"
                      sx={{ width: "100%" }}
                      value={subject?.name}
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
                      Mã môn học:
                    </Typography>
                    <TextField
                      name="subjectCode"
                      width={"350px"}
                      hiddenLabel
                      placeholder="Nhập mã môn học"
                      size="small"
                      sx={{ width: "100%" }}
                      value={subject?.subjectCode}
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
                    <StyledTextarea
                      maxRows={5}
                      minRows={5}
                      placeholder="Nhập thông tin môn học"
                      value={subject.description}
                      name="description"
                      sx={{ resize: "none" }}
                      onChange={handleChange}
                    />
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

export default SubjectModal;
