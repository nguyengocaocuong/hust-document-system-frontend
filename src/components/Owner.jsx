import { Avatar, Box, Typography } from "@mui/material";
import { formatTimeAgo } from "../utils/ConvertDate";
import React from "react";
import {
  green,
  red,
  blue,
  orange,
  amber,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  grey,
  indigo,
} from "@mui/material/colors";

const color = [
  deepOrange,
  deepPurple,
  grey,
  indigo,
  green,
  red,
  orange,
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
];
function Owner({ owner, createdAt, listItem = [], sx }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
      sx={{ ...sx }}
      width={"100%"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        width={listItem.length === 0 ? "100%" : "60%"}
        justifyContent={"start"}
      >
        <Avatar
          alt={owner?.lastName}
          src={owner?.avatar}
          sx={{
            backgroundColor:
              owner &&
              color[
                owner.lastName
                  .split(" ")
                  [owner.lastName.split(" ").length - 1].charCodeAt(0) % 12
              ][500],
          }}
        >
          {owner.lastName.substring(
            owner.lastName.lastIndexOf(" ") + 1,
            owner.lastName.lastIndexOf(" ") + 2
          )}
        </Avatar>
        <Box ml={1} width="100%">
          <Typography
            variant="h6"
            textTransform={"capitalize"}
            sx={{ maxWidth: "100%" }}
            noWrap={true}
            color={"text.secondary"}
          >
            {`${owner?.firstName} ${owner?.lastName}`.toLocaleLowerCase()}
          </Typography>
          {createdAt && (
            <Typography fontSize={"12px"} textAlign={"start"}>
              {formatTimeAgo(createdAt)}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        width={"39%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        {listItem.map((Item) => Item)}
      </Box>
    </Box>
  );
}

export default Owner;
