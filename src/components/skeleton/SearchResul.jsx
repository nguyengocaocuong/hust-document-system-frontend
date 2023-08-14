import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

function SearchResul() {
  return (
    <Stack spacing={2} width={"100%"} height={"100%"} overflow={"hidden"}>
      <Stack spacing={1} width={"100%"}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={"100%"} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={"100%"} />
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Skeleton variant="rectangular" width={180} height={180} />
          <Stack spacing={1} width={"calc(100% - 166px)"}>
            <Skeleton variant="text" width={"100%"} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
            <Stack direction={"row"} spacing={2}>
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
            </Stack>
            <Box display={"flex"} justifyContent={"end"}>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2} width={"100%"}></Stack>
      </Stack>
      <Stack spacing={1} width={"100%"}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={"100%"} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={"100%"} />
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Skeleton variant="rectangular" width={160} height={160} />
          <Stack spacing={1} width={"calc(100% - 166px)"}>
            <Skeleton variant="text" width={"100%"} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
            <Stack direction={"row"} spacing={2}>
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
              <Skeleton variant="rounded" width={"100%"} height={30} />
            </Stack>
            <Box display={"flex"} justifyContent={"end"}>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2} width={"100%"}></Stack>
      </Stack>
    </Stack>
  );
}

export default SearchResul;
