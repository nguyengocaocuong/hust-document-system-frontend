import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import ReviewTeacherCard from "./ReviewTeacherCard";
import ReviewModal from "../modal/ReviewModal";

function ReviewBody() {
  const [modalData, setModalData] = useState({open: false, data:null});
  const openModal = (data) => setModalData({open: true, data});
  const closeModal = () => setModalData({open: false, data: null});
  return (
    <Box pt={2} width={"100%"}>
      <Grid container spacing={2}>
        <Grid item xl={3}>
          <ReviewTeacherCard openModal={openModal}/>
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
        <Grid item xl={3}>
          <ReviewTeacherCard />
        </Grid>
      </Grid>
      <ReviewModal modalData={modalData} closeModal={closeModal}/>
    </Box>
  );
}

export default ReviewBody;
