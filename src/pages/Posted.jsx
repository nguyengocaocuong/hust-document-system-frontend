import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import MultipleSelect from "../components/MultipleSelect";
function Posted() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        height={"100%"}
      >
        <Box
          width={"25%"}
          height={"100%"}
          borderRight="1px solid #D8D9D9"
          sx={{ backgroundColor: "white" }}
          p={2}
          display={"flex"}
          a
          justifyContent={"center"}
        >
          <Stack spacing={4}>
            <Box>
              <Typography
                variant="h3"
                color={"text.secondary"}
                sx={{ fontWeight: "bold" }}
              >
                Bài viết của bạn
              </Typography>
              <Box p={1} pt={2}>
                <Stack spacing={1.5}>
                  <Typography variant="h5">Hỏi đáp</Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Review giảng viên
                  </Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Review môn học
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Lọc bài viết
              </Typography>
              <Box p={1} pt={2}>
                <Stack spacing={1.5}>
                  <MultipleSelect
                    title={"Giảng viên"}
                    items={[]}
                    width={"150px"}
                  />
                  <MultipleSelect
                    title={"Môn học"}
                    items={[]}
                    width={"150px"}
                  />
                  <MultipleSelect title={"Học kỳ"} items={[]} width={"150px"} />
                </Stack>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Trạng thái bài viết
              </Typography>
              <Box p={1} pt={2}>
                <Stack spacing={1.5}>
                  <Typography variant="h5" color={"red"}>
                    Tất cả
                  </Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Đang viết
                  </Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Chờ phê duyệt
                  </Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Đã phê duyệt
                  </Typography>
                  <Typography variant="h5" color={"text.primary"}>
                    Bị báo cáo
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box
          width={"75%"}
          height={"100%"}
          sx={{ backgroundColor: "white" }}
          p={2}
        >
          <Typography
            variant="h3"
            color={"text.secondary"}
            sx={{ fontWeight: "bold" }}
          >
            Danh sách bài viết
          </Typography>
          <Box p={2}>
            <Grid container spacing={1}>
              <Grid item xl={6}>
                d
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Posted;
