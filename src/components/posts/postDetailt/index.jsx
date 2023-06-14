import React from "react";
import BoxFull from "../../../components/BoxFull";
import { Box } from "@mui/material";
import { useGetPostDetailQuery } from "../../../services/PostService";
import { useParams } from "react-router-dom";
import PostInfo from "./PostInfo";
import ImageViewer from "../../ImageViewer";
import { useState } from "react";
import ConfirmModal from "../../modal/ComfirmModal";
function PostDetailt() {
  const { id } = useParams();
  const { data: postDetail, isSuccess } = useGetPostDetailQuery(id);
  const [language, setLanguage] = useState("ROOT");
  const [open, setOpen] = useState({ open: false, item: null });
  const closeModal = () => setOpen({ open: false, item: null });
  const openModal = (item) => setOpen({ open: true, item });
  const message =
    "Hiện tại chức năng dịch hình ảnh đang được phát triển, chúng tôi sẽ sớm cung cấp chức năng này sớm nhất có thể, cảm ơn bạn đã sử dụng.";
  const handleSelectLanguage = (value) => {
    openModal();
    setLanguage(value);
  };
  const onSelect = ()=>{
    setLanguage("ROOT")
    closeModal()
  }
  return isSuccess ? (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} height={"100%"}>
        <Box width={`70%`}>
          <ImageViewer
            url={postDetail.document?.path}
            description={postDetail.description}
          />
        </Box>
        <PostInfo
          postDetail={postDetail}
          language={{ value: language, select: handleSelectLanguage }}
        />
      </Box>
      {open.open && (
        <ConfirmModal
          message={message}
          open={open.open}
          closeModal={closeModal}
          action={onSelect}
        />
      )}
    </BoxFull>
  ) : (
    <></>
  );
}

export default PostDetailt;
