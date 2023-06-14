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
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import BoxBetween from "../components/BoxBetween";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/avatar/05.jpg";
import { useUpdateProfileMutation } from "../services/UserService";
import { convertJsonToFormData } from "../utils/ConvertData";
import { updateAuthProfile } from "../store/authState";
function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const [profile, setProfile] = useState({ ...user });
  const handleChange = (e) => {
    setProfile((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const theme = useTheme();
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const [updateProfile] = useUpdateProfileMutation();
  const update = () => {
    const formData = convertJsonToFormData(profile);
    if (file) {
      formData.append("avatarFile", file);
    }
    updateProfile(formData).then((response) => {
      dispatch(updateAuthProfile({ ...response.data, token: profile.token }));
    });
  };
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xl={3}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography
                variant="h3"
                color={theme.palette.text.secondary}
                mb={"20px"}
              >
                Thông tin người dùng
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} p="15px" pt="0">
              <Box position={"relative"}>
                <img
                  src={
                    file === null
                      ? profile.avatar
                        ? profile.avatar
                        : avatar
                      : URL.createObjectURL(file)
                  }
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
                  defaultValue="USER"
                  value={profile.role}
                  hiddenLabel
                  sx={{ minWidth: "100%" }}
                  size="small"
                  disabled
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
                  Facebook :
                </Typography>
                <TextField
                  onChange={handleChange}
                  hiddenLabel
                  name="facebookUrl"
                  placeholder="Enter user facebook"
                  size="small"
                  sx={{ width: "100%" }}
                  value={profile.facebookUrl}
                />
              </Box>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Instagram :
                </Typography>
                <TextField
                  hiddenLabel
                  onChange={handleChange}
                  placeholder="Enter user instagram"
                  size="small"
                  sx={{ width: "100%" }}
                  name="instagramUrl"
                  value={profile.instagramUrl}
                />
              </Box>
              <Box mb={"15px"}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  mb={"5px"}
                >
                  Twitter :
                </Typography>
                <TextField
                  hiddenLabel
                  placeholder="Enter user twitter"
                  size="small"
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  name="twitterUrl"
                  value={profile.twitterUrl}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xl={9}>
          <Paper elevation={1}>
            <Box p={2}>
              <Box>
                <Typography
                  variant="h3"
                  color={theme.palette.text.secondary}
                  mb={1}
                >
                  Thông tin người dùng
                </Typography>
              </Box>
              <Box pl={1}>
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
                        hiddenLabel
                        name="lastName"
                        placeholder="Nhập tên người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        value={profile.lastName}
                        onChange={handleChange}
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
                        hiddenLabel
                        placeholder="Nhập họ người dùng"
                        size="small"
                        name="firstName"
                        sx={{ width: "100%" }}
                        value={profile.firstName}
                        onChange={handleChange}
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
                        hiddenLabel
                        placeholder="Nhập địa chỉ người dùng"
                        size="small"
                        name="address"
                        sx={{ width: "100%" }}
                        value={profile.address}
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
                        hiddenLabel
                        placeholder="Nhập số điện thoại người dùng"
                        size="small"
                        name="phoneNumber"
                        sx={{ width: "100%" }}
                        value={profile.phoneNumber}
                        onChange={handleChange}
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
                        hiddenLabel
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
                    <Box>
                      <Typography
                        variant="h3"
                        color={theme.palette.text.secondary}
                        mb={1}
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
                        hiddenLabel
                        onChange={handleChange}
                        placeholder="Tên đăng nhập"
                        size="small"
                        sx={{ width: "100%" }}
                        required={true}
                        value={profile.username}
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
                        hiddenLabel
                        placeholder="Email người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        required={true}
                        value={profile.email}
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
                        hiddenLabel
                        type="password"
                        placeholder="Mật khẩu người dùng"
                        size="small"
                        sx={{ width: "100%" }}
                        value={profile.password}
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12} textAlign={"center"}>
                    <Button size="large" variant="contained" onClick={update}>
                      Cập nhật
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

export default Profile;
