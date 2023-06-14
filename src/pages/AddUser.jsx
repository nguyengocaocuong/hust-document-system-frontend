import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
  Select,
  TextField,
  Divider,
  Button,
  OutlinedInput,
} from "@mui/material";
import React, { useRef, useState } from "react";
import avatar from "../assets/images/avatar/05.jpg";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import BoxBetween from "../components/BoxBetween";
import { convertJsonToFormData } from "../utils/ConvertData";
import { useCreateUserMutation } from "../services/AdminUserService";
function AddUser() {
  const theme = useTheme();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "",
    userName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    matchingPassword: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    address: "",
    roleType: "USER",
  });
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const [createUser] = useCreateUserMutation();
  const createNewUser = () => {
    const formData = convertJsonToFormData(profile);
    if (file) {
      formData.append("avatarFile", file);
    }
    formData.append("matchingPassword", profile.password);
    createUser(formData).then((response) => {
      setProfile({
        firstName: "",
        userName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        matchingPassword: "",
        facebookUrl: "",
        instagramUrl: "",
        twitterUrl: "",
        address: "",
        roleType: "USER",
      });
      setFile(null);
    });
  };
  return (
    <Box p={2} overflow={"auto"} height={"calc(100% - 60px)"}>
      <Grid container spacing={2}>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box p="20px">
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb={"20px"}
              >
                Thêm người dùng mới
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} p="15px" pt="0">
              <Box position={"relative"}>
                <img
                  src={file === null ? avatar : URL.createObjectURL(file)}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "60px",
                  }}
                  alt=""
                />
                <Box
                  width={"40px"}
                  height={"40px"}
                  sx={{ backgroundColor: "white", borderRadius: "100%" }}
                  p="5px"
                  position={"absolute"}
                  bottom="0"
                  right={"0"}
                >
                  <BoxBetween
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                    }}
                  >
                    <IconButton onClick={() => fileRef.current.click()}>
                      <ModeEditOutlinedIcon style={{ color: "white" }} />
                    </IconButton>
                    <input
                      type="file"
                      display="none"
                      ref={fileRef}
                      onChange={(e) => setFile(e.target.files[0])}
                      accept="image/*"
                    />
                  </BoxBetween>
                </Box>
              </Box>
            </Box>
            <Stack spacing={2} p={"15px"}>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Select Role:
                </Typography>
                <Select
                  value={profile.roleType}
                  onChange={handleChange}
                  sx={{ minWidth: "100%" }}
                  size="small"
                  name="roleType"
                >
                  <MenuItem value={"USER"}>Người dùng</MenuItem>
                  <MenuItem value={"STAF"}>Quản trị</MenuItem>
                </Select>
              </Box>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Facebook Url:
                </Typography>
                <TextField
                  placeholder="Enter user facebook"
                  size="small"
                  sx={{ width: "100%" }}
                  value={profile.facebookUrl}
                  onChange={handleChange}
                  name="facebookUrl"
                />
              </Box>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Instagram Url:
                </Typography>
                <TextField
                  placeholder="Enter user instagram"
                  size="small"
                  sx={{ width: "100%" }}
                  value={profile.instagramUrl}
                  onChange={handleChange}
                  name="instagramUrl"
                />
              </Box>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Twitter Url:
                </Typography>
                <TextField
                  placeholder="Enter user twitter"
                  size="small"
                  sx={{ width: "100%" }}
                  value={profile.twitterUrl}
                  onChange={handleChange}
                  name="twitterUrl"
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xl={9}>
          <Paper elevation={1}>
            <Box p="20px">
              <Box p="20px">
                <Typography
                  variant="h3"
                  color={theme.palette.text.secondary}
                  mb={"20px"}
                >
                  Thông tin người dùng
                </Typography>
              </Box>
              <Box p="15px">
                <Grid container spacing={2}>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Tên:
                      </Typography>
                      <TextField
                        placeholder="Nhập tên người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        value={profile.lastName}
                        onChange={handleChange}
                        name="lastName"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Họ:
                      </Typography>
                      <TextField
                        placeholder="Nhập họ người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        onChange={handleChange}
                        value={profile.firstName}
                        name="firstName"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Địa chỉ:
                      </Typography>
                      <TextField
                        placeholder="Nhập địa chỉ người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        onChange={handleChange}
                        value={profile.address}
                        name="address"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Số điện thoại:
                      </Typography>
                      <TextField
                        placeholder="Nhập số điện thoại người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        onChange={handleChange}
                        value={profile.phoneNumber}
                        name="phoneNumber"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={4}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Ngày tháng năm sinh:
                      </Typography>
                      <DatePicker
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={4}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Thời gian nhập học:
                      </Typography>
                      <TextField
                        placeholder="Thời gian nhập học"
                        size="small"
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xl={12}>
                    <Divider />
                  </Grid>
                  <Grid item xl={12}>
                    <Box p="10px">
                      <Typography
                        variant="h3"
                        color={theme.palette.text.secondary}
                        mb={"20px"}
                      >
                        Thông tin đăng nhập
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Tên đăng nhập:
                      </Typography>
                      <TextField
                        placeholder="Tên đăng nhập"
                        size="small"
                        sx={{ width: "100%" }}
                        required={true}
                        value={profile.userName}
                        onChange={handleChange}
                        name="userName"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={6}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Email người dùng:
                      </Typography>
                      <TextField
                        placeholder="Email người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        required={true}
                        value={profile.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12}>
                    <Box mb={"15px"}>
                      <Typography
                        variant="h5"
                        color={theme.palette.text.secondary}
                        mb={"5px"}
                      >
                        Mật khẩu người dùng:
                      </Typography>
                      <OutlinedInput
                        type="password"
                        placeholder="Mật khẩu người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        required={true}
                        value={profile.password}
                        onChange={handleChange}
                        name="password"
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12} textAlign={"center"}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={createNewUser}
                    >
                      Đăng ký người dùng
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddUser;
