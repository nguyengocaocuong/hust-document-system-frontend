import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import noDocument from "../../assets/images/noDocument.png";
import BoxBetween from "../BoxBetween";

function Reviewed() {
  const [writed] = useState([]);
  // const [getAllWroteByUserId] = useGetAllWroteByUserIdMutation();
  useEffect(
    () => {
      // getAllWroteByUserId(id).then((response) => {
      //   if (!response.error) {
      //     setWrited(() => [
      //       response.data.content.reviewTeachers.map((review) => ({
      //         ...review,
      //         type: "REVIEW_TEACHER",
      //       })),
      //       response.data.content.reviewSubjects.map((review) => ({
      //         ...review,
      //         type: "REVIEW_SUBJECT",
      //       })),
      //     ]);
      //   }
      // });
    },
    // eslint-disable-next-line
    []
  );
  return (
    <Box width={"100%"} border={"1px solid #FC8AED"}>
      {writed?.length === 0 && (
        <BoxBetween p={2}>
          <Box p={5}>
            <BoxBetween>
              <img src={noDocument} alt="?" height={"200px"} />
            </BoxBetween>
            <Typography variant="h4" textAlign={"center"}>
              Người này chưa đăng tải bất kỳ bài viết nào.
            </Typography>
          </Box>
        </BoxBetween>
      )}
    </Box>
  );
}

export default Reviewed;
