import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tooltip as MUITooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import BoxFull from "../components/BoxFull";
import BoxBetween from "../components/BoxBetween";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import backgroundImage from "../assets/images/admin/background.png";
import { useSelector } from "react-redux";
import newPostIcon from "../assets/images/admin/newPostIcon.png";
import notifycationIcon from "../assets/images/admin/notifycation.png";
import reportIcon from "../assets/images/admin/report.png";
import newUserIcon from "../assets/images/admin/newUserIcon.png";
import newDocumentIcon from "../assets/images/admin/newDocumentIcon.png";
import newSujbectIcon from "../assets/images/admin/newSujbectIcon.png";
import approveIcon from "../assets/images/admin/approveIcon.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Table from "../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import EditOffIcon from "@mui/icons-material/EditOff";
import subjectIcon from "../assets/images/document/homework.png";
import { useGetAllNewReviewTeacherQuery } from "../services/AdminReviewTeacherService";
import Owner from "../components/Owner";
import { useGetAllNewReviewSubjectQuery } from "../services/AdminReviewSubjectService";
import { useGetAllNewUserQuery } from "../services/AdminUserService";
import { useGetDataForDashboardQuery } from "../services/AdminService";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Biểu đồ trong tuần",
    },
  },
};

const headers = [
  { title: "", width: "55px" },
  { title: "Loại bài viết", width: "15%" },
  { title: "Người đăng", width: "23%" },
  { title: "Đối tượng", width: "18%" },
  { title: "", width: "20%" },
];
function Dashboash() {
  const navigate = useNavigate();
  const { data: reviewTeacher = [] } = useGetAllNewReviewTeacherQuery();
  const { data: reviewSubject = [] } = useGetAllNewReviewSubjectQuery();
  const { data: dashboash, isSuccess } = useGetDataForDashboardQuery();
  const { data: newUser = [] } = useGetAllNewUserQuery();
  const theme = useTheme();
  const { user } = useSelector((state) => state.authentication);
  const quickAccess = [
    { Icon: approveIcon, title: "Bài viết cần phê duyệt" },
    { Icon: notifycationIcon, title: "Thông báo mới nhất" },
    { Icon: reportIcon, title: "Báo cáo cần kiểm tra" },
  ];
  const cardConfig = [
    {
      icon: newUserIcon,
      title: "Người dùng mới",
      color: "#1EA6C6",
      data: dashboash?.userTotal,
    },
    {
      icon: newDocumentIcon,
      title: "Tài liệu mới",
      color: "#F43B3B",
      data: dashboash?.subjectDocumentTotal,
    },
    {
      icon: newSujbectIcon,
      title: "Bài đánh giá mới",
      color: "#2D56A1",
      data: dashboash?.reviewTotal,
    },
    {
      icon: newPostIcon,
      title: "Bài viết mới",
      color: "#23F1A8",
      data: dashboash?.postTotal,
    },
  ];
  const renderItem = (item, key) => (
    <Box
      key={key}
      pl={1}
      pr={1}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        borderBottom: "1px solid #D9DFED",
        transition: "backgroundColor 0.4s",
        "&:hover": { backgroundColor: "#D9DFED" },
        cursor: "pointer",
      }}
      height={"55px"}
      maxHeight={"55px"}
      justifyContent={"space-between"}
    >
      <Box
        width={"55px"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box
          width={"50px"}
          height={"50px"}
          overflow={"hidden"}
          sx={{ borderRadius: 1, boxShadow: 2 }}
        >
          <img
            src={item.type === "TEACHER" ? item?.teacher.avatar : subjectIcon}
            width={"100%"}
            height={"auto"}
            style={{ maxHeight: "53px" }}
            alt=""
          />
        </Box>
      </Box>
      <Typography fontWeight={700} width={"15%"}>
        {item.type === "TEACHER" ? "Review giảng viên" : "Review môn học"}
      </Typography>
      <Owner
        owner={item.owner}
        sx={{ width: "23%", px: 0 }}
        createdAt={item?.createdAt}
      />
      <Typography
        sx={{ fontWeight: "bold", width: "18%" }}
        color={"primary.main"}
      >
        {item?.type === "TEACHER" ? item.teacher.name : item.subject.name}
      </Typography>

      <Box
        width={"20%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            opacity: "0.3",
            transition: "opacity 0.4s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "white",
            },
            borderRadius: "25px",
            px: 1.5,
          }}
        >
          <MUITooltip title={"Chỉnh sửa bài viết"}>
            <IconButton>
              <EditOffIcon
                color={"warning"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </MUITooltip>
          <MUITooltip title={"Copy link truy cập"}>
            <IconButton>
              <CopyAllIcon
                color={"info"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </MUITooltip>
          <MUITooltip title={"Xóa bài viết"}>
            <IconButton>
              <DeleteIcon
                color={"error"}
                sx={{ width: "18px", height: "18px" }}
              />
            </IconButton>
          </MUITooltip>
        </Box>
      </Box>
    </Box>
  );
  return isSuccess ? (
    <BoxFull overflow={"auto"}>
      <Typography variant="h3" color={"text.primary"} p={2} pt={3}>
        Tổng quan tuần vừa qua
      </Typography>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={7} xs={7}>
            <Paper elevation={3}>
              <Box
                p={2}
                height={"236px"}
                overflow={"hidden"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box
                  width={"70%"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Typography variant="h4" color={"text.secondary"} mb={2}>
                      Xin chào{" "}
                      <strong>{`${user.firstName} ${user.lastName}`}</strong>
                    </Typography>
                    <Typography fontSize={"17px"}>
                      Bạn đang có 23 thông báo, 12 bài viết và 12 báo cáo tài
                      liệu cần được bạn phê duyệt{" "}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    display={"flex"}
                    alignItems={"center"}
                    color={"primary"}
                  >
                    Xem tất cả{" "}
                    <ArrowForwardOutlinedIcon
                      color={theme.palette.background.main}
                      style={{ fontSize: "18px", marginLeft: "8px" }}
                    />
                  </Typography>
                </Box>
                <Box width={"30%"}>
                  <img
                    src={backgroundImage}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={12} lg={5} xs={5}>
            <Paper elevation={3}>
              <Box
                p={2}
                height={"236px"}
                maxHeight={"236px"}
                overflow={"hidden"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Typography
                  variant="h4"
                  color={theme.palette.text.secondary}
                  pb={2}
                >
                  Truy cập nhanh
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  height={"165px"}
                  maxHeight={"165px"}
                >
                  {quickAccess.map((item, index) => (
                    <Box
                      key={index}
                      width={"32%"}
                      height={"100%"}
                      maxHeight={"100%"}
                      overflow={"hidden"}
                      borderRadius={1}
                      border={"1px solid gray"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      p={2}
                      sx={{ "&:hover": { boxShadow: 2 }, cursor: "pointer" }}
                    >
                      <BoxBetween
                        height={"65%"}
                        maxHeight={"65%"}
                        width={"100%"}
                        overflow={"hidden"}
                      >
                        <img
                          src={item.Icon}
                          alt=""
                          style={{
                            height: "100%",
                          }}
                        />
                      </BoxBetween>
                      <Box height={"30%"} pt={0.5}>
                        <Typography textAlign={"center"} variant="h5">
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Grid container spacing={2} columns={12}>
          <Grid item md={12} lg={7} xl={7}>
            <Grid container spacing={2}>
              {cardConfig.map(({ icon, title, data, color }, index) => (
                <Grid item md={6} xl={6} key={index}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display={"flex"}
                      justifyContent={"space-between"}
                      height={"165px"}
                    >
                      <img src={icon} width={"40%"} alt="" />
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        width={"60%"}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            variant="h4"
                            color={theme.palette.text.secondary}
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="h2"
                            style={{ fontWeight: "900" }}
                            color={color}
                            textAlign={"center"}
                          >
                            {data}
                          </Typography>

                          <Typography
                            variant="h6"
                            display={"flex"}
                            alignItems={"center"}
                            color={color}
                            justifyContent={"end"}
                          >
                            Xem tất cả{" "}
                            <ArrowForwardOutlinedIcon
                              color={theme.palette.background.main}
                              style={{ fontSize: "16px", marginLeft: "8px" }}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={12} lg={5} xl={5}>
            <Paper elevation={3}>
              <Box
                p={2}
                display={"flex"}
                flexDirection={"column"}
                height={"calc(165px * 2 + 16px)"}
              >
                <Typography
                  variant="h4"
                  color={"text.secondary"}
                  textAlign={"center"}
                >
                  Biểu đồ trong tuần
                </Typography>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  height={"90%"}
                >
                  <Line
                    options={ChartOptions}
                    data={{ ...dashboash?.AdminDashboashData }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={4} xl={4}>
            <Paper elevation={3} sx={{ width: "100%" }}>
              <Box
                p={2}
                height={"431px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Typography variant="h4" color={"text.secondary"}>
                  Danh sách người dùng mới{" "}
                </Typography>
                <Box width={"100%"}>
                  {newUser.slice(0, 6).map((user, index) => (
                    <Box
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      height={"55px"}
                      p={1}
                      sx={{
                        "&:hover": { backgroundColor: "#F3F3F3" },
                      }}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <Avatar
                          sx={{ width: "45px", height: "45px" }}
                          src={user.avatar}
                        />
                        <Box px={1}>
                          <Typography fontSize={"15px"} fontWeight={"bold"}>
                            {`${user.firstName} ${user.lastName}`}
                          </Typography>
                          <Typography>{user.email}</Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Chip
                          label={
                            user.enable ? "Đã kích hoạt" : "Chưa kích hoạt"
                          }
                          color={user.enable ? "success" : "warning"}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Typography
                  variant="h5"
                  color={"primary"}
                  justifyContent={"center"}
                  display={"flex"}
                  alignItems={"center"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("users/list-user")}
                >
                  Xem tất cả{" "}
                  <ArrowForwardOutlinedIcon
                    color={theme.palette.background.main}
                    style={{ fontSize: "18px", marginLeft: "8px" }}
                  />
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={12} lg={8} xl={8}>
            <Paper elevation={3}>
              <Box p={2} height={"431px"}>
                <Typography variant="h4" color={"text.secondary"}>
                  Các bài viết cần phê duyệt{" "}
                </Typography>
                <Table
                  pageSize={5}
                  headers={headers}
                  items={
                    [
                      ...reviewTeacher?.map((review) => ({
                        type: "TEACHER",
                        ...review,
                      })),
                      ...reviewSubject?.map((review) => ({
                        type: "SUBJECT",
                        ...review,
                      })),
                    ] || []
                  }
                  renderItem={renderItem}
                  itemHeight={55}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </BoxFull>
  ) : (
    <></>
  );
}

export default Dashboash;
