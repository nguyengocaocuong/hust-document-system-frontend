import { Box } from "@mui/material";
import React from "react";
import DocumentCard from "./DocumentCard";
const data = [
  {
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "MATH I",
    name: "Đại số",
    likeTotal: "103",
    documentTotal: 302,
  },
  {
    subjectCode: "MATH II",
    name: "Giải tích",
    likeTotal: "204",
    documentTotal: 102,
  },
  {
    subjectCode: "PHYSICAL I",
    name: "Cơ học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
  {
    subjectCode: "PHYSICAL II",
    name: "Khí động học",
    likeTotal: "54",
    documentTotal: 42,
  },
];
function Document() {
  return (
    <Box p={2} pt={1} display={"flex"} flexWrap={"wrap"}>
      {data.map((subject, index) => (
        <DocumentCard data={subject} key={index} />
      ))}
    </Box>
  );
}

export default Document;
