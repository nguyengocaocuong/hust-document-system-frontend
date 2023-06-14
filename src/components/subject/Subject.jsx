import { Box } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import { useGetAllSubjectQuery } from "../../services/SubjectService";
function Subject({type}) {
  const { data= [] } = useGetAllSubjectQuery();
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box pt={1} display={"flex"} flexWrap={"wrap"}>
        {data.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Subject;
