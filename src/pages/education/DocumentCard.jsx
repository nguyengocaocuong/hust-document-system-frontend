import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Tooltip from "@mui/material/Tooltip";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { colorRanger } from "../../utils/Colorrange";

function DocumentCard({ data }) {
  return (
    <Box
      width={"25%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={3}
    >
      <Box
        p={2}
        borderRadius={"25px"}
        sx={{
          backgroundColor: "#F7F9FC",
          boxShadow: 1,
          cursor: "pointer",
          "&:hover": { boxShadow: 2 },
        }}
        width={"90%"}
      >
        <Box width={"100%"} display={"flex"} alignItems={"center"}>
          <MenuBookIcon
            sx={{ width: "80px", height: "80px", color: `${colorRanger()}` }}
          />
          <Box ml={2}>
            <Stack spacing={0.5}>
              <Typography variant="h5">
                <strong>{data.subjectCode}</strong>
              </Typography>
              <Typography variant="h6" noWrap>
                Môn học : <strong>{data.name}</strong>
              </Typography>
              <Box display={"flex"} alignItems={"center"} pt={1} width={"100%"}>
                <Tooltip title="Lượt bình luận">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    pr={2}
                    color={"primary.main"}
                  >
                    <QuestionAnswerOutlinedIcon /> {data.likeTotal}
                  </Box>
                </Tooltip>
                <Tooltip title="Tài liệu">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    color={"success.main"}
                  >
                    <InsertCommentOutlinedIcon /> {data.documentToal}
                  </Box>
                </Tooltip>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DocumentCard;
