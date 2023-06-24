import { Box, InputBase, Typography } from "@mui/material";
import React from "react";
import { LanguageData } from "../settings/LanguageSetting";
import { useState } from "react";
function TranslateLanguage({ value, onClick, reset }) {
  const [key, setKey] = useState("");
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        p={1}
        width={"100%"}
        height={"120px"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <InputBase
          sx={{
            boxShadow: 3,
            width: "100%",
            borderRadius: "20px",
            px: 2,
            height:'40px'
          }}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Nhập ngôn ngữ muốn dịch"
        />
         <Typography
            onClick={reset}
            width={"100%"}
            textAlign={"center"}
            boxShadow={2}
            fontWeight={"bold"}
            color={"text.primary"}
            p={2}
            borderRadius={2}
            sx={{
              "&:hover": {
                color: value === 'ROOT' ? "white" : "red",
                boxShadow: 4,
              },
              cursor: "pointer",
              backgroundColor: value === 'ROOT' ? "#FF5D5D" : "",
              color: value === 'ROOT' ? "white" : "",
            }}
          >
            Hiển thị văn bản gốc
          </Typography>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        width={"100%"}
        maxHeight={"calc(100% - 120px)"}
        overflow={"auto"}
      >
       
        {LanguageData.filter(
          (item) =>
            key === undefined ||
            key.length === 0 ||
            item.title.toLocaleLowerCase().includes(key.toLocaleLowerCase())
        ).map((language, index) => (
          <Box
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            p={1}
            width={"50%"}
            key={index}
          >
            <Typography
              onClick={() => onClick(language.value)}
              width={"100%"}
              textAlign={"center"}
              boxShadow={2}
              fontWeight={"bold"}
              color={"text.primary"}
              p={2}
              borderRadius={2}
              sx={{
                "&:hover": {
                  color: value === language.value ? "white" : "red",
                  boxShadow: 4,
                },
                cursor: "pointer",
                backgroundColor: value === language.value ? "#FF5D5D" : "",
                color: value === language.value ? "white" : "",
              }}
            >
              {language.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TranslateLanguage;
