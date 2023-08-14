import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getIconForDocByFileName } from "../../utils/DocumentUtils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MessageIcon from "@mui/icons-material/Message";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import SubjectIcon from "@mui/icons-material/Subject";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { formatTimeAgo } from "../../utils/ConvertDate";
import SearchResul from "../skeleton/SearchResul";
function Content({ result, isSearching }) {
  const [isShowSortOptions, setShowSortOptions] = useState(false);
  const [isShowFileOptions, setShowFileOptions] = useState(false);
  const [sortValue, setSortValue] = useState({
    Icon: <AccessAlarmIcon sx={{ mr: 0.75, color: "orange" }} />,
    color: "orange",
    title: "Mới nhất",
    value: 1,
  });
  const [fileValue, setFileValue] = useState(null);
  const sortOption = [
    {
      Icon: <AccessAlarmIcon sx={{ mr: 0.75, color: "orange" }} />,
      color: "orange",
      title: "Mới nhất",
      value: 1,
    },
    {
      Icon: <FavoriteIcon sx={{ mr: 0.75, color: "red" }} />,
      color: "red",
      title: "Yêu thích nhất",
      value: 2,
    },
    {
      Icon: <VisibilityIcon sx={{ mr: 0.75, color: "blue" }} />,
      color: "blue",
      title: "Xem nhiều nhất",
      value: 3,
    },
    {
      Icon: <DownloadIcon sx={{ mr: 0.75, color: "green" }} />,
      color: "green",
      title: "Tải nhiều nhất",
      value: 4,
    },
  ];
  const fileOption = [
    {
      title: "pdf",
      value: 1,
    },
    {
      title: "docx",
      value: 2,
    },
    {
      title: "xlsx",
      value: 3,
    },
    {
      title: "pptx",
      value: 4,
    },
    {
      title: "csv",
      value: 5,
    },
    {
      title: "png",
      value: 6,
    },
  ];

  const handleSelectSortOptions = (newOption) => {
    setSortValue(newOption);
    setShowSortOptions(false);
  };
  return (
    <Box width={"100%"} height={"calc(100% - 50px)"} bgcolor={"#F1F9F9"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"60px"}
        px={4}
      >
        <Typography fontWeight={"bold"}>{result.length} kết quả</Typography>
        <Stack
          spacing={2}
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography variant="h6">Sắp xếp</Typography>
          <Box width={"190px"} height={"40px"} position={"relative"}>
            <Box
              position={"absolute"}
              top={0}
              left={0}
              width={"190px"}
              borderRadius={1}
              overflow={"hidden"}
              bgcolor={"white"}
              zIndex={3}
              boxShadow={1}
            >
              <Box
                height={"40px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={1.5}
              >
                <Typography
                  fontWeight={"bold"}
                  alignItems={"center"}
                  display={"flex"}
                  color={sortValue.color}
                >
                  {sortValue.Icon}
                  {sortValue.title}
                </Typography>
                <IconButton
                  onClick={() => setShowSortOptions((preState) => !preState)}
                >
                  <ArrowDropDownIcon
                    style={{
                      transform: isShowSortOptions
                        ? "rotate(0deg)"
                        : "rotate(-90deg",
                      transition: "transform 0.4s",
                    }}
                  />
                </IconButton>
              </Box>
              <Stack
                spacing={0}
                overflow={"hidden"}
                height={isShowSortOptions ? "auto" : 0}
              >
                {sortOption
                  .filter((sort) => sort.value !== sortValue.value)
                  .map((sort) => (
                    <Typography
                      key={sort.value}
                      onClick={() => handleSelectSortOptions(sort)}
                      px={1.5}
                      fontWeight={"bold"}
                      alignItems={"center"}
                      display={"flex"}
                      sx={{
                        "&:hover": {
                          color: sort.color,
                          cursor: "pointer",
                          bgcolor: "#D8D9D9",
                        },
                      }}
                      py={1}
                      borderTop={"1px solid #D8D9D9"}
                    >
                      {sort.Icon}
                      {sort.title}
                    </Typography>
                  ))}
              </Stack>
            </Box>
          </Box>
          <Typography variant="h6">Loại file</Typography>

          <Box width={"100px"} height={"40px"} position={"relative"}>
            <Box
              position={"absolute"}
              top={0}
              left={0}
              width={"100px"}
              borderRadius={1}
              overflow={"hidden"}
              bgcolor={"white"}
              zIndex={3}
              boxShadow={1}
            >
              <Box
                height={"40px"}
                width={"100px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={1}
                sx={{ cursor: "pointer" }}
              >
                <Typography>
                  {fileValue ? fileValue.title : "Tất cả"}
                </Typography>
                <IconButton
                  onClick={() => setShowFileOptions((preState) => !preState)}
                >
                  {fileValue ? (
                    <img
                      width={"25px"}
                      height={"25px"}
                      src={getIconForDocByFileName(fileValue.title)}
                      alt=""
                    />
                  ) : (
                    <FilterAltIcon />
                  )}
                </IconButton>
              </Box>
              <Stack
                spacing={0}
                overflow={"hidden"}
                height={isShowFileOptions ? "auto" : 0}
              >
                {fileOption.map((file) => {
                  if (file.value !== fileValue?.value)
                    return (
                      <Box
                        key={file.value}
                        width={"100px"}
                        height={"40px"}
                        borderTop={"1px solid #D8D9D9"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        p={1}
                      >
                        <Typography>{file.title}</Typography>
                        <IconButton
                          onClick={() => {
                            setFileValue(file);
                            setShowFileOptions(false);
                          }}
                        >
                          <img
                            width={"25px"}
                            height={"25px"}
                            src={getIconForDocByFileName(file.title)}
                            alt={file.value}
                          />
                        </IconButton>
                      </Box>
                    );
                  return <></>;
                })}
                {fileValue && (
                  <Box
                    width={"100px"}
                    height={"40px"}
                    borderTop={"1px solid #D8D9D9"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={1}
                  >
                    <Typography fontWeight={"bold"}>Tất cả</Typography>
                    <IconButton
                      onClick={() => {
                        setFileValue(undefined);
                        setShowFileOptions(false);
                      }}
                    >
                      <FilterAltIcon />
                    </IconButton>
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        height={"calc(100% - 80px)"}
        width={"100%"}
        px={4}
        py={2}
        overflow={"auto"}
        sx={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 5px 10px -2px inset, rgba(0, 0, 0, 0.3) 0px 3px 6px -3px inset",
        }}
      >
        {isSearching ? (
          <SearchResul />
        ) : (
          <Stack spacing={3}>
            {[
              ...result.filter((item) => {
                if (
                  fileValue === null ||
                  fileValue.title.toUpperCase() === item.type
                )
                  return true;
                return false;
              }),
            ]
              .sort((itemb, itema) => {
                if (sortValue.value === 1) return itema.id - itemb.id;
                if (sortValue.value === 2)
                  return itema.favorites.length - itemb.favorites.length;
                if (sortValue.value === 3)
                  return itema.totalView - itemb.totalView;
                if (sortValue.value === 4)
                  return itema.totalDownload - itemb.totalDownload;
                return 0;
              })
              .map((item) => (
                <React.Fragment key={item.id}>
                  <Stack spacing={1} overflow={"hidden"}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/education/subject-document/${item.id}`}
                    >
                      <Typography
                        variant="h4"
                        color={"primary"}
                        sx={{ textDecoration: "none" }}
                      >
                        <small>{item.subjectDocumentTypeName} môn học </small>
                        <strong>{item.subjectName}</strong>{" "}
                        <small>{item.subjectCode}</small>
                      </Typography>
                    </Link>
                    <Breadcrumbs sx={{ color: "gray", fontWeight: "18px" }}>
                      <Typography variant="h5">
                        <SchoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {item.institute}
                      </Typography>
                      <Typography variant="h5">
                        <SubjectIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {item.subjectName}
                      </Typography>
                      <Typography variant="h5">
                        <LocalOfferIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {item.subjectDocumentType}
                      </Typography>
                    </Breadcrumbs>
                    <Stack direction={"row"} spacing={2}>
                      <Box height={"100px"} width={"150px"} overflow={"hidden"}>
                        <img src={item.thumbnail} alt="" width={"150px"} />
                      </Box>
                      <Stack spacing={1}>
                        <Typography variant="h4">
                          Tài liệu được chia sẻ bởi{" "}
                          <strong>{`${item.ownerFirstName} ${item.ownerLastName}`}</strong>{" "}
                          <small>({formatTimeAgo(item.createdAt)})</small>
                        </Typography>
                        <Typography variant="h5" px={1} fontStyle={"italic"}>
                          {item.description}
                        </Typography>
                        <Stack direction={"row"} spacing={1} px={1}>
                          <Chip
                            icon={<DownloadIcon color="success" />}
                            label={
                              <Typography>
                                <strong>{item.totalDownload}</strong> lượt tải
                              </Typography>
                            }
                            sx={{ px: 1 }}
                          />
                          <Chip
                            icon={<FavoriteIcon color="error" />}
                            label={
                              <Typography>
                                <strong>{item.totalFavorites}</strong> lượt yêu
                                thích
                              </Typography>
                            }
                            sx={{ px: 1 }}
                          />
                          <Chip
                            icon={<VisibilityIcon color="primary" />}
                            label={
                              <Typography>
                                <strong>{item.totalView}</strong> lượt truy cập
                              </Typography>
                            }
                            sx={{ px: 1 }}
                          />
                          <Chip
                            icon={<QuestionAnswerIcon color="info" />}
                            label={
                              <Typography>
                                <strong>{item.totalAnswers}</strong> đáp án
                              </Typography>
                            }
                            sx={{ px: 1 }}
                          />
                          <Chip
                            icon={<MessageIcon color="warning" />}
                            label={
                              <Typography>
                                <strong>{item.totalComments}</strong> lượt bình
                                luận
                              </Typography>
                            }
                            sx={{ px: 1 }}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Divider />
                </React.Fragment>
              ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default Content;
