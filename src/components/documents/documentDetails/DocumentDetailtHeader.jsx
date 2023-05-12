import { Avatar, Box, Chip,  Typography } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FlagIcon from "@mui/icons-material/Flag";
function DocumentDetailtHeader({ data = {owner:{name:'Nguyen Ngo Cao Cuong'}, subject:{name:'MATH II'}} }) {
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
          src={data.owner.avatar}
        >
          {data.owner.name.substring(
            data.owner.name.lastIndexOf(" ") + 1,
            data.owner.name.lastIndexOf(" ") + 2
          )}
        </Avatar>
        <Typography variant="h6" ml="10px">
          {data.owner.name}
        </Typography>
      </Box>
      <Box display={"flex"} height={"100%"} alignItems={"center"}>
        {" "}
        <Chip
          icon={<LocalOfferIcon />}
          label={data.subject.name}
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

export default DocumentDetailtHeader;

