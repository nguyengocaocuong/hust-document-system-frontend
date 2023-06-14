import React from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import MultipleSelect from "../MultipleSelect";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  useGetAllSubjectForFilterQuery,
  useGetAllTeacherForFilterQuery,
} from "../../services/FilterService";
import { useDispatch } from "react-redux";
import { openSubjectModal, openTeacherModal } from "../../store/modalState";

const Step2 = ({ selectObject, data }) => {
  const dispatch = useDispatch();
  const { data: subjectDocumentFilter = { title: "Loại tài liệu", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const { data: teacherFilter = { title: "Giảng viên", item: [] } } =
    useGetAllTeacherForFilterQuery();
  const openModal = () => {
    if (data?.type === "REVIEW_TEACHER") {
      dispatch(openTeacherModal());
    } else dispatch(openSubjectModal());
  };

  return (
    <Box display={"flex"} justifyContent={"center"} p={2}>
      <Box
        width={"370px"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Chọn{" "}
            {data.type === "REVIEW_TEACHER"
              ? "giảng viên muốn review"
              : data.type === "REVIEW_SUBJECT"
              ? "môn học muốn review"
              : "môn học muốn hỏi"}{" "}
            ?
          </Typography>
          <Tooltip
            title={
              data?.type === "REVIEW_TEACHER"
                ? "Thêm giáo viên"
                : "Thêm môn học"
            }
          >
            <IconButton color="primary" onClick={openModal}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {data.type === "REVIEW_TEACHER" ? (
          teacherFilter ? (
            <MultipleSelect
              title={"Chọn giảng viên"}
              items={teacherFilter.item.map((teacher) => ({
                label: (
                  <Typography style={{ marginLeft: "5px" }}>
                    {teacher.label}
                  </Typography>
                ),
                value: teacher.value,
              }))}
              handle={selectObject}
              hiddenTitle
              all={false}
            />
          ) : (
            <CircularProgress color="secondary" />
          )
        ) : subjectDocumentFilter ? (
          <MultipleSelect
            title={"Chọn môn học"}
            items={subjectDocumentFilter.item.map((subject) => ({
              label: (
                <Typography style={{ marginLeft: "5px" }}>
                  {subject.label}
                </Typography>
              ),
              value: subject.value,
            }))}
            handle={selectObject}
            hiddenTitle
            all={false}
          />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Box>
    </Box>
  );
};
export default Step2;
