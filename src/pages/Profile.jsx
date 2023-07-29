import { Grid } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";

function Profile() {
  return (
    <BoxFull bgcolor={"white"}>
      <Grid container width={"100%"} height={"100%"}>
        <Grid item lg={4}>
          <BoxFull></BoxFull>
        </Grid>
        <Grid item lg={8}></Grid>
      </Grid>
    </BoxFull>
  );
}

export default Profile;
