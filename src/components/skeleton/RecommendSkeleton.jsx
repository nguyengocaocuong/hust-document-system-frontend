import { Skeleton, Stack } from "@mui/material";
import React from "react";

function RecommendSkeleton() {
  return (
    <Stack width={"100%"} px={2} height={"100%"} overflow={"hidden"}>
      <Stack spacing={1} width={"100%"}>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack spacing={1} width={"calc(100% - 40px)"}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.7rem" }}
              width={"60%"}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1} width={"100%"}>
          <Skeleton variant="rectangular" width={100} height={100} />
          <Stack width={"calc(100% - 100px)"} height={"auto"} spacing={0}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
              height={"80px"}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={1} width={"100%"}>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack spacing={1} width={"calc(100% - 40px)"}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.7rem" }}
              width={"60%"}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1} width={"100%"}>
          <Skeleton variant="rectangular" width={100} height={100} />
          <Stack width={"calc(100% - 100px)"} height={"auto"} spacing={0}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
              height={"80px"}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={1} width={"100%"}>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack spacing={1} width={"calc(100% - 40px)"}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.7rem" }}
              width={"60%"}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1} width={"100%"}>
          <Skeleton variant="rectangular" width={100} height={100} />
          <Stack width={"calc(100% - 100px)"} height={"auto"} spacing={0}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
              height={"80px"}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RecommendSkeleton;
