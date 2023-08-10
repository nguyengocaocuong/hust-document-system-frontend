import { Box, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import { documentType } from "../../settings/SubjectSetting";
import Owner from "../Owner";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function RecommendSubjectDocumentCard({ recommend, closeRecommend }) {
  const navigate = useNavigate();
  return (
    <Box
      width={"100%"}
      sx={{
        borderBottom: "2px solid #F0F0F0",
        "&:hover": { bgcolor: "#F0F0F0" },
        cursor: "pointer",
      }}
      p={2}
      onClick={() => navigate(`/education/subject-document/${recommend.id}`)}
    >
      <Owner
        owner={recommend.owner}
        createdAt={recommend.createdAt}
        sx={{ p: -2 }}
        listItem={[
          <Chip
            icon={<LocalOfferIcon />}
            key={1}
            color={"primary"}
            label={<strong>{recommend.subject.name}</strong>}
          />,
          <IconButton key={2} onClick={closeRecommend}>
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
          <Typography width={"100%"} textTransform={"uppercase"}>
            <strong>#{recommend.subjectDocumentType.name}</strong>{" "}
          </Typography>
          <Typography>{recommend.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RecommendSubjectDocumentCard;
