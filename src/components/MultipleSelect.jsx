import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, Typography } from "@mui/material";

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
  width = "140px",
  value = "all",
  all = true,
  handle = (e) => console.log(e),
  style,
  size="small"
}) {
  return (
    <FormControl
      sx={{ minWidth: width, mr: 2, ...style}}
      size={size}
    >
      <InputLabel>{title}</InputLabel>
      <Select
        defaultValue={""}
        label={title}
        value={value}
        displayEmpty
        onChange={(e) => handle(e.target.value)}
        MenuProps={MenuProps}
        style={{ backgroundColor: "white" }}
      >
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
            value={"all"}
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
  );
}
