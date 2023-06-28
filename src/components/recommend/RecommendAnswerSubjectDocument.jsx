import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import Owner from "../Owner";
import { CloseOutlined } from "@mui/icons-material";
import { checkURLType } from "../../utils/URLCheck";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

function RecommendAnswerSubjectDocument({ recommend, closeRecommend }) {
  return (
    <Box
      width={"100%"}
      sx={{
        borderBottom: "2px solid #F0F0F0",
        "&:hover": { bgcolor: "#F0F0F0" },
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
      {recommend?.type === "LINK" && (
        <Stack spacing={1} py={1}>
          <Typography>
            Đã chia sẻ đáp án cho tài liệu môn học{" "}
            <strong>Pháp luật đại cương</strong>
          </Typography>
          <Box
            position="relative"
            sx={{
              maxWidth: "100%",
              border: "1px dotted gray",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <a href={recommend?.document?.url} target="_blank" rel="noreferrer">
              <Typography
                sx={{
                  lineHeight: "17px",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {recommend?.document?.url}
              </Typography>
            </a>
            <Typography
              sx={{
                position: "absolute",
                bottom: "-10px",
                right: "50px",
                backgroundColor: "inherit",
                px: 1,
                fontWeight: "bold",
              }}
            >
              {checkURLType(recommend?.document?.url)}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                right: 0,
                color: "green",
                transform: "rotate(-45deg)",
                backgroundColor: "transparent",
              }}
            >
              <InsertLinkIcon />
            </Box>
          </Box>
          <Typography>
            {"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates eveniet veritatis minus totam. Enim facere deserunt officia? Earum aspernatur perferendis repellendus quasi libero corrupti, quod praesentium repellat cupiditate, eaque voluptate".substring(
              90
            )}
          </Typography>
        </Stack>
      )}
      {recommend?.type !== "LINK" && (
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
              đã chia sẻ đáp án cho tài liệu môn học <strong>{"Hóa học"}</strong>
            </Typography>
            <Typography fontWeight={"bold"} width={"100%"} noWrap>
              {recommend.document.name}
            </Typography>
            <Typography>{recommend.description}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RecommendAnswerSubjectDocument;
