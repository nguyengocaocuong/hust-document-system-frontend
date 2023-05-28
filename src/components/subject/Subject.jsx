import { Box } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import { useGetAllSubjectQuery } from "../../services/SubjectService";
function Subject() {
  const { data= [] } = useGetAllSubjectQuery();
  return (
    <Box sx={{ backgroundColor: "white" }} height={"100%"}>
      <Box p={2} pt={1} display={"flex"} flexWrap={"wrap"}>
        {data.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Subject;
