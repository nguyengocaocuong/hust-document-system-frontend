import {
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotificationCard from "../components/NotificationCard";
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
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Notification({ isShow, toggle, data = [] }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <Drawer anchor="right" open={isShow} onClose={toggle}>
      <Box width={"400px"} height={"100vh"} bgColor={"red"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          height={"70px"}
          p={2}
          justifyContent={"space-between"}
        >
          <Typography variant="h4" fontWeight={700}>
            Thông báo
          </Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ mt: -2, height: "55px" }}
          >
            <Tab
              label="Tất cả"
              iconPosition="end"
              icon={
                <Typography
                  pr={1}
                  pl={1}
                  borderRadius={5}
                  sx={{ backgroundColor: "#E6EFFF", color: "text.secondary" }}
                >
                  0
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
            <Tab
              label="Phê duyệt"
              iconPosition="end"
              icon={
                <Typography
                  pr={1}
                  pl={1}
                  borderRadius={5}
                  sx={{ backgroundColor: "#E6EFFF", color: "text.secondary" }}
                >
                  0
                </Typography>
              }
              {...a11yProps(1)}
              sx={{
                fontSize: "14px",
                textTransform: "none",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            />
            <Tab
              label="Chia sẻ"
              {...a11yProps(2)}
              sx={{
                fontSize: "14px",
                textTransform: "none",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
              iconPosition="end"
              icon={
                <Typography
                  pr={1}
                  pl={1}
                  borderRadius={5}
                  sx={{ backgroundColor: "#E6EFFF", color: "text.secondary" }}
                >
                  0
                </Typography>
              }
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {data.map((item, index) => (
              <NotificationCard data={item} key={index} />
            ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {data.map((item, index) => (
              <NotificationCard data={item} key={index} />
            ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
            {data.map((item, index) => (
              <NotificationCard data={item} key={index} />
            ))}
        </TabPanel>
      </Box>
    </Drawer>
  );
}

export default Notification;
