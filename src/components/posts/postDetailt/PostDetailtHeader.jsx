import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import avatar1 from "../../../assets/images/avatar/05.jpg";
import avatar3 from "../../../assets/images/avatar/06.jpg";
import avatar4 from "../../../assets/images/avatar/07.jpg";
import avatar2 from "../../../assets/images/avatar/1.jpg";
import { red } from "@mui/material/colors";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const avatar = [avatar1, avatar2, avatar3, avatar4];
function PostDetailtHeader({ data }) {
  return (
    <Box
      width={"100%"}
      height={"40px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={avatar[Math.round(Math.random() * 10) % 4]}
        >
          {data.owner.name.substring(
            data.owner.name.lastIndexOf(" ") + 1,
            data.owner.name.lastIndexOf(" ") + 2
          )}
        </Avatar>
        <Typography variant="h6" ml="10px">{data.owner.name}</Typography>
      </Box>
      <Box display={"flex"} height={"100%"} alignItems={"center"}>
        {" "}
        <Chip
          icon={<LocalOfferIcon />}
          label={data.subject.name}
          size="small"
        />
      </Box>
    </Box>
  );
}

export default PostDetailtHeader;
