import React from "react";
import BoxFull from "../components/BoxFull";
import BoxBetween from "../components/BoxBetween";
import { Typography } from "@mui/material";

function PageNotFound() {
  return (
    <BoxFull>
      <BoxBetween>
        <Typography>Not found</Typography>
      </BoxBetween>
    </BoxFull>
  );
}

export default PageNotFound;
