import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetAllTeacherQuery } from "../../services/TeacherService";
import MultipleSelect from "../MultipleSelect";
import { useGetAllSubjectQuery } from "../../services/SubjectService";

const Step2 = ({ selectObject, data }) => {
  const { data: teachers } = useGetAllTeacherQuery();
  const { data: subjects } = useGetAllSubjectQuery();
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
          teachers ? (
            <MultipleSelect
              title={"Nhập tên giảng viên"}
              items={teachers.map((teacher) => ({
                label: (
                  <Typography style={{ marginLeft: "5px" }}>
                    {teacher.name}
                  </Typography>
                ),
              }))}
              handle={selectObject}
              hiddenTitle
              width={"250px"}
              all={false}
            />
          ) : (
            <CircularProgress color="secondary" />
          )
        ) : subjects ? (
          <MultipleSelect
            title={"Nhập tên môn học"}
            items={subjects.map((teacher) => ({
              label: (
                <Typography style={{ marginLeft: "5px" }}>
                  {teacher.name}
                </Typography>
              ),
            }))}
            handle={selectObject}
            hiddenTitle
            width={"250px"}
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
