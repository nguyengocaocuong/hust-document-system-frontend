import React, { useState } from "react";
import BoxBetween from "../containers/BoxBetween";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/base";
function Signin() {
  const theme = useTheme();
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
    setCredentials({
      email: "",
      password: "",
    });
  };
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
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="h3" mb={"16px"} mt={"10px"}>
              Sign In
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="h4" mb={"16px"} color={"text.secondary"}>
              Login to Hust Document
            </Typography>
          </Box>
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
                value={creadentials.email}
                style={{ fontSize: "17px" }}
                onChange={handleOnChange}
                size="medium"
              />
            </Box>
            <Box mb={2}>
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
                name="password"
                label="Enter your password"
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
                label="Remember me"
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
                  Forgot password
                </Link>
              </Typography>
            </Box>
            <BoxBetween mb={"16px"} mt={3}>
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  border: "5px",
                }}
              >
                SignIn
              </Button>
            </BoxBetween>
            <BoxBetween>
              <Typography variant="h4">
                Create account{" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: "palette.primary.main",
                  }}
                  to={"/sign-up"}
                >
                  SignUp
                </Link>
              </Typography>
            </BoxBetween>
          </Box>
        </Box>
      </Box>
    </BoxBetween>
  );
}

export default Signin;
