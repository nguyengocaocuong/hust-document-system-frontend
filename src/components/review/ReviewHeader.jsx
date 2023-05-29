import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useState } from "react";

function ReviewHeader() {
  const [selected, setSelected] = useState(1);
  return (
    <Box
      sx={{ backgroundColor: "#F3F3F3", borderRadius: "8px 8px 25px 25px" }}
      width={"100%"}
      px={2}
      py={1}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        borderBottom={"1px solid #E7E7E7"}
      >
        <Box
          sx={{ borderBottom: selected === 1 && "2px solid black", mr: 2 }}
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
              color: selected === 1 ? "red" : "",
            }}
            onClick={() => setSelected(1)}
          />
        </Box>
        <Box
          sx={{ borderBottom: selected === 2 && "2px solid black", mr: 2 }}
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
              color: selected === 2 ? "red" : "",
            }}
            onClick={() => setSelected(2)}
          />
        </Box>
        <Box
          sx={{ borderBottom: selected === 3 && "2px solid black", mr: 2 }}
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
              color: selected === 3 ? "red" : "",
            }}
            onClick={() => setSelected(3)}
          />
        </Box>
      </Box>
      <Box px={2} py={3} display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h3">Số bài viết</Typography>
          <Typography>123 lượt reviews</Typography>
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
        >
          Viết bài review
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewHeader;
