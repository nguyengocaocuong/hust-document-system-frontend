import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
const userSidebarItem = [
  {
    type: "ITEM",
    title: "Đăng bài",
    to: "/new",
    Icon: PostAddIcon,
    selectedColor: "white",
  },

  {
    type: "ITEM",
    title: "Được chia sẻ",
    to: "/shared",
    Icon: ShareIcon,
    selectedColor: "white",
  },
  {
    type: "SUB_ITEM",
    title: "Học tập",
    to: "/education",
    Icon: SchoolOutlinedIcon,
    selectedColor: "red",
    data: [
      {
        type: "ITEM",
        title: "Tài liệu",
        to: "/education/document",
        Icon: InsertDriveFileOutlinedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Bài đánh giá",
        to: "/education/review",
        Icon: RateReviewOutlinedIcon,
        selectedColor: "red",
      },
    ],
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
  {
    type: "ITEM",
    title: "Thoát",
    to: "/sign-out",
    Icon: LogoutIcon,
    selectedColor: "red",
  },
];

export const GetSidebarItem = (roleType) =>
  roleType === "ADMIN" ? [[], []] : [userSidebarItem, userSidebarSettingItem];
export const getBreadcrumbs = (pathName = "") => {
  const breadcrumbs = [];
  for (let i = 0; i < userSidebarItem.length; i++) {
    if (userSidebarItem[i]["type"] === "ITEM") continue;
    if (pathName.startsWith(userSidebarItem[i]["to"])) {
      breadcrumbs[0] = userSidebarItem[i]
      for (let j = 0; j < userSidebarItem[i]["data"].length; j++) {
        if (pathName.startsWith(userSidebarItem[i]["data"][j]["to"]))
          breadcrumbs[breadcrumbs.length] = userSidebarItem[i]["data"][j]
      }
    }
  }
  const [last, ...first] = breadcrumbs.reverse()
  return [first.reverse(), last];
};
