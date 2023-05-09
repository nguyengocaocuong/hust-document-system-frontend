import React, { useState } from "react";
import BoxBetween from "../containers/BoxBetween";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "./../assets/images/logo/logo.png";
import logoWhite from "./../assets/images/logo/logo-white.png";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../services/AuthService";
import { convertJsonToFormData } from "../utils/ConvertData";

function Signup() {
  const theme = useTheme();
  const [register] = useRegisterMutation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    matchingPassword: "",
    firstName: "",
    lastName: "",
    name: "Nguyen Ngo Cao Cuong",
  });
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    const formData = convertJsonToFormData(user);
    await register(formData);
    setUser({
      email: "",
      password: "",
      matchingPassword: "",
      firstName: "",
      lastName: "",
      name: "Nguyen Ngo Cao Cuong",
    });
  };
  const [agree, setAgree] = useState(false);
  return (
    <BoxBetween height={"100vh"}>
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
          <Box display={"flex"} justifyContent={"space-around"} width={"100%"}>
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
              Sign Up
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              variant="h4"
              mb={"16px"}
              color={theme.palette.text.secondary}
            >
              Create your account
            </Typography>
          </Box>
          <Box width={"100%"}>
            <Box
              mb={2}
              mt={2}
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box width={"45%"}>
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
                  name="firstName"
                  label="FirstName"
                  variant="outlined"
                  value={user.firstName}
                  style={{ fontSize: "17px" }}
                  onChange={handleOnChange}
                  size="medium"
                />
              </Box>
              <Box width={"45%"}>
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
                  name="lastName"
                  label="LastName"
                  variant="outlined"
                  value={user.lastName}
                  style={{ fontSize: "17px" }}
                  onChange={handleOnChange}
                  size="medium"
                />
              </Box>
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
                name="email"
                label="Enter your email"
                variant="outlined"
                value={user.email}
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
                value={user.password}
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
                name="matchingPassword"
                label="Enter your matchingPassword"
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
            >
              <FormControlLabel
                label="I agree with the terms of use"
                name="agree"
                componentsProps={{ typography: { variant: "h5" } }}
                control={
                  <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
                }
              />
            </Box>
            <BoxBetween mb={"16px"} mt={3}>
              <Button
                variant="contained"
                onClick={handleRegister}
                sx={{ textTransform: "capitalize", fontSize: "18px" }}
              >
                Signup
              </Button>
            </BoxBetween>
            <BoxBetween>
              <Typography variant="h4">
                Already have an Account{" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                  }}
                  to={"/sign-in"}
                >
                  Signin
                </Link>
              </Typography>
            </BoxBetween>
          </Box>
        </Box>
      </Box>
    </BoxBetween>
  );
}

export default Signup;
