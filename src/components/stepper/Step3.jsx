import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import BoxBetween from "../../components/BoxBetween";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import draftToHtml from "draftjs-to-html";
import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "../Editor";
const Step3 = ({ setContent }) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const handleNextStep = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setContent(html)
  };
  return (
    <BoxBetween>
      <Box
        width={"85%"}
        border={"1px dotted gray"}
        textAlign={"center"}
        p={2}
        height={"500px"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Nhập nội dung cho bài viết
          </Typography>
          <Tooltip title="Lưu bài viết">
            <IconButton color="primary" onClick={handleNextStep}>
              <SaveAsIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box height={"calc(100% - 40px)"}>
          <Editor editorState={editorState} setEditorState={setEditorState} />
        </Box>
      </Box>
    </BoxBetween>
  );
};
export default Step3;
