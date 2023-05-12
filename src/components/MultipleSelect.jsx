import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      padding: 0,
    },
  },
};

export default function MultipleSelect({ items, title }) {
  const [selected, setSelectedId] = React.useState();
  const handleChange = (event) => {
    setSelectedId(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: "100px" }} size="small">
        <Select
          displayEmpty
          value={selected}
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
          {items.map((item, index) => (
            <MenuItem
              key={index}
              value={item.label}
              sx={{ textAlign: "start", pl:1, pt:1, "&:hover":{backgroundColor:'#C9CFDB'} }}
            >
              {item.icon} 
              {item.label}
            </MenuItem>
          ))}
           <MenuItem
              value={null}
              sx={{ textAlign: "start", pl:1, pt:1, "&:hover":{backgroundColor:'#C9CFDB'} }}
            >
              <Typography style={{marginLeft:'5px'}}>Tất cả</Typography>
            </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
