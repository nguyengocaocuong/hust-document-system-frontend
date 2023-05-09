import React from "react";
import { Box, Typography } from "@mui/material";
function PostCardContent({ data }) {
  return (
    <Box width={"100%"}>
      <Typography variant="h6" color="text.secondary" p={"10px"} pb={"0"}>
        {data.description}
      </Typography>
      <Box mb={"10px"}>
        {data.content === null ? (
          <div
            style={{
              width: "100%",
              height: "300px",
              background: `url(${
                data.document.thumbnail
                  ? data.document.thumbnail
                  : "https://support.content.office.net/en-us/media/e0f0122a-066d-469e-8e5d-7fe7eda30c1d.png"
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        ) : (
          <div style={{paddingLeft:'16px', paddingRight:'16px'}} dangerouslySetInnerHTML={{ __html: data.content }}></div>
        )}
      </Box>
    </Box>
  );
}

export default PostCardContent;
