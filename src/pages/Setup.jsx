import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Select from "react-select";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  useGetInstituteQuery,
  useGetSubjectByInstituteMutation,
} from "../services/SubjectService";
import { useEffect } from "react";
import BoxFull from "../components/BoxFull";
import logo from "../assets/images/logo/logo.png";
import logo_notext from "../assets/images/logo/logo_notext.png";
import annotateImage from "../assets/images/welcome/Chú thích tài liệu.png";
import shareDocument from "../assets/images/welcome/Trao đổi đáp án.png";
import { useCreateEnrollmentSubjectsMutation } from "../services/EnrollmentService";
import { useDispatch } from "react-redux";
import { updateSetup } from "../store/authState";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div className="area">
      <BoxFull display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={3} width={"450px"} sx={{zIndex:20}}>
          <Box>
            <img alt="logo" src={logo_notext} height={"100px"} width={"auto"} />
          </Box>
          <Typography variant="h1" fontWeight={"bold"} color={"white"}>
            {activeStep === 1 ? "HUST Document System" : "Chọn môn đang học"}
          </Typography>
          {activeStep === 1 ? (
            <>
              <Typography variant="h4" fontStyle={"italic"} color={"white"}>
                Hệ thống chia sẻ tài liệu học tập trong nội bộ đại học Bách Khoa
                Hà Nội, nơi bạn có thể tìm thấy hàng loạt các tài liệu có ích
                cho việc học tập.
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 0, cursor: "pointer" }}
                  color="primary"
                  size="large"
                  onClick={() => setActiveStep(2)}
                >
                  Tiếp tục <NavigateNextIcon />
                </Button>
              </Box>
            </>
          ) : (
            <Setup />
          )}
        </Stack>

        <Box
          width={"750px"}
          height={"700px"}
          justifyContent={"end"}
          position={"relative"}
          p={2}
        >
          <Box
            width={"500px"}
            height={"auto"}
            boxShadow={15}
            borderRadius={2}
            overflow={"hidden"}
            position={"absolute"}
            top={"50px"}
            left={"300px"}
            sx={{
              cursor: "pointer",
              zIndex: 2,
              transition: "z-index 0.4s, box-shadow 0.4s",
              "&:hover": {
                boxShadow: 24,
                zIndex: 10,
              },
            }}
          >
            <img src={annotateImage} alt="" width={"100%"} />
          </Box>
          <Box
            width={"500px"}
            height={"auto"}
            boxShadow={15}
            borderRadius={2}
            overflow={"hidden"}
            position={"absolute"}
            top={"200px"}
            left={"370px"}
            sx={{
              cursor: "pointer",
              zIndex: 3,
              transition: "z-index 0.4s, box-shadow 0.4s",
              "&:hover": {
                boxShadow: 24,
                zIndex: 10,
              },
            }}
          >
            <img src={shareDocument} alt="" width={"100%"} />
          </Box>
          <Box
            width={"500px"}
            height={"auto"}
            boxShadow={15}
            borderRadius={2}
            overflow={"hidden"}
            position={"absolute"}
            top={"400px"}
            left={"200px"}
            sx={{
              cursor: "pointer",
              zIndex: 2,
              transition: "z-index 0.4s, box-shadow 0.4s",
              "&:hover": {
                boxShadow: 24,
                zIndex: 10,
              },
            }}
          >
            <img src={shareDocument} alt="" width={"100%"} />
          </Box>
        </Box>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </BoxFull>
    </div>
  );
};
function Setup() {
  const [getSubjectByInstitute] = useGetSubjectByInstituteMutation();
  const { data } = useGetInstituteQuery();
  const [selected, setSelected] = useState([]);
  const [instutite, setInstutite] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  const [createEnrollmentSubjects] = useCreateEnrollmentSubjectsMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNext = ()=>{
    const formData = new FormData()
    selected.forEach(value => formData.append("subjects", value.value))
    createEnrollmentSubjects(formData).then(response => {
      if(!response.error){
        dispatch(updateSetup())
        navigate('/')
      }
    })
  }
  useEffect(() => {
    if (instutite)
      getSubjectByInstitute(instutite.value).then((response) => {
        setListSubject(response.data?.content || []);
      });
  }, [instutite]);
  const handleSelectInstutite = (value) => {
    setInstutite(value);
  };

  const handleSelectSubject = (value) => {
    setSelected(value);
  };
  return (
    <>
      <Typography variant="h4" color={'white'}>
        Việc lựa chọn môn học, giúp chúng tôi trong việc hiển thị các tài liệu
        mà bạn cần
      </Typography>
      <Select
        isClearable
        options={data?.map((value) => ({ value, label: value })) || []}
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
        isDisabled={listSubject.length <= 0}
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
        onChange={handleSelectSubject}
      />
      <Box display={"flex"} justifyContent={"end"}>
        <Button
          variant="contained"
          disabled={selected.length === 0}
          display={"flex"}
          sx={{ borderRadius: 0 }}
          onClick={handleNext}
        >
          Tiếp tục <NavigateNextIcon />
        </Button>
      </Box>
    </>
  );
}

export default WelcomePage;
