import React from "react";
import { Avatar, Chip, IconButton, CardHeader, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
function PostCardHeader({ owner, subject }) {
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={owner.avatar}
        >
          {owner.lastName.substring(
            owner.lastName.lastIndexOf(" ") + 1,
            owner.lastName.lastIndexOf(" ") + 2
          )}
        </Avatar>
      }
      action={
        <Box display={"flex"} height={"100%"} alignItems={"center"}>
          {" "}
          <Chip
            icon={<LocalOfferIcon />}
            label={subject.name}
            size="small"
          />
          <IconButton>
            <ClearIcon />
          </IconButton>
        </Box>
      }
      title={`${owner.firstName} ${owner.lastName}`}
      subheader={owner.createAt}
    />
  );
}

export default PostCardHeader;
