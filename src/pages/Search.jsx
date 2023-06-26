import { Box, Button, InputBase, Stack } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import logo from "../assets/images/logo/logo_notext.png";
import { useState } from "react";
function Search() {
  const [key, setKey] = useState("");
  const onSearch = () => {};
  return (
    <BoxFull bgcolor={"white"}>
      <Stack
        spacing={1}
        direction={"row"}
        display={"flex"}
        alignItems={"center"}
        p={2}
      >
        <img src={logo} alt="" style={{ width: "35px", heigh: "35px" }} />
        <InputBase
          value={key}
          onChange={(e) => setKey(e.target.value)}
          sx={{
            borderRadius: 0,
            border: "1px solid #F0F0F0",
            width: "340px",
            px: 2,
            height: "35px",
          }}
        />
        <Button
          sx={{ borderRadius: 0 }}
          variant={"contained"}
          onClick={onSearch}
        >
          Tìm kiếm
        </Button>
        <a href="https://cse.google.com/cse?cx=c4a54c280d6484f27">Go to search</a>
      </Stack>
     
    </BoxFull>
  );
}

export default Search;
