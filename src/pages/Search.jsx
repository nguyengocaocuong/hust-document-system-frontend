import { Box, Button, InputBase } from "@mui/material";
import React from "react";
import logo from "../assets/images/logo/logo.png";
function Search() {
  return (
    <Box bgcolor={"white"} width={"100vw"} height={"100vh"} overflow={"hidden"}>
      <Box
        width={"100%"}
        height={"80px"}
        sx={{
          borderBottom: "1px solid #D8D9D9",
        }}
      >
        <Box display={"flex"} height={"100%"} width={"100%"}>
          <Box
            p={2}
            pl={4}
            height={"100%"}
            width={"400px"}
            display={"flex"}
            justifyContent={"start"}
          >
            <img src={logo} height={"100%"} alt={"logo"} />
          </Box>
          <Box
            py={2}
            px={4}
            display={"flex"}
            alignItems={"center"}
            borderRadius={2}
            height={"100%"}
          >
            <Box
              sx={{
                width: "800px",
                height: "100%",
                border: "1px solid #F1F3F4",
                borderRadius: 1,
                pl: 2,
                pr: 16,
                fontSize: "18px",
                position: "relative",
                "&.MuiInputBase-input:focus + &": {
                  border: "3px solid #F1F3F4",
                },

                "& .MuiInputBase-input::placeholder": {
                  fontSize: "18px",
                },
              }}
            >
              <InputBase
                placeholder={"Nhập key word để tìm kiếm tài liệu"}
                sx={{
                  width: "700px",
                  height: "100%",
                  fontSize: "18px",
                }}
              />
              <Button variant="contained">

              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width={"100%"} height={"calc(100% - 72px)"} display={"flex"}>
        <Box
          width={"400px"}
          sx={{
            borderRight: "1px solid #D8D9D9",
          }}
        ></Box>
        <Box width={"calc(100% - 400px)"}></Box>
      </Box>
    </Box>
  );
}

export default Search;
