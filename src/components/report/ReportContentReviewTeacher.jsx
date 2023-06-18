import {
  Box,
  Chip,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Flag } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Owner from "../Owner";
function ReportContentReviewTeacher({ report }) {
  return (
    <Box
      width={"100%"}
      height={"280px"}
      sx={{
        backgroundColor: "#F0F0F0",
        "&:hover": { boxShadow: 4 },
        cursor: "pointer",
        transition: "box-shadow 0.4s",
      }}
      borderRadius={1}
      overflow={"hidden"}
    >
      <Owner
        owner={report.owner}
        createdAt={report.createdAt}
        listItem={[
          <Chip
            key={1}
            color="error"
            label={"Báo cáo nội dung "}
            icon={<Flag />}
          />,
        ]}
      />
      <Box
        p={1}
        pt={0}
        height={"150px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        overflow={"hidden"}
      >
        <Box
          width={"100%"}
          height={"100%"}
          dangerouslySetInnerHTML={{ __html: report?.reviewTeacher.review }}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 1 }}
        ></Box>
      </Box>
      <Divider />
      <Box
        height={"55px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
      >
        <Box display={"flex"} alignItems={"center"} width={"65%"}>
          <Typography
            fontSize={"15px"}
            overflow={"hidden"}
            width={"100%"}
            noWrap
          >
            {report.message}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Tooltip title="Kiểm tra">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                backgroundColor: "white",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <RemoveRedEyeOutlinedIcon color="warning" />
            </Box>
          </Tooltip>
          <Tooltip title="Phê duyệt">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                backgroundColor: "white",
                width: "35px",
                cursor: "pointer",
                height: "35px",
                borderRadius: 1,
                boxShadow: 1,
              }}
              mx={1}
            >
              <OfflinePinIcon color="success" />
            </Box>
          </Tooltip>
          <Tooltip title="Từ chối">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                backgroundColor: "white",
                width: "35px",
                cursor: "pointer",
                height: "35px",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <RemoveCircleOutlineIcon color="error" />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportContentReviewTeacher;
