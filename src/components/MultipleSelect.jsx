import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, InputBase, Typography } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      padding: 0,
      maxHeight: "300px",
    },
  },
};

export default function MultipleSelect({
  items = [],
  title,
  width,
  all = true,
  handle = (e) => console.log(e)
}) {
  const handleChange = (e) => {
    handle(e.target.value)
  };
  const [key, setKey] = React.useState("");
  const onChangeKey = (e) => {
    setKey(e.target.value);
  };
  return (
    <div>
      <FormControl sx={{ minWidth: { width }, mr: 2 }} size="small">
        <Select
          defaultValue={""}
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (!selected) {
              return <em>{title}</em>;
            }
            return selected;
          }}
          style={{ backgroundColor: "white" }}
        >
          <Box
            value={null}
            sx={{
              textAlign: "start",
              m: 1,
              p: 0.5,
              backgroundColor: "#EBECEC",
              borderRadius: 1,
            }}
          >
            <InputBase
              placeholder="Tìm kiếm nhanh"
              value={key}
              onChange={onChangeKey}
              sx={{ color: "text.secondary" }}
            />
          </Box>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              sx={{
                textAlign: "start",
                pl: 1,
                pt: 1,
                "&:hover": { backgroundColor: "#C9CFDB" },
              }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
          {all && (
            <MenuItem
              value={null}
              sx={{
                textAlign: "start",
                pl: 1,
                pt: 1,
                "&:hover": { backgroundColor: "#C9CFDB" },
              }}
            >
              <Typography style={{ marginLeft: "5px" }}>Tất cả</Typography>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
