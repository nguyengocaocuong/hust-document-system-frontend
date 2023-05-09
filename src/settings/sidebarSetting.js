import PostAddIcon from "@mui/icons-material/PostAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HistoryIcon from '@mui/icons-material/History';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

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
    title: "Yêu thích",
    to: "/favorite",
    Icon: FavoriteBorderIcon,
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
    title: "Cá nhân",
    to: "/driver",
    Icon: AddToDriveIcon,
    selectedColor: "red",
    data: [
      {
        type: "ITEM",
        title: "Tài liệu",
        to: "/driver/document",
        Icon: DocumentScannerIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Bài đã đăng",
        to: "/driver/post",
        Icon: DynamicFeedIcon,
        selectedColor: "red",
      },
      {
        type: "ITEM",
        title: "Thông tin cá nhân",
        to: "/driver/profile",
        Icon: ContactMailOutlinedIcon,
        selectedColor: "red",
      }
    ],
  },
  {
    type: "ITEM",
    title: "Thông báo",
    to: "/notifications",
    Icon: NotificationsNoneIcon,
    selectedColor: "white",
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
    selectedColor: "red"
  },
  {
    type: "ITEM",
    title: "Cài đặt",
    to: "/setting",
    Icon: SettingsOutlinedIcon,
    selectedColor: "red"

  },
  {
    type: "ITEM",
    title: "Thoát",
    to: "/sign-out",
    Icon: LogoutIcon,
    selectedColor: "red"
  }
];

export const SidebarItem = (roleType) => roleType === "ADMIN" ? [[],[]] : [userSidebarItem, userSidebarSettingItem] 