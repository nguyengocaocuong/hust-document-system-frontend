import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import SubjectCard from "./SubjectCard";
import { useGetAllSubjectMutation } from "../../services/SubjectService";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Subject({ selected = [] }) {
  const [subjects, setSubject] = useState({
    items: [],
    totlalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [getAllSubject] = useGetAllSubjectMutation();
  useEffect(() => {
    getAllSubject({ page: 0, size: 10 }).then((response) => {
      setSubject(
        { ...response?.data, currentPage: 1 } || {
          items: [],
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
        }
      );
      console.log(response);
    });
  }, [getAllSubject]);
  const featchMoreData = () => {
    if (subjects.currentPage >= subjects.totalPages) return;
    getAllSubject({ page: subjects.currentPage, size: 10 }).then((response) => {
      setSubject({
        items: [...subjects.items, ...response.data?.items],
        currentPage: subjects.currentPage + 1,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    });
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
        WebkitBoxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
        MozBoxShadow: "0px 8px 5px 0px rgba(155, 155, 155, 0.1) inset",
      }}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <InfiniteScroll
        dataLength={subjects.items.length}
        hasMore={
          selected.length === 0 && subjects.currentPage < subjects.totalPages
        }
        next={featchMoreData}
        loader={
          <Box p={2} display={"flex"} justifyContent={"center"}>
            <CircularProgress sx={{ width: "25px", height: "25px" }} />
          </Box>
        }
        endMessage={<Typography></Typography>}
        height={"calc(100vh - 192px)"}
        width={"100%"}
      >
        <Grid container spacing={4} px={2} py={2} width={"calc(100vw - 230px)"}>
          {subjects.items
            .filter(
              (subject) =>
                selected.length === 0 ||
                selected.find((s) => s.value === subject.id) !== undefined
            )
            .map((subject, index) => (
              <SubjectCard subject={subject} key={index} />
            ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}

export default Subject;
