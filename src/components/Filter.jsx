import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import MultipleSelect from "../components/MultipleSelect";
import avatar1 from "../assets/images/avatar/1.jpg";
import avatar2 from "../assets/images/avatar/05.jpg";
import avatar3 from "../assets/images/avatar/06.jpg";
import avatar4 from "../assets/images/avatar/07.jpg";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
function Filter({data}) {
  return (
    <Box display={"flex"}>
      {data.map((item, index) => (
        <MultipleSelect
          key={index}
          title={item.title}
          items={item.item.map((i) => ({
            icon: i.icon && (
              <img
                src={getIconForDocByFileName(i.icon)}
                alt=""
                width={"20px"}
                height={"20px"}
              />
            ),
            label: (
              <Typography style={{ marginLeft: "5px" }}>{i.label}</Typography>
            ),
          }))}
        />
      ))}
      <MultipleSelect
        title={"Chia sẻ bởi"}
        items={[
          {
            icon: <Avatar src={avatar1} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Nguyễn Ngô Cao Cường
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar2} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Nguyễn Đình Cảnh
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar3} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Lê Quang Trà
              </Typography>
            ),
          },
          {
            icon: <Avatar src={avatar4} alt="" sizes="small" />,
            label: (
              <Typography style={{ marginLeft: "5px" }}>
                Mai Đình Trọng
              </Typography>
            ),
          },
        ]}
      />
    </Box>
  );
}

export default Filter;
