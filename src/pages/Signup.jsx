import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/AuthService";
import { convertJsonToFormData } from "../utils/ConvertData";
import { useSelector } from "react-redux";
import BoxBetween from "../components/BoxBetween";
import { checkPassword } from "../utils/PasswordCheckedUtils";

function Signup() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLogin } = useSelector((state) => state.authentication);
  const [register, { isSuccess }] = useRegisterMutation();
  const [user, setUser] = useState({
    email: "",
    messageEmail: " ",
    password: "",
    messagePassword: " ",
    matchingPassword: "",
    messpageMatchingPassowrd: " ",
    firstName: "",
    messageFirstName: " ",
    lastName: "",
    messageLastName: " ",
  });
  const handleOnChange = (e) => {
    if (
      user.messageEmail !== " " ||
      user.messagePassword !== " " ||
      user.messpageMatchingPassowrd !== " " ||
      user.messageFirstName !== " " ||
      user.messageLastName !== " "
    ) {
      setUser((preState) => ({
        ...preState,
        messageEmail: " ",
        messagePassword: " ",
        messageFirstName: " ",
        messpageMatchingPassowrd: " ",
        messageLastName: " ",
        [e.target.name]: e.target.value,
      }));
      return;
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = () => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.matchingPassword === "" ||
      user.firstName === "" ||
      user.lastName === ""
    ) {
      setUser((preState) => ({
        ...preState,
        messageEmail: user.email === "" ? "Email không được để trống" : " ",
        messagePassword:
          user.password === "" ? "Password không được để trống" : " ",
        messpageMatchingPassowrd:
          user.matchingPassword === "" ? "Bạn cần xác nhận lại mật khẩu" : " ",
        messageFirstName: user.firstName === "" ? "Bạn cần nhập ho" : " ",
        messageLastName: user.lastName === "" ? "Bạn cần nhập tên" : " ",
      }));
      return;
    }
    if (!user.email.endsWith("@sis.hust.edu.vn")) {
      setUser((preState) => ({
        ...preState,
        messageEmail: "Bạn cần đăng ký bằng tài khoản email HUST",
      }));
      return;
    }
    if (!checkPassword(user.password)) {
      setUser((preState) => ({
        ...preState,
        messagePassword:
          "Mật khẩu phải ít nhất 8 kí tự bao gồm chữ số, chữ hoa, chữ thường, kí tự đặc biệt",
      }));
      return;
    }
    if (user.password !== user.matchingPassword) {
      setUser((preState) => ({
        ...preState,
        messagePassword: "Mật khẩu không khớp",
      }));
      return;
    }
    setLoading(true);
    const formData = convertJsonToFormData(user);
    register(formData).then((response) => {
      setLoading(false);
      if (response.error) {
        setUser((preState) => ({
          ...preState,
          messpageMatchingPassowrd: "Có lỗi khi đăng ký tài khoản, hãy thử lại",
        }));
      }
    });
  };
  return isLogin ? (
    <Navigate to={"/"} replace />
  ) : (
    <Box height={"100vh"} width={"100vw"}>
      <BoxBetween>
        <Box
          maxWidth={"500px"}
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
              <Typography
                variant="h3"
                mb={"16px"}
                mt={"10px"}
                color={theme.palette.text.secondary}
              >
                {isSuccess ? "Đăng ký thành công" : "Đăng Ký"}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h4"
                mb={"16px"}
                color={theme.palette.text.secondary}
                textAlign={"center"}
              >
                {isSuccess
                  ? "Chúng tôi đã gửi đến email kích hoạt tài khoản tới email của bạn, kiểm tra email để kích hoạt tài khoản của bạn"
                  : "Đăng ký tài khoản mới"}
              </Typography>
            </Box>
            {isSuccess ? (
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                pt={2}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => navigate("/sign-in")}
                >
                  Đến trang login
                </Button>
              </Box>
            ) : (
              <Box width={"100%"}>
                <Box
                  mb={1}
                  mt={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box width={"45%"}>
                    <TextField
                      disabled={isLoading}
                      required
                      error={user.messageFirstName !== " "}
                      helperText={user.messageFirstName}
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
                      name="firstName"
                      label="Họ "
                      variant="outlined"
                      value={user.firstName}
                      style={{ fontSize: "17px" }}
                      onChange={handleOnChange}
                      size="medium"
                    />
                  </Box>
                  <Box width={"45%"}>
                    <TextField
                      disabled={isLoading}
                      required
                      error={user.messageLastName !== " "}
                      helperText={user.messageLastName}
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
                      name="lastName"
                      label="Tên"
                      variant="outlined"
                      value={user.lastName}
                      style={{ fontSize: "17px" }}
                      onChange={handleOnChange}
                      size="medium"
                    />
                  </Box>
                </Box>
                <Box mb={1}>
                  <TextField
                    disabled={isLoading}
                    required
                    error={user.messageEmail !== " "}
                    helperText={user.messageEmail}
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
                    value={user.email}
                    onChange={handleOnChange}
                    size="medium"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    disabled={isLoading}
                    required
                    error={user.messagePassword !== " "}
                    helperText={user.messagePassword}
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
                    type="password"
                    name="password"
                    label="Mật khẩu"
                    variant="outlined"
                    value={user.password}
                    onChange={handleOnChange}
                    size="medium"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    disabled={isLoading}
                    required
                    error={user.messpageMatchingPassowrd !== " "}
                    helperText={user.messpageMatchingPassowrd}
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
                    name="matchingPassword"
                    label="Xác nhận mật khẩu"
                    type="password"
                    variant="outlined"
                    value={user.matchingPassword}
                    onChange={handleOnChange}
                    size="medium"
                  />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                ></Box>
                <BoxBetween mb={"16px"} mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleRegister}
                    sx={{ textTransform: "capitalize", fontSize: "18px" }}
                  >
                    <Typography mx={1} fontSize={"17px"}>
                      {" "}
                      Đăng ký
                    </Typography>
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
                    Bạn đã có tài khoản{" "}
                    <Link
                      style={{
                        textDecoration: "none",
                        color: theme.palette.primary.main,
                      }}
                      to={"/sign-in"}
                    >
                      Đăng nhập
                    </Link>
                  </Typography>
                </BoxBetween>
              </Box>
            )}
          </Box>
        </Box>
      </BoxBetween>
    </Box>
  );
}

export default Signup;
