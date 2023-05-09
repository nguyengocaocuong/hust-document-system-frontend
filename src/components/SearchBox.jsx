import { InputBase, alpha, styled } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  marginLeft: 0,
  width: "auto",
  height: "40px",
  maxWidth: "350px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    maxWidth: "290px",
    fontSize: "17px",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      "&:focus": {
        width: "290px",
        maxWidth: "290px",
      },
    },
  },
}));
function SearchBox({ handle, placeHolde }) {
  const [value, setValue] = useState("");
  return (
    <Search>
      <SearchIconWrapper onClick={()=> handle(value)}>
        <SearchIcon style={{ fontSize: "25px", color: "gray" }} />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={(e)=> setValue(e.target.value)}
        placeholder={placeHolde}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}

export default SearchBox;
