import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Subject from "../components/subject/Subject";
import { useGetSubjectByInstituteMutation } from "../services/SubjectService";
import Select from "react-select";
import { useGetAllInsitutesQuery } from "../services/UserInstituteService";

function Education() {
  const { data: institutes } = useGetAllInsitutesQuery();
  const [instutite, setInstutite] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  const [selected, setSelected] = useState([]);
  const [getSubjectByInstitute] = useGetSubjectByInstituteMutation();
  useEffect(() => {
    if (instutite)
      getSubjectByInstitute(instutite.value).then((response) => {
        setListSubject(response.data?.content || []);
      });
  }, [instutite]);
  const handleSelectInstutite = (value) => {
    setInstutite(value);
    setSelected([]);
    setListSubject([]);
  };
  const handleSelectSubject = (value) => {
    setSelected(value);
  };
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      height={"calc(100vh - 72px)"}
      width={"100%"}
      overflow={"hidden"}
    >
      <Box p={2} height={"120px"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"start"}
          pb={2}
        >
          <Typography variant="h3" color={"text.secondary"}>
            Tài liệu học tập
          </Typography>
        </Box>
        <Stack spacing={2} direction={"row"} width={"100%"}>
          <Select
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
                minHeight: "40px",
                width: "300px",
              }),
              multiValueLabel: (styles) => ({
                ...styles,
                fontSize: "18px",
              }),
              singleValue: (styles) => ({
                ...styles,
                fontSize: "18px",
              }),
              placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
            }}
            placeholder={"Chọn trường-viện"}
            onChange={handleSelectInstutite}
          />
          <Select
            isDisabled={listSubject.length <= 0}
            options={
              listSubject?.map((subject) => ({
                value: subject.id,
                label: `${subject.subjectCode} | ${subject.name}`,
              })) || []
            }
            isMulti
            styles={{
              control: (styles) => ({
                ...styles,
                minHeight: "40px",
                maxHeight: "100%",
                minWidth: "500px",
              }),
              multiValueLabel: (styles) => ({
                ...styles,
                fontSize: "18px",
              }),
              placeholder: (styles) => ({ ...styles, fontSize: "18px" }),
            }}
            placeholder={"Chọn học phần muốn tìm kiếm"}
            onChange={handleSelectSubject}
          />
        </Stack>
      </Box>
      <Box height={"calc(100% - 120px)"} width={"100%"}>
        <Subject selected={selected} />
      </Box>
    </Box>
  );
}

export default Education;
