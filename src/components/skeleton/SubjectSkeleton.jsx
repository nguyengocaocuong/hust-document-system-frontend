import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

function SubjectSkeleton({ size }) {
  const id = [];
  for (var i = 0; i < size; i++) id.push(i);
  return (
    <Grid container spacing={4} px={2} py={2} width={"calc(100vw - 230px)"}>
      {id.map((i) => (
        <Grid key={i} item xs={6} md={6} lg={4} xl={4} width={"100%"}>
          <Stack spacing={1} width={"100%"}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem" }}
              width={"100%"}
            />
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="rectangular" width={35} height={35} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"calc(100% - 40px)"}
              />
            </Stack>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="rectangular" width={35} height={35} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.7rem" }}
                width={"calc(100% - 40px)"}
              />
            </Stack>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="rectangular" width={35} height={35} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.7rem" }}
                width={"calc(100% - 40px)"}
              />
            </Stack>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              width={"calc(100%)"}
            />
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
              <Skeleton variant="rounded" width={"100%"} height={40} />
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default SubjectSkeleton;
