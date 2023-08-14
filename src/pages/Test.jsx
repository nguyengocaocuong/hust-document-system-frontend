import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import BoxBetween from "../components/BoxBetween";

function Test() {
  return (
    <Box width={"calc(100vw - 250px)"} display={"flex"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Stack
            spacing={1.5}
            width={"100%"}
            sx={{
              borderRadius: "25px",
              transition: "box-shadow 0.4s",
              overflow: "hidden",
              boxShadow: 2,
            }}
            p={2}
          >
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack width={"calc(100% - 48px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"50%"}
                />
              </Stack>
            </Stack>
            <BoxBetween>
              <Stack
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"80px"}
                />
                <Skeleton variant="rounded" width={"50px"} height={"50px"} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"100px"}
                />
              </Stack>
            </BoxBetween>
            <Skeleton variant="rounded" width={"100%"} height={"150px"} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Stack
            spacing={1.5}
            width={"100%"}
            sx={{
              borderRadius: "25px",
              transition: "box-shadow 0.4s",
              overflow: "hidden",
              boxShadow: 2,
            }}
            p={2}
          >
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack width={"calc(100% - 48px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"50%"}
                />
              </Stack>
            </Stack>
            <BoxBetween>
              <Stack
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"80px"}
                />
                <Skeleton variant="rounded" width={"50px"} height={"50px"} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"100px"}
                />
              </Stack>
            </BoxBetween>
            <Skeleton variant="rounded" width={"100%"} height={"150px"} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Stack
            spacing={1.5}
            width={"100%"}
            sx={{
              borderRadius: "25px",
              transition: "box-shadow 0.4s",
              overflow: "hidden",
              boxShadow: 2,
            }}
            p={2}
          >
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack width={"calc(100% - 48px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"50%"}
                />
              </Stack>
            </Stack>
            <BoxBetween>
              <Stack
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"80px"}
                />
                <Skeleton variant="rounded" width={"50px"} height={"50px"} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"100px"}
                />
              </Stack>
            </BoxBetween>
            <Skeleton variant="rounded" width={"100%"} height={"150px"} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Stack
            spacing={1.5}
            width={"100%"}
            sx={{
              borderRadius: "25px",
              transition: "box-shadow 0.4s",
              overflow: "hidden",
              boxShadow: 2,
            }}
            p={2}
          >
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <Skeleton variant="circular" width={40} height={40} />
              <Stack width={"calc(100% - 48px)"}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"50%"}
                />
              </Stack>
            </Stack>
            <BoxBetween>
              <Stack
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                  width={"80px"}
                />
                <Skeleton variant="rounded" width={"50px"} height={"50px"} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"100px"}
                />
              </Stack>
            </BoxBetween>
            <Skeleton variant="rounded" width={"100%"} height={"150px"} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Test;
