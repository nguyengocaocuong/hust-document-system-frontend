import {
  Box,
  Chip,
  Divider,
  Tooltip,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import React from "react";
import { Flag } from "@mui/icons-material";
import Owner from "../Owner";
import { checkURLType } from "../../utils/URLCheck";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useDeleteReportContentSubjectDocumentMutation,
  useUpdateReportContentSubjectDocumentMutation,
} from "../../services/SubjectService";

function ReportContentSubjectDocument({ report }) {
  const [onEdit, setOnEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(report.message);
  const [message] = useState(report.message);
  const [updateReportContentSubjectDocument] =
    useUpdateReportContentSubjectDocumentMutation();
  const onUpdate = () => {
    const formData = new FormData();
    formData.append("message", newMessage);
    updateReportContentSubjectDocument({
      subjectDocumentId: report.subjectDocument.id,
      reportContentSubjectDocumentId: report.id,
      body: formData,
    });
  };
  const [deleteReportContentSubjectDocument] =
    useDeleteReportContentSubjectDocumentMutation();
  const onDelete = () => {
    deleteReportContentSubjectDocument({
      subjectDocumentId: report.subjectDocument.id,
      reportContentSubjectDocumentId: report.id,
    }).then((response) => {
      if (!response.error) {
        console.log("ok");
      }
    });
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
                transition: "opacity 0.4s",
              },
              "&:hover": {
                "&::after": {
                  opacity: 0.8,
                },
                ".child": {
                  transition: "opacity 0.4s",
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
                zIndex: 3,
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
                {report?.subjectDocument?.subjectDocumentType.type}
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
        <Box display={"flex"} alignItems={"center"} width={"calc(100% - 90px)"}>
          {onEdit ? (
            <Box width={"100%"} position={"relative"}>
              <InputBase
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  px: 1.5,
                  py: 0.5,
                  pr: 4,
                  borderRadius: 3,
                  boxShadow: 1,
                }}
              />
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => {
                  setOnEdit(false);
                  setNewMessage(report.message);
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          ) : (
            <Chip label={message} sx={{ maxWidth: "100%" }} color="warning" />
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          {onEdit ? (
            <Tooltip title="Lưu">
              <IconButton
                disabled={message === newMessage || newMessage === ""}
                color="success"
                onClick={onUpdate}
              >
                <DoneIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Chỉnh sửa">
              <IconButton color="success" onClick={() => setOnEdit(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Loại bỏ báo cáo">
            <IconButton color="error" onClick={onDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportContentSubjectDocument;
