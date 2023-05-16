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
function PostCardHeader({ data }) {
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={avatar[Math.round(Math.random() * 10) % 4]}
        >
          {data.owner.lastName.substring(
            data.owner.lastName.lastIndexOf(" ") + 1,
            data.owner.lastName.lastIndexOf(" ") + 2
          )}
        </Avatar>
      }
      action={
        <Box display={"flex"} height={"100%"} alignItems={"center"}>
          {" "}
          <Chip
            icon={<LocalOfferIcon />}
            label={data.subject.name}
            size="small"
          />
          <IconButton>
            <ClearIcon />
          </IconButton>
        </Box>
      }
      title={`${data.owner.firstName} ${data.owner.lastName}`}
      subheader={data.owner.createAt}
    />
  );
}

export default PostCardHeader;
