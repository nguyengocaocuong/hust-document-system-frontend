import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function NewDocumentModal() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file)=> console.log(file))
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  return (
    <Box p={2}>
      <Typography variant="h3" textAlign={"center"} color={"text.secondary"}>
        Thêm tài liệu mới
      </Typography>
      <Box
        width={"350px"}
        height={"150px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        border={`1px dotted ${isDragActive ? 'blue': 'gray'}`}
        {...getRootProps()}
      >
        <input  {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
    </Box>
  );
}

export default NewDocumentModal;
