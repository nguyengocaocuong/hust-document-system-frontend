import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../Table";
import { getIconForDocByFileName } from "../../utils/DocumentUtils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { formatTimeAgo } from "../../utils/ConvertDate";
import { useGetSubjectDocumentSharedByUserMutation } from "../../services/SubjectService";
const headers = [
  { title: "", width: "30px" },
  { title: "Mã học phần", width: "10%" },
  { title: "Tên học phần", width: "25%" },
  { title: "Học kỳ", width: "8%" },
  { title: "Loại tài liệu", width: "12%" },
  { title: "Ngày chia sẻ", width: "10%" },
  { title: "", width: "18%" },
];
function Uploaded() {
  const preview = (item) => {};
  const copyUrl = (item) => {};
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"55px"}
      justifyContent={"space-between"}
    >
      <Box width={"30px"}>
        <img
          src={getIconForDocByFileName(item?.document.name)}
          width={"20px"}
          height={"20px"}
          alt=""
        />
      </Box>
      <Typography width={"10%"} noWrap>
        {item.subject.subjectCode}
      </Typography>
      <Typography width={"25%"} noWrap>
        {item?.subject.name}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"8%"}>
        {item.semester}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"12%"}>
        {item.subjectDocumentType.name}
      </Typography>
      <Typography sx={{ fontSize: "13px" }} width={"10%"}>
        {formatTimeAgo(item?.createdAt)}
      </Typography>
      <Box
        width={"18%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <Tooltip title={"Xem tài liệu"}>
            <IconButton onClick={() => preview(item.id)}>
              <RemoveRedEyeIcon
                color={"success"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Copy đường dẫn"}>
            <IconButton onClick={() => copyUrl(item.id)}>
              <CopyAllIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
  const [getSubjectDocumentSharedByUser] =
    useGetSubjectDocumentSharedByUserMutation();
  const [subjectDocument, setSubjectDocument] = useState([]);
  useEffect(() => {
    getSubjectDocumentSharedByUser(2).then((response) => {
      if (!response.error) {
        setSubjectDocument(response.data?.content || []);
      }
    });
  }, []);
  return (
    <Box width={"100%"} border={"1px solid #5054B6"}>
      <Table
        headers={headers}
        items={subjectDocument}
        renderItem={renderItem}
        pageSize={subjectDocument.length}
        itemHeight={57}
        showPagination={false}
      />
    </Box>
  );
}

export default Uploaded;
