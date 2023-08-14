import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

function SubjectDetailSkeleton() {
  return (
    <Box width={"calc(100vw - 250px)"} display={"flex"}>
      <Box width={350} p={2}>
        <Stack width={"100%"} spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Stack>
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Stack>
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Stack>
          <Stack spacing={1} direction={"row"} width={"100%"}>
            <Skeleton variant="rounded" width={"100%"} height={30} />
            <Skeleton variant="rounded" width={"100%"} height={30} />
            <Skeleton variant="rounded" width={"100%"} height={30} />
          </Stack>
          <Stack spacing={1} direction={"row"} width={"100%"}>
            <Skeleton variant="rounded" width={"100%"} height={30} />
            <Skeleton variant="rounded" width={"100%"} height={30} />
            <Skeleton variant="rounded" width={"100%"} height={30} />
          </Stack>
        </Stack>
      </Box>
      <Box width={"calc(100% - 350px)"} p={2}>
        <Grid container width={"100%"} spacing={2}>
          <Grid item xl={6} lg={6} mg={6} width={"100%"}>
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Stack direction={"row"} width={"100%"} spacing={1}>
                <Skeleton variant="rounded" width={"80px"} height={"80px"} />
                <Stack width={"calc(100% - 80px)"}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xl={6} lg={6} mg={6} width={"100%"}>
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Stack direction={"row"} width={"100%"} spacing={1}>
                <Skeleton variant="rounded" width={"80px"} height={"80px"} />
                <Stack width={"calc(100% - 80px)"}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xl={6} lg={6} mg={6} width={"100%"}>
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Stack direction={"row"} width={"100%"} spacing={1}>
                <Skeleton variant="rounded" width={"80px"} height={"80px"} />
                <Stack width={"calc(100% - 80px)"}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xl={6} lg={6} mg={6} width={"100%"}>
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Stack direction={"row"} width={"100%"} spacing={1}>
                <Skeleton variant="rounded" width={"80px"} height={"80px"} />
                <Stack width={"calc(100% - 80px)"}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xl={6} lg={6} mg={6} width={"100%"}>
            <Stack>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Stack direction={"row"} width={"100%"} spacing={1}>
                <Skeleton variant="rounded" width={"80px"} height={"80px"} />
                <Stack width={"calc(100% - 80px)"}>
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SubjectDetailSkeleton;
