import PostAddIcon from "@mui/icons-material/PostAdd";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
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
        title: "Bài đã đăng",
        to: "/private/posted",
        Icon: DynamicFeedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Được chia sẻ",
        to: "/private/shared",
        Icon: ShareIcon,
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
  },
];
const adminSidebarItem = [
  {
    type: "ITEM",
    title: "Môn học",
    to: "/subject",
    Icon: SchoolOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Giảng viên",
    to: "/teacher",
    Icon: CastForEducationOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "SUB_ITEM",
    title: "Người dùng",
    to: "/users",
    Icon: AccountCircleOutlinedIcon,
    selectedColor: "red",
    data: [
      {
        type: "ITEM",
        title: "Danh sách",
        to: "/users/list-user",
        Icon: PeopleOutlineOutlinedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Thêm người dùng",
        to: "/users/add-user",
        Icon: PersonAddOutlinedIcon,
        selectedColor: "red",
      },
    ],
  },
  {
    type: "ITEM",
    title: "Báo cáo",
    to: "/report",
    Icon: FlagOutlinedIcon,
    selectedColor: "red",
  },
  {
    type: "ITEM",
    title: "Phê duyệt",
    to: "/approve",
    Icon: BeenhereOutlinedIcon,
    selectedColor: "red",
  },
];
const adminSidebarSettingItem = [
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
  },
];
export const GetSidebarItem = (roleType) =>
  roleType === "ADMIN"
    ? [adminSidebarItem, adminSidebarSettingItem]
    : [userSidebarItem, userSidebarSettingItem];
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
