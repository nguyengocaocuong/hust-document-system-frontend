import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MultipleSelect from "../components/MultipleSelect";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
import {
  useGetAllSemesterForFilterQuery,
  useGetAllSubjectDocumentTypeQuery,
  useGetAllSubjectForFilterQuery,
} from "../services/SubjectService";
import { useGetAllTeacherForFilterQuery } from "../services/TeacherService";
function Filter({
  onSearching = () => console.log("Searching"),
  document = true,
  documentType = true,
  teacher = true,
  semester = true,
}) {
  const {
    data: subjectDocumentTypeFilter = {
      title: "Loại tài liệu",
      item: [],
      type: "documentTypeFilter",
    },
  } = useGetAllSubjectDocumentTypeQuery();
  const {
    data: subjectDocumentFilter = {
      title: "Học phần",
      item: [],
      type: "documentFilter",
    },
  } = useGetAllSubjectForFilterQuery();
  const {
    data: teacherFilter = {
      title: "Giảng viên",
      item: [],
      type: "teacherFilter",
    },
  } = useGetAllTeacherForFilterQuery();
  const {
    data: semesterFilter = {
      title: "Học kỳ",
      item: [],
      type: "semesterFilter",
    },
  } = useGetAllSemesterForFilterQuery();
  const data = [];
  if (document) data.push(subjectDocumentFilter);
  if (documentType) data.push(subjectDocumentTypeFilter);
  if (teacher) data.push(teacherFilter);
  if (semester) data.push(semesterFilter);

  const [filterState, setFilterState] = useState({
    documentFilter: "",
    documentTypeFilter: "",
    teacherFilter: "",
    semesterFilter: "",
  });
  const handleChangeAndSearch = (changeType, value) => {
    onSearching({ ...filterState, [changeType]: value });
    setFilterState({ ...filterState, [changeType]: value });
  };
  return (
    <Box display={"flex"}>
      {data.map((item, index) => (
        <MultipleSelect
          key={index}
          handle={(value) => handleChangeAndSearch(item.type, value)}
          value={filterState[item.type]}
          title={item.title}
          items={item.item.map((i) => ({
            icon: i.icon && (
              <img
                src={getIconForDocByFileName(i.icon)}
                alt=""
                width={"20px"}
                height={"20px"}
              />
            ),
            label: (
              <Typography style={{ marginLeft: "5px" }}>{i.label}</Typography>
            ),
            value: i.label,
          }))}
        />
      ))}
      {/* <MultipleSelect
        title={"Chia sẻ bởi"}
        items={[
          {
            icon: <Avatar src={avatar1} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Nguyễn Ngô Cao Cường
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar2} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Nguyễn Đình Cảnh
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar3} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Lê Quang Trà
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar4} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Mai Đình Trọng
              </Typography>
            ),
          },
        ]}
      /> */}
    </Box>
  );
}

export default Filter;
