import { Box, Button, InputBase, Stack } from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import logo from "../assets/images/logo/logo_notext.png";
import { useState } from "react";
import { useSearchAllInWebsiteMutation } from "../services/SearchService";
function Search() {
  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  const [searchAllInWebsite] = useSearchAllInWebsiteMutation();
  const onSearch = () => {
    if (key.length <= 0) return;
    searchAllInWebsite({ q: key, sum: 40, startIndex: 1 }).then((response) => {
      setData(response.data?.items || []);
    });
  };

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
      </Stack>
      <Box width={"100%"} height={"calc(100% - 50px)"} overflow={"auto"}>
        <ul>
          {data.map((result) => (
            <li key={result.cacheId}>
              <a href={result.link}>{result.title}</a>
              <p>{result.snippet}</p>
            </li>
          ))}
        </ul>
      </Box>
    </BoxFull>
  );
}

export default Search;
