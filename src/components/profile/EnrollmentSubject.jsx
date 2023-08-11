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
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import BoxFull from "../BoxFull";
import Select from "react-select";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CodeIcon from "@mui/icons-material/Code";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import {
  useCreateEnrollmentSubjectsMutation,
  useDeleteEnrollmentSubjectsMutation,
  useGetAllEnrollmentSubjectQuery,
} from "../../services/EnrollmentService";
import { useEffect } from "react";
import { formatTimeAgo } from "../../utils/ConvertDate";
import {
  useGetSubjectByInstituteMutation,
} from "../../services/SubjectService";
import { useNavigate } from "react-router-dom";
import { useGetAllInsitutesQuery } from "../../services/UserInstituteService";

const EnrollmentSubject = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data: enrollment } = useGetAllEnrollmentSubjectQuery();
  const [selectedSubject, setSelectedSubject] = useState([]);
  useEffect(() => {
    setSelectedSubject(enrollment || []);
  }, [enrollment]);
  const [getSubjectByInstitute] = useGetSubjectByInstituteMutation();
  const { data: institutes } = useGetAllInsitutesQuery();
  const [selected, setSelected] = useState([]);
  const [instutite, setInstutite] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  useEffect(() => {
    if (instutite)
      getSubjectByInstitute(instutite.value).then((response) => {
        setListSubject(
          response.data?.content?.filter(
            (item) =>
              selectedSubject.find((i) => i.id === item.id) === undefined
          ) || []
        );
      });
    // eslint-disable-next-line  
  }, [instutite]);
  const handleSelectInstutite = (value) => {
    setInstutite(value);
  };
  const handleSelectSubject = (value) => {
    setSelected(value);
  };
  const [createEnrollmentSubjects] = useCreateEnrollmentSubjectsMutation();

  const onAddEnrollmentSubject = () => {
    setLoading(true);
    const formData = new FormData();
    selected.forEach((value) => formData.append("subjects", value.value));
    createEnrollmentSubjects(formData).then((response) => {
      if (!response.error) {
        setSelected([]);
        setLoading(false);
      }
    });
  };

  const [deleteEnrollmentSubject] = useDeleteEnrollmentSubjectsMutation();
  const onDeleteEnrollmentSubject = (subject) => {
    const data = new FormData();
    data.append("subjects", subject.id);
    data.append("subjects", subject.id);
    deleteEnrollmentSubject(data).then((response) => {
      if (!response.error) {
        setSelectedSubject((preData) =>
          preData.filter((data) => data.id !== subject.id)
        );
      }
    });
  };
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
          isDisabled={isLoading}
          isClearable
          options={
            institutes?.map((item) => ({
              value: item.id,
              label: item.institute,
            })) || []
          }
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
          onChange={handleSelectInstutite}
        />
        <Select
          isDisabled={listSubject.length <= 0 || isLoading}
          options={
            listSubject?.map((subject) => ({
              value: subject.id,
              label: subject.name,
            })) || []
          }
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
          value={selected}
          onChange={handleSelectSubject}
        />
        <Box
          display={selected.length > 0 ? "flex" : "none"}
          justifyContent={"end"}
        >
          <Button
            color={"primary"}
            sx={{ borderRadius: 0 }}
            variant="contained"
            onClick={onAddEnrollmentSubject}
          >
            Thêm mới
            {isLoading && (
              <CircularProgress
                sx={{
                  width: "30px!important",
                  height: "30px!important",
                  color: "white",
                  fontSize: "12px",
                }}
              />
            )}
          </Button>
        </Box>
        <Divider />
        <BoxFull px={2}>
          <Grid container spacing={3}>
            {selectedSubject.map((item) => (
              <Grid item md={12} lg={6} xl={6}>
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
                      <Stack
                        direction={"row"}
                        spacing={1}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <IconButton
                          onClick={() => onDeleteEnrollmentSubject(item)}
                        >
                          <DisabledByDefaultIcon />
                        </IconButton>
                        <Typography variant="h5" textTransform={"uppercase"}>
                          Loại bỏ
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
