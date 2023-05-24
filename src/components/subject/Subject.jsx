import { Box } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";

function Subject({ subjects = []}) {
  return (
    <Box sx={{ backgroundColor: "white" }} height={"100%"}>
      <Box p={2} pt={1} display={"flex"} flexWrap={"wrap"}>
        {subjects.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Subject;
