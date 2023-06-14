import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import profile from "../assets/images/avatar/profile.png";
import svg1 from "../assets/images/svg/svgexport-1.svg";
import svg2 from "../assets/images/svg/svgexport-2.svg";
import svg3 from "../assets/images/svg/svgexport-3.svg";
import svg4 from "../assets/images/svg/svgexport-4.svg";
import svg5 from "../assets/images/svg/svgexport-5.svg";
import svg6 from "../assets/images/svg/svgexport-6.svg";
import svg7 from "../assets/images/svg/svgexport-7.svg";
import svg8 from "../assets/images/svg/svgexport-8.svg";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material";
import BoxBetween from "../components/BoxBetween";
import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../services/AdminUserService";
import { formatTimeAgo } from "../utils/ConvertDate";
function UserInfo() {
  const { id } = useParams();
  const theme = useTheme();
  const { data, isSuccess } = useGetUserProfileQuery(id);
  return isSuccess ? (
    <Box>
      <Box
        sx={{ backgroundImage: `url(${data.user.avatar || profile})` }}
        width={"100%"}
        height={"380px"}
        borderRadius={"8px"}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          top={"calc(100% - 50px)"}
          right={"0px"}
          height={"50px"}
          width={"250px"}
          sx={{ backgroundColor: "white", borderRadius: "10px 10px 0 0" }}
        >
          <BoxBetween height={"100%"}>
            <Typography variant="h4">{`${data.user.firstName} ${data.user.lastName}`}</Typography>
          </BoxBetween>
        </Box>
      </Box>
      <Grid container spacing={2} mt={"20px"}>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box p="20px" height={"180px"}>
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb={"15px"}
              >
                Tổng quan người dùng{" "}
              </Typography>
              <Typography variant="h5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Scelerisque.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box
              p="20px"
              height={"180px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <img src={svg1} alt="svg" width={"50px"} />
              <Typography
                variant="h2"
                style={{
                  fontWeight: "bold",
                  margin: "10px 0",
                  color: "#8F93F6",
                }}
              >
                {data.subjectDocumentTotal}+
              </Typography>
              <Typography
                variant="h3"
                style={{ fontWeight: 400, color: "#8F93F6" }}
              >
                Tài liệu
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box
              p="20px"
              height={"180px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <img src={svg3} alt="svg" width={"50px"} />
              <Typography
                variant="h2"
                style={{
                  fontWeight: "bold",
                  margin: "10px 0",
                  color: "#FAD263",
                }}
              >
                {data.postTotal + data.reviewTotal}+
              </Typography>
              <Typography
                variant="h3"
                style={{ fontWeight: 400, color: "#FAD263" }}
              >
                Bài viết
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box
              p="20px"
              height={"180px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <img src={svg2} alt="svg" width={"50px"} />
              <Typography
                variant="h2"
                style={{
                  fontWeight: "bold",
                  margin: "10px 0",
                  color: "#7FDD85",
                }}
              >
                {formatTimeAgo(data.user.createdAt)}
              </Typography>
              <Typography
                variant="h3"
                style={{ fontWeight: 400, color: "#7FDD85" }}
              >
                Tham gia
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={8}>
          <Grid container spacing={2}>
            <Grid item xl={6}>
              <Paper elevation={1}>
                <Box p="20px" height={"220px"}>
                  <Typography
                    variant="h3"
                    color={theme.palette.text.secondary}
                    mb={"20px"}
                  >
                    Đóng góp cho website
                  </Typography>

                  <Stack spacing={2}>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography
                        display={"inline-block"}
                        variant="h5"
                        width={"15%"}
                      >
                        Tài liệu
                      </Typography>
                      <Box width={"50%"}>
                        <LinearProgress
                          variant="determinate"
                          value={75}
                          color="warning"
                          sx={{ height: "5px", borderRadius: "10px" }}
                        />
                      </Box>
                      <Typography
                        display={"inline-block"}
                        variant="h3"
                        width={"15%"}
                        sx={{ fontWeight: 700, color: "#ED6C02" }}
                      >
                        {data.subjectDocumentTotal}+
                      </Typography>
                    </Box>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography
                        display={"inline-block"}
                        variant="h5"
                        width={"14%"}
                      >
                        Review
                      </Typography>
                      <Box width={"50%"}>
                        <LinearProgress
                          color="success"
                          value={65}
                          variant="determinate"
                          sx={{ height: "5px", borderRadius: "10px" }}
                        />
                      </Box>
                      <Typography
                        display={"inline-block"}
                        variant="h3"
                        width={"15%"}
                        sx={{ fontWeight: 700, color: "#7FDD85" }}
                      >
                        {data.reviewTotal}
                      </Typography>
                    </Box>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography
                        display={"inline-block"}
                        variant="h5"
                        width={"15%"}
                      >
                        Post
                      </Typography>
                      <Box width={"50%"}>
                        <LinearProgress
                          variant="determinate"
                          value={24}
                          color="primary"
                          sx={{ height: "5px", borderRadius: "10px" }}
                        />
                      </Box>
                      <Typography
                        display={"inline-block"}
                        variant="h3"
                        width={"15%"}
                        sx={{ fontWeight: 700, color: "#FCBBA5" }}
                      >
                        {data.postTotal}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
            <Grid item xl={6}>
              <Paper elevation={1}>
                <Box p="20px" height={"220px"}>
                  <Typography
                    variant="h3"
                    color={theme.palette.text.secondary}
                    mb={"20px"}
                  >
                    Trang cá nhân
                  </Typography>

                  <Stack spacing={2}>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                    >
                      <FacebookOutlinedIcon
                        style={{
                          marginRight: "20px",
                          fontSize: "25px",
                          color: "#ED6C02",
                        }}
                      />
                      <Typography noWrap variant="h3" color={"#ED6C02"}>
                        {data.user.facebookUrl}
                      </Typography>
                    </Box>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                    >
                      <TwitterIcon
                        style={{
                          marginRight: "20px",
                          fontSize: "25px",
                          color: "#2E7D32",
                        }}
                      />
                      <Typography variant="h3" color={"#2E7D32"} noWrap>
                        {data.user.twitterUrl}
                      </Typography>
                    </Box>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                    >
                      <InstagramIcon
                        style={{
                          marginRight: "20px",
                          fontSize: "25px",
                          color: "#6C71F3",
                        }}
                      />
                      <Typography variant="h3" color={"#6C71F3"} noWrap>
                        {data.user.instagramUrl}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
            <Grid item xl={12}>
              <Paper elevation={1}>
                <Box p="20px" height={"180px"}>
                  <Typography
                    variant="h3"
                    color={theme.palette.text.secondary}
                    mb={"20px"}
                  >
                    Vi phạm
                  </Typography>
                  <Stack spacing={2}>
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      width={"100%"}
                      alignItems={"center"}
                    >
                      <Box width={"8%"}>
                        <Avatar
                          style={{
                            backgroundColor: "#EF9FC4",
                            color: "white",
                            fontWeight: 900,
                          }}
                        >
                          1
                        </Avatar>
                      </Box>
                      <Box width={"90%"} display={"flex"} alignItems={"center"}>
                        <Typography variant="h5">
                          Đăng các bài viết có nội dung không phù hợp :
                        </Typography>
                        <Typography
                          variant="h3"
                          fontWeight={"bold"}
                          ml={"10px"}
                          color={"#EF9FC4"}
                        >
                          12
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      width={"100%"}
                      alignItems={"center"}
                    >
                      <Box width={"8%"}>
                        <Avatar
                          style={{
                            backgroundColor: "#A10E25",
                            color: "white",
                            fontWeight: 900,
                          }}
                        >
                          2
                        </Avatar>
                      </Box>
                      <Box width={"90%"} display={"flex"} alignItems={"center"}>
                        <Typography variant="h5">
                          Bình luận vi phạm cộng đồng :
                        </Typography>
                        <Typography
                          variant="h3"
                          fontWeight={"bold"}
                          ml={"10px"}
                          color={"#A10E25"}
                        >
                          8
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4}>
          <Paper elevation={1}>
            <Box p="20px" height={"416px"}>
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb={"20px"}
              >
                Các loại tài liệu đã đóng góp
              </Typography>
              <Stack spacing={2}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ backgroundColor: "#FAFAFA" }}
                    mr={"50px"}
                  >
                    <img src={svg4} alt="logo" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      Slide môn học
                    </Typography>
                    <Typography variant="h5" color={theme.palette.text.primary}>
                      {data.subjectDocument["SLIDE"] || 0} Slide
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ backgroundColor: "#FAFAFA" }}
                    mr={"50px"}
                  >
                    <img src={svg5} alt="logo" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      Đề tài bài tập lớn
                    </Typography>
                    <Typography variant="h5" color={theme.palette.text.primary}>
                      {data.subjectDocument["PROJECT"] || 0} project
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ backgroundColor: "#FAFAFA" }}
                    mr={"50px"}
                  >
                    <img src={svg6} alt="logo" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      Review
                    </Typography>
                    <Typography variant="h5" color={theme.palette.text.primary}>
                      {data.reviewTotal || 0} Bài viết
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ backgroundColor: "#FAFAFA" }}
                    mr={"50px"}
                  >
                    <img src={svg7} alt="logo" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      Review môn học
                    </Typography>
                    <Typography variant="h5" color={theme.palette.text.primary}>
                      {data.subjectDocument["PROJECT"] || 0} project Bài
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <Box
                    width={"50px"}
                    height={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ backgroundColor: "#FAFAFA" }}
                    mr={"50px"}
                  >
                    <img src={svg8} alt="logo" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      Đề thi
                    </Typography>
                    <Typography variant="h5" color={theme.palette.text.primary}>
                      {data.subjectDocument["EXAM"] || 0} Đề thi
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={12}>
          <Paper elevation={1}>
            <Box p="20px">
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb={"20px"}
              >
                Thông tin cá nhân của người dùng
              </Typography>
              <Box>
                <Grid container spacing={2}></Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}

export default UserInfo;
