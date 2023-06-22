import { Box, Chip, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Flag } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Owner from "../Owner";
import { checkURLType } from "../../utils/URLCheck";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useDispatch } from "react-redux";
import { openReportContentSubjectDocumentModal } from "../../store/modalState";

function ReportContentSubjectDocument({ report }) {
  const dispatch = useDispatch();
  const check = () => {
    dispatch(openReportContentSubjectDocumentModal(report));
  };
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
            label={"Báo nội dung tài liệu"}
            icon={<Flag />}
          />,
        ]}
      />
      <Box
        p={1}
        pt={0}
        height={"150px"}
        display={"flex"}
        justifyContent={"space-between"}
        overflow={"hidden"}
      >
        {report.subjectDocument.type === "LINK" ? (
          <Box
            position="relative"
            sx={{
              maxWidth: "100%",
              border: "1px dotted gray",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <a
              href={report.subjectDocument?.document?.url}
              target="_blank"
              rel="noreferrer"
            >
              <Typography
                sx={{
                  lineHeight: "17px",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {report.subjectDocument?.document?.url}
              </Typography>
            </a>
            <Typography
              sx={{
                position: "absolute",
                bottom: "-10px",
                right: "50px",
                backgroundColor: "#E5E5E5",
                px: 1,
                fontWeight: "bold",
              }}
            >
              {checkURLType(report.subjectDocument?.document?.url)}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                right: 0,
                color: "green",
                transform: "rotate(-45deg)",
                backgroundColor: "#E5E5E5",
              }}
            >
              <InsertLinkIcon />
            </Box>
          </Box>
        ) : (
          <Box
            width={"100%"}
            height={"100%"}
            overflow={"hidden"}
            borderRadius={2}
            sx={{
              position: "relative",
              "&::after": {
                content: "''",
                topL: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                display: "block",
                position: "absolute",
                opacity: 0,
                backgroundColor: "gray",
                zIndex: 2,
              },
              "&:hover": {
                "&::after": {
                  opacity: 0.8,
                },
                ".child": {
                  opacity: 1,
                },
              },
            }}
          >
            <img
              src={report?.subjectDocument?.document?.thumbnail}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                opacity: 0,
                alignItems: "center",
                p: 2,
                zIndex: 10,
              }}
              className={"child"}
            >
              <Typography
                width={"100%"}
                color={"red"}
                fontWeight={"bold"}
                textAlign={"center"}
                fontSize={"23px"}
              >
                {report?.subjectDocument?.subjectDocumentType}
              </Typography>
              <Typography
                width={"100%"}
                fontWeight={"bold"}
                color={"white"}
                textAlign={"center"}
              >
                {report?.subjectDocument?.document?.name}
              </Typography>
            </Box>
          </Box>
        )}
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
              onClick={check}
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

export default ReportContentSubjectDocument;
