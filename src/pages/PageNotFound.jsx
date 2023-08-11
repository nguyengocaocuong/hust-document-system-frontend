import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import notfoundImage from "../assets/notfoun.png";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="area">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid xs={6}>
              <Stack spacing={3} px={2}>
                <Typography variant="h1" color={"white"} fontWeight={"bold"}>
                  404
                </Typography>
                <Typography variant="h4" color={"white"}>
                  Chúng tôi không tìm thấy trang web bạn muốn tìm, hãy quay lại
                  trang chủ và thử lại
                </Typography>
                <Link
                  style={{
                    textDecoration: "none",
                    padding: "8px 16px",
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    fontSize: "17px",
                    cursor: "pointer",
                  }}
                  to={"/home"}
                >
                  Trang chủ
                </Link>
              </Stack>
            </Grid>
            <Grid xs={6}>
              <img src={notfoundImage} alt="" width={500} height={250} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
export default PageNotFound;
