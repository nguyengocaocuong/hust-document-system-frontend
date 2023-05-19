import React from "react";
import { Avatar, Chip, IconButton, CardHeader, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
function PostCardHeader({ data }) {
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={data.owner.avatar}
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
