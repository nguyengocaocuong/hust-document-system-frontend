import React, { useState } from "react";
import BoxBetween from "../components/BoxBetween";
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
import { useNavigate, useParams } from "react-router-dom";
import { checkPassword } from "../utils/PasswordCheckedUtils";
import { useUpdatePasswordByTokenMutation } from "../services/AuthService";

function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();
  const [resetInfor, setResetInfo] = useState({
    email: "",
    messageEmail: " ",
    password: "",
    messagePassword: " ",
    confirmPassword: "",
    messageConfirmPassword: " ",
  });
  const [isSuccess, setSuccess] = useState(false);
  const { token } = useParams();

  const [updatePasswordByToken] = useUpdatePasswordByTokenMutation();
  const handleOnChange = (e) => {
    setResetInfo((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
      messageEmail: " ",
      messageConfirmPassword: " ",
      messagePassword: " ",
    }));
  };
  const handleResetPassword = () => {
    if (
      resetInfor.email.length === 0 ||
      !resetInfor.email.endsWith("@sis.hust.edu.vn")
    ) {
      setResetInfo((preState) => ({
        ...preState,
        messageEmail: "Bạn cần nhập tài khoản email HUST",
      }));
      return;
    }
    if (resetInfor.password.length < 8 || !checkPassword(resetInfor.password)) {
      setResetInfo((preState) => ({
        ...preState,
        messagePassword:
          "Mật khẩu phải ít nhất 8 kí tự bao gồm chữ số, chữ hoa, chữ thường, kí tự đặc biệt.",
      }));
      return;
    }
    if (resetInfor.password !== resetInfor.confirmPassword) {
      setResetInfo((preState) => ({
        ...preState,
        messageConfirmPassword: "Mật khẩu không khớp.",
      }));
      return;
    }
    setLoading(true);
    const body = new FormData();
    body.append("email", resetInfor.email);
    body.append("newPassword", resetInfor.password);
    updatePasswordByToken({ token, body }).then((response) => {
      setLoading(false);
      if (!response.error) {
        setSuccess(true);
      }
    });
  };
  const navigate = useNavigate();
  return (
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
            {/* TITLE */}
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h2"
                mb={"16px"}
                mt={"10px"}
                color={theme.palette.text.secondary}
              >
                Đặt lại mật khẩu
              </Typography>
            </Box>
            {!isSuccess && (
              <Box display={"flex"} justifyContent={"center"}>
                <Typography
                  variant="h5"
                  mb={"16px"}
                  sx={{ textAlign: "center" }}
                >
                  Nhập tài khoản email của bạn và mật khẩu mới vào bên dưới,
                  chúng tôi sẽ đặt lại mật khẩu cho bạn.
                </Typography>
              </Box>
            )}
            {/* FORM */}
            <Box width={"100%"}>
              {isSuccess ? (
                <Box display={"flex"} justifyContent={"center"}>
                  <Typography
                    variant="h4"
                    mb={"16px"}
                    color={theme.palette.text.secondary}
                    textAlign={"center"}
                  >
                    Chúng tôi đã gửi đến email resetpassword tới email của bạn,
                    hãy check mail để reset password
                  </Typography>
                </Box>
              ) : (
                <Box mb={2} mt={2}>
                  <TextField
                    disabled={isLoading}
                    required
                    error={resetInfor.messageEmail !== " "}
                    helperText={resetInfor.messageEmail}
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
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={resetInfor.email}
                    style={{ fontSize: "17px" }}
                    onChange={handleOnChange}
                    type="email"
                    size="medium"
                  />
                  <TextField
                    disabled={isLoading}
                    required
                    error={resetInfor.messagePassword !== " "}
                    helperText={resetInfor.messagePassword}
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
                    label="Nhập mật khẩu"
                    variant="outlined"
                    value={resetInfor.password}
                    style={{ fontSize: "17px" }}
                    onChange={handleOnChange}
                    type="password"
                    size="medium"
                  />
                  <TextField
                    disabled={isLoading}
                    required
                    error={resetInfor.messageConfirmPassword !== " "}
                    helperText={resetInfor.messageConfirmPassword}
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
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    value={resetInfor.confirmPassword}
                    style={{ fontSize: "17px" }}
                    onChange={handleOnChange}
                    type="password"
                    size="medium"
                  />
                </Box>
              )}
              <BoxBetween mb={"16px"} mt={3}>
                {isSuccess ? (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/sign-in")}
                    sx={{ textTransform: "capitalize", fontSize: "18px" }}
                  >
                    Về trang đăng nhập
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleResetPassword}
                    sx={{ textTransform: "capitalize", fontSize: "18px" }}
                  >
                    Xác nhận
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
                )}
              </BoxBetween>
              <Typography
                textAlign={"end"}
                color={"primary"}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                  cursor: "pointer",
                }}
                onClick={() => navigate("/sign-in")}
              >
                Về trang đăng nhập
              </Typography>
            </Box>
          </Box>
        </Box>
      </BoxBetween>
    </Box>
  );
}

export default ResetPassword;
