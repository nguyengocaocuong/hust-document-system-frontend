import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ReviewHeader({ type, setType, total }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ backgroundColor: "#F3F3F3", borderRadius: "8px 8px 25px 25px" }}
      width={"100%"}
      px={2}
      py={1}
      height={'166px'}
      mb={2}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        borderBottom={"1px solid #E7E7E7"}
      >
        <Box
          sx={{ borderBottom: type === "ALL" && "2px solid black", mr: 2 }}
          pb={1}
        >
          <Chip
            label={"Tất cả reviews"}
            sx={{
              fontSize: "15px",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "#E0E0E0", color: "red" },
              transform: "backgroundColor 0.4s",
              cursor: "pointer",
              color: type === "ALL" ? "red" : "",
            }}
            onClick={() => setType('ALL')}
          />
        </Box>
        <Box
          sx={{ borderBottom: type === "TEACHER" && "2px solid black", mr: 2 }}
          pb={1}
        >
          <Chip
            label={"Reivew giảng viên"}
            sx={{
              fontSize: "15px",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "#E0E0E0", color: "red" },
              transform: "backgroundColor 0.4s",
              cursor: "pointer",
              color: type === "TEACHER" ? "red" : "",
            }}
            onClick={() => setType('TEACHER')}
          />
        </Box>
        <Box
          sx={{ borderBottom: type === "SUBJECT" && "2px solid black", mr: 2 }}
          pb={1}
        >
          <Chip
            label={"Reivew môn học"}
            sx={{
              fontSize: "15px",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "#E0E0E0", color: "red" },
              transition: "backgroundColor 0.4s ",
              cursor: "pointer",
              color: type === "SUBJECT" ? "red" : "",
            }}
            onClick={() => setType('SUBJECT')}
          />
        </Box>
      </Box>
      <Box px={2} py={3} display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h3">Số bài viết</Typography>
          <Typography>{total} bài viết</Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "#FF3838",
            color: "#f4efef",
            textTransform: "none",
            borderRadius: 1,
            px: 3,
            py: 1,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
          }}
          onClick={() => navigate("/writing")}
        >
          Viết bài review
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewHeader;
