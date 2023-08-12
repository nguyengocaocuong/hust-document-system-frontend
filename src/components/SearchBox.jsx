import { Box, IconButton, InputBase } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
function SearchBox({ placeHolde, searchBoxRef }) {
  const location = useLocation();
  return (
    <Box
      ref={searchBoxRef}
      width={"440px"}
      maxWidth={"100%"}
      zIndex={10}
      position={"absolute"}
      top={16}
      left={50}
      borderRadius={2}
      bgcolor={"white"}
      overflow={"hidden"}
      sx={{
        transition: "width 0.4s",
        border: "1px solid #E2E2E2",
        display: location.pathname.startsWith("/search") ? "none" : "block",
      }}
    >
      <Box height={"40px"} width={"100%"} display={"flex"}>
        <InputBase
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "17px",
            px: 1,
          }}
          placeholder={placeHolde}
        />
        <IconButton onClick={() => {}}>
          <SearchIcon sx={{ width: "25px", height: "25px" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchBox;
