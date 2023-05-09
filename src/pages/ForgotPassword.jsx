import React, { useState } from "react";
import BoxBetween from "../containers/BoxBetween";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";

function ForgotPassword() {
  const theme = useTheme();
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  const handleResetPassword = () => {};
  return (
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
          <Box display={"flex"} justifyContent={"space-around"} width={"100%"}>
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
              Reset Password
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="h5" mb={"16px"} sx={{ textAlign: "center" }}>
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </Typography>
          </Box>
          {/* FORM */}
          <Box width={"100%"}>
            <Box mb={2} mt={2}>
              <TextField
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
                label="Enter your email"
                variant="outlined"
                value={email}
                style={{ fontSize: "17px" }}
                onChange={handleOnChange}
                size="medium"
              />
            </Box>
            <BoxBetween mb={"16px"} mt={3}>
              <Button
                variant="contained"
                onClick={handleResetPassword}
                sx={{ textTransform: "capitalize", fontSize: "18px" }}
              >
                Reset
              </Button>
            </BoxBetween>
          </Box>
        </Box>
      </Box>
    </BoxBetween>
  );
}

export default ForgotPassword;
