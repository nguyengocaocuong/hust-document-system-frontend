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
  CircularProgress,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../services/AuthService";
import { useSelector } from "react-redux";
import BoxBetween from "../components/BoxBetween";
import { checkPassword } from "../utils/PasswordCheckedUtils";

function Signin() {
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();
  const [login] = useLoginMutation();
  const { isLogin } = useSelector((state) => state.authentication);
  const [creadentials, setCredentials] = useState({
    email: "",
    emailMessage: " ",
    password: "",
    passwordMessage: " ",
  });
  const [remember, setRemember] = useState(true);
  const handleOnChange = (e) => {
    setCredentials({
      ...creadentials,
      [e.target.name]: e.target.value,
      emailMessage: " ",
      passwordMessage: " ",
    });
  };
  const handleLogin = () => {
    if (creadentials.password === "" || creadentials.email === "") {
      setCredentials({
        ...creadentials,
        emailMessage:
          creadentials.email === "" ? "Email không được để trống" : " ",
        passwordMessage:
          creadentials.password === "" ? "Password không được để trống" : " ",
      });
      return;
    }
    if (!creadentials.email.endsWith("@sis.hust.edu.vn")) {
      setCredentials({
        ...creadentials,
        emailMessage: "Bạn cần sử dụng email HUST để đăng nhập",
        passwordMessage:
          creadentials.password.length >= 8 &&
          checkPassword(creadentials.password)
            ? " "
            : "Mật khẩu phải ít nhất 8 kí tự bao gồm chữ số, chữ hoa, chữ thường, kí tự đặc biệt.",
      });
      return;
    }
    if (
      creadentials.password.length < 8 ||
      !checkPassword(creadentials.password)
    ) {
      setCredentials({
        ...creadentials,
        passwordMessage:
          "Mật khẩu phải ít nhất 8 kí tự bao gồm chữ số, chữ hoa, chữ thường, kí tự đặc biệt.",
      });
      return;
    }
    setLoading(true)
    login(creadentials).then((response) => {
      setLoading(false)
      if (response.error) {
        setCredentials({
          ...creadentials,
          passwordMessage: "Tài khoản hoặc mật khẩu sai",
        });
        return;
      }
    });
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
              <Box mb={0.5} mt={2}>
                <TextField
                  disabled={isLoading}
                  error={creadentials.emailMessage !== " "}
                  helperText={creadentials.emailMessage}
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
                  disabled={isLoading}
                  error={creadentials.passwordMessage !== " "}
                  helperText={creadentials.passwordMessage}
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
                  {isLoading && (
                    <CircularProgress
                      sx={{
                        width: "30px!important",
                        height: "30px!important",
                        color: "white",
                        fontSize: "12px",
                      }}
                    />
                  )}
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
