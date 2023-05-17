import { Box, Typography } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import {
  FileTypeFilter,
  DocumentTypeFilter,
  SemesterFilter,
  SubjectCodeFilter,
  StatusFilter,
} from "../../settings/sharedSetting";
import Filter from "../../components/Filter";
const data = [
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    id: 1,
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    id: 1,
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
];
function Subject({ subjects = data }) {
  return (
    <Box>
      <Box p={2}>
        <Typography variant="h3" color={"text.secondary"}>
          Tài liệu học tập
        </Typography>
      </Box>
      <Box p={2} pt={0}>
        <Filter
          data={[
            FileTypeFilter,
            DocumentTypeFilter,
            SemesterFilter,
            SubjectCodeFilter,
            StatusFilter,
          ]}
        />
      </Box>
      <Box p={2} pt={1} display={"flex"} flexWrap={"wrap"}>
        {subjects.map((subject, index) => (
          <SubjectCard data={subject} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Subject;
