import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LanguageIcon from "@mui/icons-material/Language";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";
import { formatTimeAgo } from "../../utils/ConvertDate";
import BoxFull from "../BoxFull";
import { useGetAllHistoryQuery } from "../../services/HistoryService";
import { useEffect } from "react";

const History = () => {
  const navigate = useNavigate();
  const [isHelperBox] = useState(false);
  const [checkBoxHistory, setCheckBoxHistory] = useState([]);
  const [historys, setihistorys] = useState([]);
  const { data } = useGetAllHistoryQuery();
  useEffect(() => {
    setihistorys(data || []);
  }, [data]);
  const handleCheckBox = (item) => {
    const check = checkBoxHistory.find((history) => history.id === item.id);
    if (check)
      setCheckBoxHistory((preState) =>
        preState.filter((history) => history.id !== item.id)
      );
    else setCheckBoxHistory((preState) => [...preState, item]);
  };
  const handleOpen = () => {
    checkBoxHistory
      .map((history) => history.subjectDocument)
      .filter(
        (item, index, self) => self.findIndex((t) => t.id === item.id) === index
      )
      .forEach((subjectDocument) =>
        window.open(
          `http://localhost:3000/education/subject-document/${subjectDocument.id}`
        )
      );
  };
  return (
    <BoxFull>
      <Stack
        spacing={0}
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        pb={isHelperBox && "100px"}
      >
        <Stack
          py={1}
          px={2}
          spacing={2}
          direction={"row"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#9eb57d",
            borderBottom: "0.2px solid #D8D9D9",
          }}
        >
          <Checkbox sx={{ opacity: 0 }} />
          <Typography
            variant="h4"
            fontWeight={"bold"}
            width={"10%"}
            color={"text.secondary"}
            noWrap
          >
            Thời gian
          </Typography>
          <Typography
            variant="h4"
            color={"text.secondary"}
            width={"40%"}
            fontWeight={"bold"}
            noWrap
          >
            Mô tả tài liệu
          </Typography>
          <Typography
            variant="h4"
            width={"30%"}
            color={"text.secondary"}
            fontWeight={"bold"}
            noWrap
          >
            Link truy cập
          </Typography>
        </Stack>
        {historys?.map((history) => (
          <Stack
            py={1}
            px={2}
            spacing={2}
            direction={"row"}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            sx={{
              backgroundColor: checkBoxHistory.find(
                (item) => history.id === item.id
              )
                ? "#E7F8CE"
                : "white",
              "&:hover": {
                backgroundColor: "#E7F8CE",
              },
              borderBottom: "0.2px solid #D8D9D9",
            }}
          >
            <Checkbox
              onChange={() => handleCheckBox(history)}
              color="success"
              value={
                checkBoxHistory.find((item) => history.id === item.id) !==
                undefined
              }
            />
            <Typography variant="h5" width={"10%"} noWrap>
              {formatTimeAgo(history.createdAt)}
            </Typography>
            <Typography
              variant="h4"
              color={"text.secondary"}
              width={"40%"}
              noWrap
            >
              {history.subjectDocument.description}
            </Typography>
            <Typography variant="h6" width={"30%"} noWrap>
              {`http://localhost:3000/education/subject-document/
              ${history.subjectDocument.id}`}
            </Typography>
            <IconButton
              onClick={() =>
                navigate(
                  `/education/subject-document/${history.subjectDocument.id}`
                )
              }
              sx={{ "&:hover": { color: "blue" } }}
            >
              <RestoreIcon />
            </IconButton>
            <IconButton sx={{ "&:hover": { color: "red" } }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Box
        position={"fixed"}
        width={"100%"}
        bgcolor={"white"}
        bottom={0}
        left={0}
        boxShadow={10}
        sx={{
          transition: "height 0.4s",
          height: checkBoxHistory.length > 0 ? "90px" : 0,
          overflow: "hidden",
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={checkBoxHistory.length > 0 ? 2 : 0}
      >
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            display={"flex"}
            alignItems={"center"}
            onClick={handleOpen}
          >
            <LanguageIcon sx={{ mr: 1 }} />
            Mở tài liệu
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="warning"
            display={"flex"}
            alignItems={"center"}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Tải xuống
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            display={"flex"}
            alignItems={"center"}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Xóa lịch sử
          </Button>
        </Stack>
      </Box>
    </BoxFull>
  );
};

export default History;
