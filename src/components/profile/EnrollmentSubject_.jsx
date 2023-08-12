import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Avatar,
  AvatarGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BoxFull from "../BoxFull";
import Select from "react-select";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CodeIcon from "@mui/icons-material/Code";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  useGetAllEnrollmentSubjectQuery,
} from "../../services/EnrollmentService";
import { useEffect } from "react";
import { formatTimeAgo } from "../../utils/ConvertDate";
import { useNavigate, useParams } from "react-router-dom";

const EnrollmentSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: enrollment } = useGetAllEnrollmentSubjectQuery(id);
  const [selectedSubject, setSelectedSubject] = useState([]);
  useEffect(() => {
    setSelectedSubject(enrollment || []);
  }, [enrollment]);

  return (
    <BoxFull p={2} minHeight={"100%"}>
      <Stack
        spacing={2}
        p={2}
        borderRadius={1}
        boxShadow={1}
        border={"1px solid red"}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          Môn học đang theo học
        </Typography>
        <Divider />
        <Select
          isDisabled={true}
          isClearable
          options={[]}
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "50px",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              fontSize: "18px",
            }),
            placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
          }}
          placeholder={"Chọn viện"}
        />
        <Select
          isDisabled={true}
          options={[]}
          isMulti
          styles={{
            control: (styles) => ({
              ...styles,
              minHeight: "50px",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              fontSize: "18px",
            }),
            placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
          }}
          placeholder={"Chọn môn học..."}
        />
        <Divider />
        <BoxFull px={2}>
          <Grid container spacing={3}>
            {selectedSubject.map((item) => (
              <Grid item md={12} lg={6} xl={6} key={item.id}>
                <Box
                  bgcolor={"#E9F0F0"}
                  borderRadius={3}
                  p={3}
                  width={"100%"}
                  sx={{
                    transition: "box-shadow 0.4s",
                    "&:hover": {
                      boxShadow: 2,
                    },
                  }}
                >
                  <Stack spacing={2}>
                    <Typography
                      variant="h3"
                      display={"flex"}
                      alignItems={"end"}
                      fontWeight={700}
                    >
                      {item.name}
                    </Typography>
                    <Stack direction={"row"} spacing={2}>
                      <HourglassEmptyIcon
                        style={{ width: "25px", height: "25px" }}
                      />
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="h5" noWrap>
                        Bạn bắt đầu học <strong>{item.name}</strong> từ
                        {formatTimeAgo(item.createdAt)}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <CodeIcon style={{ width: "25px", height: "25px" }} />
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="h5" noWrap>
                        Mã học phần môn học <strong>{item.subjectCode}</strong>
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <HistoryEduIcon
                        style={{ width: "25px", height: "25px" }}
                      />
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="h5" noWrap>
                        Viện <strong>{item.institute.institute}</strong>
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} spacing={2}>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <IconButton
                          onClick={() => navigate(`/education/${item.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <Typography variant="h5" textTransform={"uppercase"}>
                          Xem môn học
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />

                      <AvatarGroup max={4} total={item.enrollment?.length}>
                        {item.enrollment?.slice(0, 4).map((user, index) => (
                          <Tooltip
                            key={index}
                            title={`${user.firstName} ${user.lastName}`}
                          >
                            <Avatar alt={user.lastName}></Avatar>
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </BoxFull>
      </Stack>
    </BoxFull>
  );
};

export default EnrollmentSubject;
