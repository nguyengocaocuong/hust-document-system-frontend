import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import searchMenuIcon from "../assets/images/search.svg";
import { documentType } from "../settings/SubjectSetting";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MultipleSelect from "./MultipleSelect";
import { useLocation } from "react-router-dom";
function SearchBox({ placeHolde, searchBoxRef }) {
  const [isSearch, setIsSearch] = useState({ basic: false, advane: false });
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <></>,
    prevArrow: <></>,
  };
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
        border: "1px solid gray",
        display: location.pathname.startsWith("/search") ? "none" : "block",
      }}
    >
      <Box height={"40px"} width={"100%"} display={"flex"}>
        <IconButton
          onClick={() => setIsSearch({ basic: !isSearch.basic, advane: false })}
        >
          <SearchIcon sx={{ width: "25px", height: "25px" }} />
        </IconButton>
        <InputBase
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "17px",
          }}
          placeholder={placeHolde}
        />
        <IconButton
          sx={{
            right: 0,
            top: 0,
            color: "red",
            zIndex: 10,
          }}
          onClick={() =>
            setIsSearch({ basic: false, advane: !isSearch.advane })
          }
        >
          <img
            src={searchMenuIcon}
            style={{ width: "22px", height: "22px" }}
            alt=""
          />
        </IconButton>
      </Box>
      <Box
        width={"100%"}
        height={"150px"}
        bgcolor={"transparent"}
        display={isSearch.basic ? "block" : "none"}
      >
        <Divider />
        <Box width={"100%"} overflow={"hidden"} height={"100px"} p={0.5}>
          <Slider {...settings}>
            {Object.keys(documentType).map((item, index) => (
              <Box
                key={index}
                width={"100px"}
                height={"92px"}
                display={"flex"}
                justifyContent={"center"}
                textAlign={"center"}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#ECECEC",
                  },
                }}
                p={1.5}
              >
                <Box display={"flex"} justifyContent={"center"}>
                  <img
                    src={documentType[item].img}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      display: "block",
                    }}
                  />
                </Box>
                <Typography
                  width={"100%"}
                  fontSize={"13px"}
                  py={1}
                  fontWeight={"bold"}
                  color={documentType[item].color}
                >
                  {documentType[item].subTitle}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box width={"100%"}>
            <Slider {...settings} variableWidth={true}>
              {Object.keys(documentType).map((item, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  justifyContent={"center"}
                  textAlign={"center"}
                  width={"auto"}
                  px={0.5}
                >
                  <Chip label={item} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
      <Box
        width={"100%"}
        bgcolor={"transparent"}
        display={isSearch.advane ? "block" : "none"}
      >
        <Divider />
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}>
            Đối tượng
          </Typography>
          <MultipleSelect width="66%" />
        </Box>
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}>
            Chủ sở hữu
          </Typography>
          <MultipleSelect width="66%" />
        </Box>
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}>
            Môn học
          </Typography>
          <MultipleSelect width="66%" />
        </Box>
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}>
            Giảng viên
          </Typography>
          <MultipleSelect width="66%" />
        </Box>
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}>
            Loại tài liệu
          </Typography>
          <MultipleSelect width="66%" />
        </Box>
        <Box
          width={"100%"}
          py={0.5}
          px={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography fontWeight={"bold"} width={"30%"}></Typography>
          <Checkbox />
          <Typography>Đa ngôn ngữ</Typography>
        </Box>
        <Divider />
        <Box px={2} py={1} justifyContent={"end"} display={"flex"}>
          <Stack spacing={1} direction={"row"}>
            {" "}
            <Button variant="outlined">Đặt lại</Button>
            <Button variant="contained">Tìm kiếm</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchBox;
