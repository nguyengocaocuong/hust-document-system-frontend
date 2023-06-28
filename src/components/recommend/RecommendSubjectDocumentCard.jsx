import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { documentType } from "../../settings/SubjectSetting";
import Owner from "../Owner";
import { CloseOutlined } from "@mui/icons-material";

function RecommendSubjectDocumentCard({ recommend, closeRecommend }) {
  return (
    <Box
      width={"100%"}
      sx={{
        borderBottom: "2px solid #F0F0F0",
        "&:hover": { bgcolor: "#F0F0F0" },
        cursor: "pointer",
      }}
      p={2}
    >
      <Owner
        owner={recommend.owner}
        createdAt={recommend.createdAt}
        sx={{ p: -2 }}
        listItem={[
          <IconButton key={1} onClick={closeRecommend}>
            <CloseOutlined />
          </IconButton>,
        ]}
      />

      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        pt={1}
      >
        <img
          src={recommend.document.thumbnail}
          style={{ width: "80px", height: "auto" }}
          alt=""
        />
        <Box width={"calc(100% - 90px)"}>
          <Typography width={"100%"}>
            <strong>
              {`${recommend.owner.firstName} ${recommend.owner.lastName}`}
            </strong>{" "}
            đã chia sẻ{" "}
            <strong>{documentType[recommend.subjectDocumentType].title}</strong>{" "}
            cho môn học <strong>{"Hóa học"}</strong>
          </Typography>
          <Typography fontWeight={"bold"} width={"100%"} noWrap>
            {recommend.document.name}
          </Typography>
          <Typography>{recommend.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RecommendSubjectDocumentCard;
