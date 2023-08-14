import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

function PostSkeleton() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      width={"100%"}
      height={"calc(100% - 72px)"}
      overflow={"hidden"}
    >
      <Box width={"90%"} minWidth={"450px"} maxWidth={"650px"} pt={2} pb={2}>
        <Stack spacing={3} width={"100%"}>
          <Stack spacing={1} width={"100%"}>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack spacing={1} width={"calc(100% - 40px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Stack direction={"row"} spacing={1}>
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
            </Stack>
          </Stack>{" "}
          <Stack spacing={1} width={"100%"}>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack spacing={1} width={"calc(100% - 40px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Stack direction={"row"} spacing={1}>
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default PostSkeleton;
