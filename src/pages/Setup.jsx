import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Select from "react-select";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla2", label: "Vanilla" },
  { value: "vanilla3", label: "Vanilla" },
  { value: "vanilla5", label: "Vanilla" },
  { value: "vanilla6", label: "Vanilla" },
  { value: "vanilla7", label: "Vanilla" },
  { value: "vanilla8", label: "Vanilla" },
  { value: "vanilla9", label: "Vanilla" },
  { value: "vanilla10", label: "Vanilla" },
];
function Setup() {
  const [selected, setSelected] = useState([]);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <Stack
        spacing={4}
        width={"500px"}
        p={2}
        bgcolor={"white"}
        boxShadow={2}
        borderRadius={2}
      >
        <Stack spacing={1}>
          <Typography variant="h2">Bạn đang học môn nào</Typography>
          <Typography variant="h5">
            Việc lựa chọn môn học, giúp chúng tôi trong việc hiển thị các tài
            liệu mà bạn cần
          </Typography>
        </Stack>
        <Select
          options={options}
          isMulti
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "50px",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              fontSize: "18px",
            }),
            placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
          }}
          placeholder={"Chọn môn học..."}
          onChange={(e) => setSelected(e)}
        />
        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="outlined"
            disabled={selected.length === 0}
            display={"flex"}
            alignItems={"center"}
          >
            Tiếp tục <NavigateNextIcon />
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default Setup;
