import { Box, Drawer, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotificationCard from "./NotifycationCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "../../store/notificationState";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Notification() {
  const dispatch = useDispatch();
  const {
    notifications: { SHARED, LOADING, APPROVE },
    isShow,
  } = useSelector((state) => state.notificationState);
  const toggle = () => {
    dispatch(toggleNotification(isShow));
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    {
      title: "Tất cả",
      total: LOADING.length + APPROVE.length + SHARED.length,
    },
    {
      title: "Đăng tải",
      total: LOADING.length,
    },
    {
      title: "Phê duyệt",
      total: APPROVE.length,
    },
    {
      title: "Chia sẻ",
      total: SHARED.length,
    },
  ];
  return (
    <Drawer anchor="right" open={isShow} onClose={toggle}>
      <Box width={"433px"} height={"100vh"} overflow={"hidden"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          height={"70px"}
          p={2}
          pb={0}
          justifyContent={"space-between"}
        >
          <Typography variant="h4" fontWeight={700}>
            Thông báo
          </Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ borderBottom: 2, borderColor: "divider", height: "55px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ mt: -2, height: "55px" }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.title}
                iconPosition="end"
                icon={
                  <Typography
                    px={0.5}
                    borderRadius={5}
                    sx={{ backgroundColor: "#E6EFFF", color: "text.secondary" }}
                  >
                    {tab.total}
                  </Typography>
                }
                {...a11yProps(0)}
                sx={{
                  fontSize: "14px",
                  textTransform: "none",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box height={"calc(100% - 110px)"} overflow={"auto"} >
          <TabPanel value={value} index={0}>
            {[...SHARED, ...APPROVE, ...LOADING].map((item, index) => (
              <NotificationCard notification={item} key={index} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {LOADING.map((item, index) => (
              <NotificationCard notification={item} key={index} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {APPROVE.map((item, index) => (
              <NotificationCard notification={item} key={index} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {SHARED.map((item, index) => (
              <NotificationCard notification={item} key={index} />
            ))}
          </TabPanel>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Notification;
