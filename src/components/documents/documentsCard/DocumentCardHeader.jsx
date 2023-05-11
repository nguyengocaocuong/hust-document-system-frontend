import React from "react";
import { Avatar, Chip, IconButton, CardHeader, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import avatar1 from "../../../assets/images/avatar/05.jpg";
import avatar3 from "../../../assets/images/avatar/06.jpg";
import avatar4 from "../../../assets/images/avatar/07.jpg";
import avatar2 from "../../../assets/images/avatar/1.jpg";
const avatar = [avatar1, avatar2, avatar3, avatar4];
function DocumentCardHeader() {
  return (
    <CardHeader
      sx={{ padding: "0" }}
      avatar={
        <Avatar
          sx={{ bgcolor: red[500], width: "30px", height: "30px" }}
          aria-label="recipe"
          src={avatar[Math.round(Math.random() * 10) % 4]}
        />
      }
      action={
        <Box display={"flex"} height={"100%"} alignItems={"center"}>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </Box>
      }
      title={"Nguyễn Ngô Cao Cường"}
    />
  );
}

export default DocumentCardHeader;
