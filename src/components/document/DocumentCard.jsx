import { Box, Stack } from "@mui/system";
import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Avatar, Grid, Tooltip, Typography } from "@mui/material";
import PropperMenu from "../PropperMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const getAction = (navigate, document, subjectDetail, preview) => {
  return [
    {
      icon: <PreviewIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Xem trước</Typography>,
      handle: (close) => {
        preview();
        close();
      },
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Xem chi tiết</Typography>,
      handle: (close) => {
        navigate(`/education/subject-document/${1}`);
        close();
      },
    },
    {
      icon: (
        <AddCircleOutlineIcon sx={{ fontSize: "13px", marginRight: "5px" }} />
      ),
      label: (
        <Typography sx={{ fontSize: "13px" }}>Thêm câu trả lời</Typography>
      ),
      handle: (close) => {
        close();
      },
    },
    {
      icon: <InsertLinkIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: (
        <Typography sx={{ fontSize: "13px" }}>Lấy link truy cập</Typography>
      ),
      handle: (close) => {
        close();
      },
    },
    {
      icon: <ShareIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Chia sẻ</Typography>,
      handle: (close) => {
        close();
      },
    },
  ];
};
function DocumentCard({ document, subjectDetail, preview }) {
  const navigate = useNavigate();
  return (
    <Grid item xl={4}>
      <Box width={"100%"} display={"flex"} p={2} justifyContent={"center"}>
        <Box
          width={"230px"}
          height={"280px"}
          maxHeight={"280px"}
          sx={{
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
              boxShadow: 7,
            },
          }}
          borderRadius={1}
          textAlign={"center"}
          boxShadow={3}
        >
          <Box p={1} display={"flex"} alignItems={"center"}>
            <Avatar src={document?.owner.avatar} />
            <Tooltip
              title={`Tài liệu này được chia sẻ bởi ${document?.owner.firstName} ${document?.owner.lastName}`}
            >
              <Typography textAlign={"start"} pl={1} noWrap>
                Chia sẻ bởi <br />
                <strong>{`${document?.owner?.firstName} ${document?.owner.lastName}`}</strong>
              </Typography>
            </Tooltip>
            <PropperMenu
              action={getAction(navigate, document, subjectDetail, preview)}
            />
          </Box>
          <Box width={"100%"} height={"130px"} overflow={"hidden"}>
            <img
              src={`http://localhost:8080/api/v1/public/${document?.document.id}/thumbnail`}
              alt="???"
              width={"100%"}
            />
          </Box>
          <Box width={"100%"} height={"84px"} textAlign={"start"} p={1}>
            <Stack spacing={1}>
              <Box
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "start",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <LocalOfferIcon style={{ fontSize: 12 }} sx={{ mr: 1 }} />{" "}
                  {document?.type}
                </Box>
                <Typography color={"text.primary"} fontSize={"10px"}>
                  {document?.document?.createdAt?.substring(0, 10)}
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{ fontSize: 15, fontWeight: 700, color: "gray" }}
                noWrap
              >
                {document?.description?.substring(0, 50)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default DocumentCard;
