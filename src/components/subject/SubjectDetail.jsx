import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSubjectDetailQuery } from "../../services/SubjectService";
import SubjectType from "./SubjectType";
import { documentType as type } from "../../settings/SubjectSetting";
import SubjectTypeDetail from "./SubjectTypeDetail";
import DoneIcon from "@mui/icons-material/Done";
import BoxBetween from "../BoxBetween";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useDispatch } from "react-redux";
import { openSubjectDocumentModal } from "../../store/modalState";
import noDocument from "../../assets/images/noDocument.png";
function SubjectDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: subjectDetail, isSuccess } = useGetSubjectDetailQuery(id);
  const [selected, setSelected] = useState([]);
  const handleSelected = (item) => {
    if (selected.find((i) => i.type === item.type))
      setSelected(selected.filter((i) => i.type !== item.type));
    else setSelected([...selected, item]);
  };
  const openModal = (subjectDocumentType, acceptedFiles = []) => {
    dispatch(
      openSubjectDocumentModal({
        subjectName: subjectDetail?.name,
        subjectId: id,
        acceptedFiles,
        subjectDocumentType,
      })
    );
  };

  return (
    <Box height={"100%"} overflow={"hidden"} display={"flex"} bgcolor={"white"}>
      {isSuccess && (
        <>
          <Box
            width={"30%"}
            height={"100%"}
            overflow={"auto"}
            borderRight={"1px solid #D8D9D9"}
            p={2}
            boxShadow={5}
          >
            <Typography variant="h2" textAlign={"center"} p={2} pb={3}>
              <strong>{subjectDetail.subjectCode}</strong>
            </Typography>
            <Divider />
            <Box p={2}>
              <Typography variant="h3" pb={1.5}>
                Thông tin học phần
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6">
                    <strong>Tên học phần</strong>
                  </Typography>
                  <Typography variant="h5" fontWeight={500} color={"gray"}>
                    {subjectDetail.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    <strong>Mã học phần</strong>
                  </Typography>
                  <Typography variant="h5" fontWeight={500} color={"gray"}>
                    {subjectDetail.subjectCode}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    <strong>Mô tả</strong>
                  </Typography>
                  <Typography variant="h5" fontWeight={500} color={"gray"}>
                    {subjectDetail.description}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Divider />
            <Box p={2}>
              <Typography variant="h3">Tài liệu môn học</Typography>
              <Box display={"flex"} flexWrap={"wrap"}>
                {subjectDetail?.subjectDocuments?.map((document, index) => (
                  <Box p={1} key={index}>
                    <Chip
                      onClick={() => handleSelected(document)}
                      color={
                        selected?.find((i) => i.type === document.type)
                          ? "success"
                          : "primary"
                      }
                      sx={{
                        boxShadow: selected?.find(
                          (i) => i.type === document.type
                        )
                          ? 2
                          : 0,
                        transform: "box-shadow 0.4s",
                        cursor: "pointer",

                        "&:hover": {
                          boxShadow: 2,
                        },
                        width: "100%",
                      }}
                      label={type[document.type].title}
                      icon={
                        selected?.find((i) => i.type === document.type) !==
                        undefined ? (
                          <DoneIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            sx={{ width: "14px", height: "14px" }}
                          />
                        )
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Divider />
          </Box>
          <Box width={"70%"} overflow={"auto"}>
            {selected.length > 0 &&
              selected.map((s, index) => (
                <SubjectTypeDetail
                  key={index}
                  subjectType={s}
                  subjectDetail={subjectDetail}
                />
              ))}
            {selected.length === 0 && (
              <Grid container spacing={0}>
                {subjectDetail?.subjectDocuments?.map((item, index) => (
                  <SubjectType
                    key={index}
                    data={item}
                    select={() => setSelected([item])}
                    openModal={() => openModal(item.type, undefined)}
                  />
                ))}
              </Grid>
            )}
            {subjectDetail?.subjectDocuments.length === 0 && (
              <BoxBetween>
                <Box
                  onClick={() => openModal("EXAM", undefined)}
                  p={5}
                  border={`1px dotted  gray`}
                >
                  <img src={noDocument} alt="?" />
                  <Typography variant="h4">
                    Môn học này chưa có tài liệu
                  </Typography>
                </Box>
              </BoxBetween>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default SubjectDetail;
