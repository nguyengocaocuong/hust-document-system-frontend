import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import { useGetAllSubjectMutation } from "../../services/SubjectService";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Subject() {
  const [subjects, setSubject] = useState({
    items: [],
    totlalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [getAllSubject] = useGetAllSubjectMutation();
  useEffect(() => {
    getAllSubject({ page: 0, size: 20 }).then((response) => {
      setSubject(
        { ...response?.data, currentPage: 0 } || {
          items: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
        }
      );
    });
  }, []);
  const featchMoreData = () => {
    if (subjects.currentPage >= subjects.totalPages) return;
    getAllSubject({ page: subjects.currentPage, size: 20 }).then((response) => {
      setSubject({
        items: [...subjects.items, ...response.data?.items],
        currentPage: subjects.currentPage + 1,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    });
  };
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} flexWrap={"wrap"}>
        <InfiniteScroll
          dataLength={subjects.items.length}
          hasMore={subjects.currentPage < subjects.totalPages}
          next={featchMoreData}
          loader={
            <Box p={2} display={"flex"} justifyContent={"center"}>
              <CircularProgress sx={{ width: "25px", height: "25px" }} />
            </Box>
          }
          endMessage={<Typography></Typography>}
          height={630}
          width={"100%"}
        >
          <Grid container spacing={2} px={2} py={2}>
            {subjects.items.map((subject, index) => (
              <SubjectCard subject={subject} key={index} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </Box>
  );
}

export default Subject;
