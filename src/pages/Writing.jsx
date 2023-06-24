import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Post from "../components/writing/Post";
import ReviewSubject from "../components/writing/ReviewSubject";
import ReviewTeacher from "../components/writing/ReviewTeacher";
import BoxBetween from "../components/BoxBetween";

function Writing() {
  const [type, setType] = useState(null);
  return (
    <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "white" }}>
      {type === null && (
        <BoxBetween>
          <Box
            width={"350px"}
            border={"1px dotted gray"}
            textAlign={"center"}
            p={2}
          >
            <Typography variant="h3" color={"text.secondary"} sx={{ mb: 2 }}>
              Bạn muốn viết gì?
            </Typography>
            <Stack spacing={1}>
              <Typography
                onClick={() => setType("POST")}
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  p: 0.5,
                  backgroundColor: "success.main",
                  color: "white",
                  width: "auto",
                  borderRadius: "25px",
                  "&:hover": {
                    boxShadow: 5,
                  },
                  cursor: "pointer",
                }}
              >
                Đăng hỏi bài tập
              </Typography>
              <Typography
                variant="h5"
                onClick={() => setType("REVIEW_TEACHER")}
                sx={{
                  fontWeight: "bold",
                  p: 0.5,
                  backgroundColor: "warning.main",
                  color: "white",
                  width: "auto",
                  borderRadius: "25px",
                  "&:hover": {
                    boxShadow: 5,
                  },
                  cursor: "pointer",
                }}
              >
                Review giảng viên
              </Typography>
              <Typography
                variant="h5"
                onClick={() => setType("REVIEW_SUBJECT")}
                sx={{
                  fontWeight: "bold",
                  p: 0.5,
                  backgroundColor: "info.main",
                  color: "white",
                  width: "auto",
                  borderRadius: "25px",
                  "&:hover": {
                    boxShadow: 5,
                  },
                  cursor: "pointer",
                }}
              >
                Review môn học
              </Typography>
            </Stack>
          </Box>
        </BoxBetween>
      )}
      {type === "POST" && <Post />}
      {type === "REVIEW_SUBJECT" && <ReviewSubject />}
      {type === "REVIEW_TEACHER" && <ReviewTeacher />}
    </Box>
  );
}

export default Writing;
