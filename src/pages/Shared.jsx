import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ListDocuments from "../components/documents/listDocuments";
import MultipleSelect from "../components/MultipleSelect";
import { filterSetting } from "../settings/SharedSetting";
import TableDocuments from "../components/documents/tableDocuments";
import { getIconForDocByFileName } from "../utils/DocumentUtils";
import avatar1 from "../assets/images/avatar/05.jpg";
import avatar2 from "../assets/images/avatar/06.jpg";
import avatar3 from "../assets/images/avatar/07.jpg";
import avatar4 from "../assets/images/avatar/1.jpg";
function Shared() {
  return (
    <Box
      pt={2}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
      sx={{ backgroundColor: "white" }}
    >
      <Box pt={0} p={2} pb={0} maxHeight={"80px"} height={"80px"}>
        <Typography variant="h4" color={"text.secondary"}>
          Tài liệu được chia sẻ
        </Typography>
        <Box display={"flex"}>
          {filterSetting.map((item, index) => (
            <MultipleSelect
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
                  <Typography style={{ marginLeft: "5px" }}>
                    {i.label}
                  </Typography>
                ),
              }))}
            />
          ))}
          <MultipleSelect
            title={"Chia sẻ bởi"}
            items={[
              { icon: <Avatar src={avatar1} alt="" sizes="small"/>, label: <Typography style={{ marginLeft: "5px" }}>Nguyễn Ngô Cao Cường</Typography> },
              { icon: <Avatar src={avatar2} alt="" sizes="small"/>, label: <Typography style={{ marginLeft: "5px" }}>Nguyễn Đình Cảnh</Typography> },
              { icon: <Avatar src={avatar3} alt="" sizes="small"/>, label: <Typography style={{ marginLeft: "5px" }}>Lê Quang Trà</Typography> },
              { icon: <Avatar src={avatar4} alt="" sizes="small"/>, label: <Typography style={{ marginLeft: "5px" }}>Mai Đình Trọng</Typography> },
            ]}
          />
        </Box>
      </Box>
      <ListDocuments />
      <TableDocuments />
    </Box>
  );
}

export default Shared;
