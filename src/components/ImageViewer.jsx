import { Box, Typography } from "@mui/material";
import React from "react";

function ImageViewer({ url, description }) {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      borderRight="1px solid #D8D9D9"
      borderBottom="1px solid #D8D9D9"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
      sx={{ backgroundColor: "black" }}
    >
      <img
        src={url}
        alt={"??"}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: "auto",
          height: "auto",
        }}
      />
      {/* <Box
        width={"100%"}
        height={"200px"}
        position={"absolute"}
        bottom={0}
        left={0}
        sx={{
          p: 1.5,
          backgroundColor: "gray",
          opacity: "0.1",
          ".child": { display: "none" },
          "&:hover": {
            color: "white",
            opacity: 1,
            ".child": { display: "block" },
          },
          transition: "opacity 0.4s",
          zIndex: 10,
        }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack direction={"row"} height={"100%"} spacing={2} className="child">
          <img
            src={
              "https://toquoc.mediacdn.vn/280518851207290880/2023/3/1/anh-chup-man-hinh-2023-03-01-luc-103715-16776427393741654656719-1677645374816-16776453751381421828491.png"
            }
            alt={"??"}
            style={{
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() =>
              setCurrUrl(
                "https://toquoc.mediacdn.vn/280518851207290880/2023/3/1/anh-chup-man-hinh-2023-03-01-luc-103715-16776427393741654656719-1677645374816-16776453751381421828491.png"
              )
            }
          />
          <img
            src={url}
            alt={"??"}
            style={{
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() => setCurrUrl(url)}
          />
          <img
            src={
              "https://kenh14cdn.com/2020/5/7/anh-chup-man-hinh-2020-05-07-luc-21730-ch-15888359406891820122203-crop-1588835963421583199992.png"
            }
            alt={"??"}
            style={{
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() =>
              setCurrUrl(
                "https://kenh14cdn.com/2020/5/7/anh-chup-man-hinh-2020-05-07-luc-21730-ch-15888359406891820122203-crop-1588835963421583199992.png"
              )
            }
          />
        </Stack>
      </Box> */}
      <Box
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        p={2}
        sx={{
          backgroundColor: "gray",
          opacity: "0.1",
          "&:hover": { color: "white", opacity: 1 },
          transition: "opacity 0.4s",
          zIndex: 11,
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default ImageViewer;
