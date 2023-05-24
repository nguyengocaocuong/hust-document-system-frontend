import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  useGetAllTeacherForFilterQuery,
} from "../../services/TeacherService";
import MultipleSelect from "../MultipleSelect";
import { useGetAllSubjectForFilterQuery } from "../../services/SubjectService";

const Step2 = ({ selectObject, data }) => {
  const { data: subjectDocumentFilter = { title: "Loại tài liệu", item: [] } } =
    useGetAllSubjectForFilterQuery();
  const { data: teacherFilter = { title: "Giảng viên", item: [] } } =
    useGetAllTeacherForFilterQuery();
  return (
    <Box display={"flex"} justifyContent={"center"} p={2}>
      <Box
        width={"350px"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
      >
        <Typography variant="h3" color={"text.secondary"} sx={{ mb: 2 }}>
          Chọn{" "}
          {data.type === "REVIEW_TEACHER"
            ? "giảng viên muốn review"
            : data.type === "REVIEW_SUBJECT"
            ? "môn học muốn review"
            : "môn học muốn hỏi"}{" "}
          ?
        </Typography>
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
