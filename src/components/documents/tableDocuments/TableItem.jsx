import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import avatar from "../../../assets/images/avatar/05.jpg";
import { getIconForDocByFileName } from "../../../utils/DocumentUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropperMenu from "../../PropperMenu";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {  useNavigate } from "react-router-dom";
const getAction = (navigate, document)=>{
  return [
    {
      icon:<VisibilityIcon sx={{fontSize:'13px', marginRight:'5px'}}/>,
      label:<Typography sx={{fontSize: '13px'}}>Xem chi tiết</Typography>,
      handle:(close)=>{navigate(`/document/1`);close()}
    },
    {
      icon:<DeleteIcon sx={{fontSize:'13px', marginRight:'5px'}}/>,
      label:<Typography sx={{fontSize: '13px'}}>Xóa</Typography>,
      handle:(close)=>{console.log('click');close()}
    },
  ]
}
function TableItem({
  data = {
    name: ".pdf",
    description:
      "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
    sharedAt: "01/23/2012",
    documentType: "SLIDE",
    owner: { avatar, name: "Nguyễn Ngô Cao Cuong" },
  },
}) {
  const navigate = useNavigate()

  return (
    <Box
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"50px"}
      justifyContent={"space-between"}
    >
      <Box width={"40px"}>
        <img
          src={getIconForDocByFileName(data.name)}
          width={"20px"}
          height={"20px"}
          alt=""
        />
      </Box>
      <Typography width={"50%"} noWrap>
        {data.description}
      </Typography>
      <Box display={"flex"} alignItems={"center"} width={"17%"}>
        <Avatar
          sx={{ width: "30px", height: "30px", marginRight: "5px" }}
          src={data.owner.avatar}
        />
        <Typography sx={{ fontSize: "13px" }}>{data.owner.name}</Typography>
      </Box>
      <Typography
        sx={{ fontWeight: "bold", width: "10%" }}
        color={"primary.main"}
      >
        {data.documentType}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"8%"}>
        {data.sharedAt}
      </Typography>
      <Box
        width={"4%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <PropperMenu icon={<MoreVertIcon />} action={getAction(navigate, data)}/>
      </Box>
    </Box>
  );
}

export default TableItem;
