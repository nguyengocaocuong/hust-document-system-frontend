import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import BoxBetween from "../containers/BoxBetween";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/images/background.png";
import folder1 from "../assets/images/folder-1.png";
import folder2 from "../assets/images/folder-2.png";
function Posted() {
  const theme = useTheme();
  return (
    <Box width={"100%"}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper elevation={3}>
            <Box p="20px" pb="35px">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Box width={"100%"} maxWidth={"400px"}>
                    <Typography
                      variant="h3"
                      color={theme.palette.text.secondary}
                      mb="15px"
                    >
                      Xin chào {'Nguyễn Ngô Cao Cường'}
                    </Typography>
                    <Typography variant="h5" mb="45px">
                      Bạn có 5 bài review giảng viên, 2 bài review môn học cần hoàn thành
                    </Typography>
                    <Link
                      to={"/"}
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <Typography
                        variant="h4"
                        display={"flex"}
                        alignItems={"center"}
                      >
                        Xem danh sách{" "}
                        <ArrowForwardOutlinedIcon
                          color={theme.palette.background.main}
                          style={{ fontSize: "18px", marginLeft: "8px" }}
                        />
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <img src={backgroundImage} width={"100%"} height={"115%"} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <Box p="20px">
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb="15px"
              >
                Truy cập nhanh
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                width={"100%"}
              >
                <Card sx={{ width: "47%"}}>
                  <CardMedia
                    component="img"
                    image={folder1}
                    alt="Paella dish"
                    sx={{ marginBottom: "15px", padding: "9px", width:'120px', height:'120px'}}
                  />
                  <CardContent
                    sx={{ margin: "0", padding: "0", maxHeight: "35px" }}
                  >
                    <BoxBetween>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.primary}
                      >
                        Review giảng viên
                      </Typography>
                    </BoxBetween>
                  </CardContent>
                </Card>
                <Card sx={{ width: "47%" }}>
                  <CardMedia
                    component="img"
                    image={folder2}
                    alt="Paella dish"
                    sx={{ marginBottom: "15px", padding: "9px", width:'120px', height:'120px' }}
                  />
                  <CardContent
                    sx={{ margin: "0", padding: "0", maxHeight: "35px" }}
                  >
                    <BoxBetween>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.primary}
                      >
                        Review môn học
                      </Typography>
                    </BoxBetween>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Posted;
