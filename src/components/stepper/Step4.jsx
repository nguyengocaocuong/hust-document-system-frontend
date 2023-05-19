import React, { useState } from "react";
import BoxBetween from "../../containers/BoxBetween";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const Step4 = ({ setting }) => {
  const [isDone, setIsDone] = useState(false)
  return (
    <BoxBetween>
      <Box border={"1px dotted gray"} textAlign={"center"} p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Thiết lập bài viết
          </Typography>
        </Box>
        <Box p={2}>
          <FormControl sx={{ textAlign: "start" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              <Typography variant="h4" color={"text.primary"}>
                Trạng thái
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={isDone}
              onChange={(e)=> setIsDone(e.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Hoàn thành"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Đang viết"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button variant="contained" sx={{textTransform:'none'}} onClick={()=> setting(isDone)}>Lưu bài viết</Button>
      </Box>
    </BoxBetween>
  );
};
export default Step4;
