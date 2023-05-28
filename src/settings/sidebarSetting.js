import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, IconButton } from "@mui/material";
const NotificationIcon = () => (
  <IconButton >
    <Badge badgeContent={4} color="error">
      <NotificationsNoneIcon style={{ fontSize: "25px" }}/>
    </Badge>
  </IconButton>
);
const userSidebarItem = [
  {
    type: "ITEM",
    title: "Đăng bài",
    to: "/writing",
    Icon: PostAddIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Tài liệu",
    to: "/education",
    Icon: SchoolOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Bài đánh giá",
    to: "/review",
    Icon: RateReviewOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "SUB_ITEM",
    title: "Cá nhân",
    to: "/private",
    Icon: AddToDriveIcon,
    selectedColor: "red",
    data: [
      {
        type: "ITEM",
        title: "Tài liệu",
        to: "/private/document",
        Icon: DocumentScannerIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Yêu thích",
        to: "/private/favorite",
        Icon: FavoriteBorderIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Bài đã đăng",
        to: "/private/posted",
        Icon: DynamicFeedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Bị báo cáo",
        to: "/private/report",
        Icon: ReportProblemOutlinedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Thông tin cá nhân",
        to: "/private/profile",
        Icon: ContactMailOutlinedIcon,
        selectedColor: "red",
      },
    ],
  },

  {
    type: "ITEM",
    title: "Thông báo",
    to: "/notification",
    Icon: NotificationIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Lịch sử",
    to: "/history",
    Icon: HistoryIcon,
    selectedColor: "white",
  },
];

const userSidebarSettingItem = [
  {
    type: "ITEM",
    title: "Thùng rác",
    to: "/trash",
    Icon: DeleteOutlineOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Cài đặt",
    to: "/setting",
    Icon: SettingsOutlinedIcon,
    selectedColor: "red",
  }
];

export const GetSidebarItem = (roleType) =>
  roleType === "ADMIN" ? [[], []] : [userSidebarItem, userSidebarSettingItem];
export const getBreadcrumbs = (pathName = "") => {
  const breadcrumbs = [];
  for (let i = 0; i < userSidebarItem.length; i++) {
    if (userSidebarItem[i]["type"] === "ITEM") continue;
    if (pathName.startsWith(userSidebarItem[i]["to"])) {
      breadcrumbs[0] = userSidebarItem[i];
      for (let j = 0; j < userSidebarItem[i]["data"].length; j++) {
        if (pathName.startsWith(userSidebarItem[i]["data"][j]["to"]))
          breadcrumbs[breadcrumbs.length] = userSidebarItem[i]["data"][j];
      }
    }
  }
  const [last, ...first] = breadcrumbs.reverse();
  return [first.reverse(), last];
};
