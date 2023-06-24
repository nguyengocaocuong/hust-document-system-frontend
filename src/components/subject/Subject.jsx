import { Box, Grid } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import { useGetAllSubjectQuery } from "../../services/SubjectService";
function Subject() {
  const { data = [] } = useGetAllSubjectQuery();
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box pt={1} display={"flex"} flexWrap={"wrap"}>
        <Grid container spacing={2} px={2}>
          {data.map((subject, index) => (
            <SubjectCard subject={subject} key={index} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Subject;
