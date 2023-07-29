import React, { useState } from "react";
import BoxBetween from "../components/BoxBetween";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";
import { useResetPasswordMutation } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(" ");
  const [resetPassword] = useResetPasswordMutation();
  const [isSuccess, setSuccess] = useState(false);
  const handleOnChange = (e) => {
    if (message !== " ") setMessage(" ");
    setEmail(e.target.value);
  };
  const handleResetPassword = () => {
    if (email.length === 0 || !email.endsWith("@sis.hust.edu.vn")) {
      setMessage("Bạn cần nhập tài khoản email HUST");
      return;
    }
    resetPassword(email).then((response) => {
      if (response.error) {
        setMessage("Có lỗi khi gửi mail, hãy thử lại");
      } else {
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
                  Nhập tài khoản email của bạn vào bên dưới, chúng tôi sẽ gửi
                  cho bạn một email đặt lại mật khẩu
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
                    required
                    error={message !== " "}
                    helperText={message}
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
                    value={email}
                    style={{ fontSize: "17px" }}
                    onChange={handleOnChange}
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
                  </Button>
                )}
              </BoxBetween>
              <Typography
                textAlign={"end"}
                color={"primary"}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
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

export default ForgotPassword;
