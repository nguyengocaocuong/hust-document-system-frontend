import {
  Box,
  Chip,
  Divider,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import HustImage from "../assets/images/admin/hust.jpg";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Flag } from "@mui/icons-material";
import Owner from "../components/Owner";

function TeacherDetail() {
  return (
    <Box height={"100%"} width={"100%"} overflow={"auto"} bgcolor={"white"}>
      <Box
        width={"100%"}
        height={"360px"}
        overflow={"hidden"}
        sx={{
          backgroundImage: `url(${HustImage})`,
          backgroundSize: "cover",
          "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "gray",
            opacity: 0.5,
            zIndex: 2,
          },
        }}
        position={"relative"}
      >
        <Box
          width={"100%"}
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "0",
            zIndex: 10,
          }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"70%"}
            minWidth={"600px"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img
                src={
                  "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/2e51cb8b-fd51-4166-84a2-63559733baac/300x450"
                }
                alt=""
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "100%",
                }}
              />
              <Box px={2}>
                <Typography
                  variant="h2"
                  fontWeight={"bold"}
                  sx={{ color: "red" }}
                >
                  {"Nguyễn Thị Thu Hương"}
                </Typography>
                <Typography
                  pt={3}
                  py={1}
                  fontStyle={"italic"}
                  variant="h4"
                  sx={{ color: "white" }}
                >
                  huong.nt1343@sis.hust.edu.vn
                </Typography>
                <Typography
                  fontStyle={"italic"}
                  variant="h4"
                  sx={{ color: "white" }}
                >
                  huong.nt1343@sis.hust.edu.vn
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "50px",
                  borderRadius: 2,
                  border: "1px solid white",
                  px: 2,
                }}
              >
                <strong>23</strong>{" "}
                <span style={{ fontSize: "30px" }}>bài đánh giá</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
      >
        <Box width={"60%"} minWidth={"600px"} py={2}>
          <Typography variant="h4" fontWeight={"bold"}>
            Giới thiệu
          </Typography>
          <Box>
            <p>
              Đỗ Quốc Huy tốt nghiệp đại học v&agrave; thạc sĩ ng&agrave;nh
              C&ocirc;ng nghệ th&ocirc;ng tin tại Đại học B&aacute;ch khoa
              H&agrave; Nội năm 2006 v&agrave; 2008. Trong khoảng thời gian từ
              2006-2009 &ocirc;ng l&agrave; giảng vi&ecirc;n Khoa C&ocirc;ng
              nghệ th&ocirc;ng tin trường Đại học B&aacute;ch khoa H&agrave;
              Nội. &Ocirc;ng nhận bằng tiến sĩ ng&agrave;nh Th&ocirc;ng tin tại
              Học viện Kỹ thuật Toyota (TTI) v&agrave;o năm 2013. Từ năm 2014
              đến 2017, &ocirc;ng l&agrave; nghi&ecirc;n cứu sinh sau Tiến sĩ
              tại trung t&acirc;m nghi&ecirc;n cứu cho xe th&ocirc;ng minh tại
              TTI. Hiện nay, &ocirc;ng đang l&agrave; giảng vi&ecirc;n tại bộ
              m&ocirc;n Khoa học M&aacute;y t&iacute;nh thuộc trường Đại học
              B&aacute;ch khoa H&agrave; Nội Lĩnh vực nghi&ecirc;n cứu bao gồm
              c&aacute;c vấn đề li&ecirc;n quan đến b&agrave;i to&aacute;n
              t&igrave;m đường cho xe tự h&agrave;nh, an to&agrave;n th&ocirc;ng
              tin v&agrave; hệ điều h&agrave;nh.
            </p>
            <div className="container section-title-container">
              <h3 className="section-title section-title-normal">
                <span className="section-title-main">
                  C&Aacute;C C&Ocirc;NG TR&Igrave;NH KHOA HỌC TI&Ecirc;U BIỂU
                </span>
              </h3>
            </div>
            <ul>
              <li>
                Human Drivers Based Active-Passive Model for Automated Lane
                Change. Quoc Huy Do, Hossein Tehrani Niknejad, Seiichi Mita,
                Masumi Egawa, Kenji Muto, Keisuke Yoneda, IEEE Intell.
                Transport. Syst. Mag. 9(1): 42-56 (2017)
              </li>
              <li>
                General behavior and motion model for automated lane change.
                Hossein Tehrani Niknejad, Quoc Huy Do, Masumi Egawa, Kenji Muto,
                Keisuke Yoneda, Seiichi Mita Intelligent Vehicles Symposium
                2015: 1154-1159
              </li>
              <li>
                Narrow passage path planning using fast marching method and
                support vector machine, Quoc Huy Do, Seiichi Mita, Keisuke
                Yoneda, Intelligent Vehicles Symposium 2014: 630-635
              </li>
              <li>
                Dynamic and Safe Path Planning Based on Support Vector Machine
                among Multi Moving Obstacles for Autonomous Vehicles. Quoc Huy
                Do, Seiichi Mita, Hossein Tehrani Niknejad, Long Han, IEICE
                Transactions 96-D(2): 314-328 (2013)
              </li>
              <li>
                A Practical and Optimal Path Planning for Autonomous Parking
                Using Fast Marching Algorithm and Support Vector Machine. Quoc
                Huy Do, Seiichi Mita, Keisuke Yoneda, IEICE Transactions
                96-D(12): 2795-2804 (2013)
              </li>
              <li>
                Vehicle path planning with maximizing safe margin for driving
                using Lagrange multipliers. Quoc Huy Do, Hossein Tehrani
                Niknejad, Keisuke Yoneda, Ryohei Sakai, Seiichi Mita,
                Intelligent Vehicles Symposium 2013: 171-176
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
      >
        <Box width={"70%"} py={2}>
          <Typography variant="h3" fontWeight={"bold"} py={2}>
            Các bài review về giảng viên <strong>Nguyễn Thị Thu Hương</strong>
          </Typography>
          <Stack spacing={2} width={"100%"}>
            <Box
              width={"100%"}
              height={"260px"}
              sx={{
                backgroundColor: "#F0F0F0",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
                transition: "box-shadow 0.4s",
              }}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Owner
                owner={{ firstName: "Nguyễn Ngô", lastName: "Cao Cường" }}
                createdAt={new Date()}
                listItem={[
                  <Chip
                    key={1}
                    color="error"
                    label={"Báo cáo nội dung"}
                    icon={<Flag />}
                  />,
                ]}
              />
              <Box
                px={2}
                py={1}
                height={"130px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                <Typography fontSize={"15px"} overflow={"hidden"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur accusantium voluptatibus eveniet maxime ullam sed
                  dolor earum itaque, perspiciatis autem debitis tempore fugiat
                  similique impedit aspernatur dolores nostrum reiciendis neque?
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, soluta vel quis labore nulla quo modi nihil maiores
                  tenetur a sequi molestiae. Quaerat, repellendus nostrum.
                  Explicabo molestiae dicta consequuntur minima?
                </Typography>
              </Box>
              <Divider />
              <Box
                height={"55px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={2}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"65%"}
                  sx={{
                    backgroundColor: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 5,
                    boxShadow: 1,
                  }}
                >
                  <InputBase
                    placeholder="Nếu xác nhận hãy cho biết lý do"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Tooltip ititle="Kiểm tra">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon color="warning" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Phê duyệt">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                      mx={1}
                    >
                      <OfflinePinIcon color="success" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box
              width={"100%"}
              height={"260px"}
              sx={{
                backgroundColor: "#F0F0F0",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
                transition: "box-shadow 0.4s",
              }}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Owner
                owner={{ firstName: "Nguyễn Ngô", lastName: "Cao Cường" }}
                createdAt={new Date()}
                listItem={[
                  <Chip
                    key={1}
                    color="error"
                    label={"Báo cáo nội dung"}
                    icon={<Flag />}
                  />,
                ]}
              />
              <Box
                px={2}
                py={1}
                height={"130px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                <Typography fontSize={"15px"} overflow={"hidden"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur accusantium voluptatibus eveniet maxime ullam sed
                  dolor earum itaque, perspiciatis autem debitis tempore fugiat
                  similique impedit aspernatur dolores nostrum reiciendis neque?
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, soluta vel quis labore nulla quo modi nihil maiores
                  tenetur a sequi molestiae. Quaerat, repellendus nostrum.
                  Explicabo molestiae dicta consequuntur minima?
                </Typography>
              </Box>
              <Divider />
              <Box
                height={"55px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={2}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"65%"}
                  sx={{
                    backgroundColor: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 5,
                    boxShadow: 1,
                  }}
                >
                  <InputBase
                    placeholder="Nếu xác nhận hãy cho biết lý do"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Tooltip ititle="Kiểm tra">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon color="warning" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Phê duyệt">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                      mx={1}
                    >
                      <OfflinePinIcon color="success" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box
              width={"100%"}
              height={"260px"}
              sx={{
                backgroundColor: "#F0F0F0",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
                transition: "box-shadow 0.4s",
              }}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Owner
                owner={{ firstName: "Nguyễn Ngô", lastName: "Cao Cường" }}
                createdAt={new Date()}
                listItem={[
                  <Chip
                    key={1}
                    color="error"
                    label={"Báo cáo nội dung"}
                    icon={<Flag />}
                  />,
                ]}
              />
              <Box
                px={2}
                py={1}
                height={"130px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                <Typography fontSize={"15px"} overflow={"hidden"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur accusantium voluptatibus eveniet maxime ullam sed
                  dolor earum itaque, perspiciatis autem debitis tempore fugiat
                  similique impedit aspernatur dolores nostrum reiciendis neque?
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, soluta vel quis labore nulla quo modi nihil maiores
                  tenetur a sequi molestiae. Quaerat, repellendus nostrum.
                  Explicabo molestiae dicta consequuntur minima?
                </Typography>
              </Box>
              <Divider />
              <Box
                height={"55px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={2}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"65%"}
                  sx={{
                    backgroundColor: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 5,
                    boxShadow: 1,
                  }}
                >
                  <InputBase
                    placeholder="Nếu xác nhận hãy cho biết lý do"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Tooltip ititle="Kiểm tra">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon color="warning" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Phê duyệt">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                      mx={1}
                    >
                      <OfflinePinIcon color="success" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box
              width={"100%"}
              height={"260px"}
              sx={{
                backgroundColor: "#F0F0F0",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
                transition: "box-shadow 0.4s",
              }}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Owner
                owner={{ firstName: "Nguyễn Ngô", lastName: "Cao Cường" }}
                createdAt={new Date()}
                listItem={[
                  <Chip
                    key={1}
                    color="error"
                    label={"Báo cáo nội dung"}
                    icon={<Flag />}
                  />,
                ]}
              />
              <Box
                px={2}
                py={1}
                height={"130px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                <Typography fontSize={"15px"} overflow={"hidden"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur accusantium voluptatibus eveniet maxime ullam sed
                  dolor earum itaque, perspiciatis autem debitis tempore fugiat
                  similique impedit aspernatur dolores nostrum reiciendis neque?
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, soluta vel quis labore nulla quo modi nihil maiores
                  tenetur a sequi molestiae. Quaerat, repellendus nostrum.
                  Explicabo molestiae dicta consequuntur minima?
                </Typography>
              </Box>
              <Divider />
              <Box
                height={"55px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={2}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"65%"}
                  sx={{
                    backgroundColor: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 5,
                    boxShadow: 1,
                  }}
                >
                  <InputBase
                    placeholder="Nếu xác nhận hãy cho biết lý do"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Tooltip ititle="Kiểm tra">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon color="warning" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Phê duyệt">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                      mx={1}
                    >
                      <OfflinePinIcon color="success" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box
              width={"100%"}
              height={"260px"}
              sx={{
                backgroundColor: "#F0F0F0",
                "&:hover": { boxShadow: 4 },
                cursor: "pointer",
                transition: "box-shadow 0.4s",
              }}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Owner
                owner={{ firstName: "Nguyễn Ngô", lastName: "Cao Cường" }}
                createdAt={new Date()}
                listItem={[
                  <Chip
                    key={1}
                    color="error"
                    label={"Báo cáo nội dung"}
                    icon={<Flag />}
                  />,
                ]}
              />
              <Box
                px={2}
                py={1}
                height={"130px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                <Typography fontSize={"15px"} overflow={"hidden"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur accusantium voluptatibus eveniet maxime ullam sed
                  dolor earum itaque, perspiciatis autem debitis tempore fugiat
                  similique impedit aspernatur dolores nostrum reiciendis neque?
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, soluta vel quis labore nulla quo modi nihil maiores
                  tenetur a sequi molestiae. Quaerat, repellendus nostrum.
                  Explicabo molestiae dicta consequuntur minima?
                </Typography>
              </Box>
              <Divider />
              <Box
                height={"55px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                px={2}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"65%"}
                  sx={{
                    backgroundColor: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 5,
                    boxShadow: 1,
                  }}
                >
                  <InputBase
                    placeholder="Nếu xác nhận hãy cho biết lý do"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Tooltip ititle="Kiểm tra">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon color="warning" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Phê duyệt">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                      mx={1}
                    >
                      <OfflinePinIcon color="success" />
                    </Box>
                  </Tooltip>
                  <Tooltip title="Từ chối">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        backgroundColor: "white",
                        width: "35px",
                        cursor: "pointer",
                        height: "35px",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default TeacherDetail;
