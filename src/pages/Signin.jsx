import React, { useState } from "react";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../services/AuthService";
import { useSelector } from "react-redux";
import BoxBetween from "../components/BoxBetween";
function Signin() {
  const theme = useTheme();
  const [login] = useLoginMutation();
  const { isLogin } = useSelector((state) => state.authentication);
  const [creadentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const handleOnChange = (e) => {
    setCredentials({ ...creadentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (creadentials.email === "" || creadentials.password === "") return;
    await login(creadentials);
  };
  return isLogin ? (
    <Navigate to={"/"} replace />
  ) : (
    <Box height={"100vh"} width={"100vw"}>
      <BoxBetween>
        <Box
          maxWidth={"450px"}
          width={"90%"}
          p={"30px"}
          border={1}
          borderColor={"#f1f1f1"}
          borderRadius={1}
          boxShadow={4}
        >
          <Box width={"100%"}>
            {/* LOGO */}
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              width={"100%"}
            >
              <img src={logo} height={"40px"} alt="" />
              <img src={logoWhite} height={"40px"} alt="" />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h3" mb={"16px"} mt={"10px"}>
                Đăng nhập
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h4" mb={"16px"} color={"text.secondary"}>
                Đăng nhập vào Hust Document
              </Typography>
            </Box>
            <Box width={"100%"}>
              <Box mb={2} mt={2}>
                <TextField
                  required
                  inputProps={{
                    style: {
                      fontSize: "17px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "17px",
                    },
                  }}
                  sx={{ width: "100%" }}
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={creadentials.email}
                  style={{ fontSize: "17px" }}
                  onChange={handleOnChange}
                  size="medium"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  required
                  type="password"
                  inputProps={{
                    style: {
                      fontSize: "17px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "17px",
                    },
                  }}
                  sx={{ width: "100%" }}
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={creadentials.password}
                  onChange={handleOnChange}
                  size="medium"
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControlLabel
                  label="Nhớ mật khẩu"
                  name="remember"
                  componentsProps={{ typography: { variant: "h5" } }}
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                  }
                />
                <Typography variant="h5">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                    }}
                    to={"/forgot-password"}
                  >
                    Bạn quên mật khẩu?
                  </Link>
                </Typography>
              </Box>
              <BoxBetween mb={"16px"} mt={3}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    textTransform: "none",
                    fontSize: "18px",
                    border: "5px",
                  }}
                >
                  Đăng nhập
                </Button>
              </BoxBetween>
              <BoxBetween>
                <Typography variant="h4">
                  Tạo tài khoản mới{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "palette.primary.main",
                    }}
                    to={"/sign-up"}
                  >
                    Đăng ký
                  </Link>
                </Typography>
              </BoxBetween>
            </Box>
          </Box>
        </Box>
      </BoxBetween>
    </Box>
  );
}

export default Signin;
