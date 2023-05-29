import React from "react";
import BoxFull from "../components/BoxFull";
import ReviewHeader from "../components/review/ReviewHeader";
import ReviewBody from "../components/review/ReviewBody";

function Review() {
  return (
    <BoxFull sx={{ backgroundColor: "white" }} p={2} overflow={'auto'}>
      <ReviewHeader />
      <ReviewBody />
    </BoxFull>
  );
}

export default Review;
