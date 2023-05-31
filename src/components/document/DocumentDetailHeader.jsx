import { Avatar, Box, Chip,  Typography } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FlagIcon from "@mui/icons-material/Flag";
function DocumentDetailHeader({ owner = {}, objectName}) {
  return (
    <Box
      width={"100%"}
      height={"90px"}
      maxHeight={"90px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={owner.avatar}
        >
          {owner.lastName?.substring(
            owner.lastName?.lastIndexOf(" ") + 1,
            owner.lastName?.lastIndexOf(" ") + 2
          )}
        </Avatar>
        <Typography fontWeight={400} ml="10px" textTransform={'capitalize'}>
          {`${owner.firstName} ${owner.lastName}`}
        </Typography>
      </Box>
      <Box display={"flex"} height={"100%"} alignItems={"center"}>
        {" "}
        <Chip
          icon={<LocalOfferIcon />}
          label={objectName}
          size="small"
          sx={{marginRight:'5px'}}
          color="info"
        />
        <Chip
          color="error"
          icon={<FlagIcon style={{ color: "white" }} />}
          label={"Báo cáo"}
          size="small"
        />
      </Box>
    </Box>
  );
}

export default DocumentDetailHeader;

