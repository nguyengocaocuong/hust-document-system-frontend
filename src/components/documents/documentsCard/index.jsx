import { Box, Stack } from "@mui/system";
import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Typography } from "@mui/material";

function DocumentCard({ document }) {
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} p={2}>
      <Box
        width={"250px"}
        height={"300px"}
        sx={{ backgroundColor: "white" }}
        borderRadius={1}
        textAlign={"center"}
        boxShadow={3}
      >
        <Box width={"100%"} height={"180px"} overflow={"hidden"}>
          <img src={document.thumbnail} alt="?" width={"100%"} />
        </Box>
        <Box width={"100%"} height={"84px"} textAlign={"start"} p={1}>
          <Stack spacing={1}>
            <Box
              sx={{
                width: "50%",
                fontSize: 12,
                fontWeight: 700,
                textAlign: "start",
                alignItems: "center",
                display: "flex",
              }}
              color="#535f6b"
            >
              <LocalOfferIcon style={{ fontSize: 12 }} sx={{ mr: 1 }} /> Math II
            </Box>

            <Typography
              variant="h5"
              sx={{ fontSize: 15, fontWeight: 700, color: "gray" }}
              noWrap
            >
              {document.description}
            </Typography>
            
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default DocumentCard;
