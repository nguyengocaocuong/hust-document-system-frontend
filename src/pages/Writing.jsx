import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Post from "../components/writing/Post";
import ReviewSubject from "../components/writing/ReviewSubject";
import ReviewTeacher from "../components/writing/ReviewTeacher";
import BoxBetween from "../components/BoxBetween";
import { useLocation } from "react-router-dom";

function Writing() {
  const location = useLocation();
  const [type, setType] = useState(location.state?.type || null);
  return (
    <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "white" }}>
      {type === null && (
        <BoxBetween>
          <Box
            width={"480px"}
            border={"1px dotted gray"}
            textAlign={"center"}
            sx={{ "&:hover": { border: "2px dotted blue" } }}
          >
            <Typography
              variant="h2"
              color={"text.secondary"}
              fontWeight={"bold"}
              sx={{ mb: 2, bgcolor: "#F0F0F0" }}
              p={2}
            >
              Bạn muốn viết gì?
            </Typography>
            <Stack spacing={2} p={2}>
              <Typography
                onClick={() => setType("POST")}
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  p: 1,
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
                variant="h3"
                onClick={() => setType("REVIEW_TEACHER")}
                sx={{
                  fontWeight: "bold",
                  p: 1,
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
                variant="h3"
                onClick={() => setType("REVIEW_SUBJECT")}
                sx={{
                  fontWeight: "bold",
                  p: 1,
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
      {type === "REVIEW_SUBJECT" && <ReviewSubject subjectId={location.state?.subjectId || ""}/>}
      {type === "REVIEW_TEACHER" && <ReviewTeacher />}
    </Box>
  );
}

export default Writing;
