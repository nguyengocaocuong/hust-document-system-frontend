import {
  Box,
  Chip,
  Divider,
  Grid,
  InputBase,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import MultipleSelect from "../components/MultipleSelect";
import { DatePicker } from "@mui/x-date-pickers";
import Owner from "../components/Owner";
import { Flag } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BoxBetween from "../components/BoxBetween";
import { useState } from "react";
function Report() {
  const pageSize = 6;
  const reports = [
    {
      owner: { firstName: "Nguyễn Ngô", lastName: "Cao Cường" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Aguyễn Đức", lastName: "Lâm" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Dguyễn Ngô", lastName: "Thư" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Lguyễn Ngô", lastName: "Hiếu" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Kguyễn Ngô", lastName: "Đạt" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Tguyễn Ngô", lastName: "Hoàng" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Uguyễn Ngô", lastName: "Phúc" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Yguyễn Ngô", lastName: "Ngọc" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Bguyễn Ngô", lastName: "Bảo" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Gguyễn Ngô", lastName: "Thành" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Hguyễn Ngô", lastName: "Hiền" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Tguyễn Ngô", lastName: "Dương" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
    {
      owner: { firstName: "Yguyễn Ngô", lastName: "Giang" },
      createdAt: new Date(),
      message: `Bài viết này chứa nhiều nội dung và lời nói không đúng chuẩn mực, yêu cầu admin gỡ bài viết này xuống Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati dolorem vitae eos voluptas iste porro saepe ex sunt quasi laborum voluptatem sint repellendus, iusto sequi nesciunt! Saepe, fugit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, minus commodi blanditiis necessitatibus consequatur, id saepe, cum repudiandae omnis totam magni odio eius recusandae rerum optio itaque veritatis earum labore. voluptatum.`,
    },
  ];
  const [page, setPage] = useState(1);
  const currentData = [];
  for (
    let i = pageSize * (page - 1);
    i < page * pageSize && i < reports.length;
    i++
  ) {
    currentData.push(reports[i]);
  }

  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        height={"60px"}
        sx={{ backgroundColor: "#F0F0F0" }}
        px={2}
      >
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn loại báo cáo
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn đối tượng bị báo cáo
        </Typography>
        <MultipleSelect items={[]} />
        <Typography fontSize={"17px"} fontWeight={"bold"} mr={1}>
          Chọn thời gian
        </Typography>
        <DatePicker value={null} />
      </Box>
      <Box height={"calc(100% - 120px)"} width={"100%"} overflow={"auto"} p={2}>
        <BoxBetween>
          <Box height={"550px"} width="100%">
            <Grid container spacing={2} width={"100%"}>
              {currentData.map((report, index) => (
                <Grid item xl={4} key={index}>
                  <Box
                    width={"100%"}
                    height={"260px"}
                    sx={{
                      backgroundColor: "#F0F0F0",
                      "&:hover": { boxShadow: 4 },
                      cursor: "pointer",
                      transition: "box-shadow 0.4s",
                    }}
                    borderRadius={1}
                    overflow={"hidden"}
                  >
                    <Owner
                      owner={report.owner}
                      createdAt={report.createdAt}
                      listItem={[
                        <Chip
                          key={1}
                          color="error"
                          label={"Báo cáo nội dung"}
                          icon={<Flag />}
                        />,
                      ]}
                    />
                    <Box
                      px={2}
                      py={1}
                      height={"130px"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                    >
                      <Typography fontSize={"15px"} overflow={"hidden"}>
                        {report.message}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      height={"55px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      px={2}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        width={"65%"}
                        sx={{
                          backgroundColor: "white",
                          py: 0.5,
                          px: 1,
                          borderRadius: 5,
                          boxShadow: 1,
                        }}
                      >
                        <InputBase
                          placeholder="Nếu xác nhận hãy cho biết lý do"
                          sx={{ width: "100%" }}
                        />
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Tooltip title="Kiểm tra">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              height: "35px",
                              cursor: "pointer",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <RemoveRedEyeOutlinedIcon color="warning" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Phê duyệt">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                            mx={1}
                          >
                            <OfflinePinIcon color="success" />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            sx={{
                              backgroundColor: "white",
                              width: "35px",
                              cursor: "pointer",
                              height: "35px",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <RemoveCircleOutlineIcon color="error" />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </BoxBetween>
      </Box>
      <Box
        height={"60px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        px={3}
      >
        <Pagination
          page={page}
          onChange={(e, value) => setPage(value)}
          count={Math.ceil(reports.length / pageSize)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </BoxFull>
  );
}

export default Report;
