import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import MultipleSelect from "../components/MultipleSelect";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
import {
  useGetAllSubjectDocumentTypeForFilterQuery,
  useGetAllSubjectForFilterQuery,
  useGetAllTeacherForFilterQuery,
} from "../services/FilterService";
function Filter({
  onSearching = () => {},
  document = true,
  documentType = true,
  teacher = true,
}) {
  const {
    data: subjectDocumentTypeFilter = {
      title: "Loại tài liệu",
      item: [],
      type: "documentTypeFilter",
    },
  } = useGetAllSubjectDocumentTypeForFilterQuery();
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
  const data = [];
  if (document) data.push(subjectDocumentFilter);
  if (documentType) data.push(subjectDocumentTypeFilter);
  if (teacher) data.push(teacherFilter);

  const [filterState, setFilterState] = useState({
    documentFilter: "",
    documentTypeFilter: "",
    teacherFilter: "",
  });
  const handleChangeAndSearch = (changeType, value) => {
    onSearching({ ...filterState, [changeType]: value });
    setFilterState({ ...filterState, [changeType]: value });
  };
  return (
    <Box display={'flex'}>
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
    </Box>
  );
}

export default Filter;
