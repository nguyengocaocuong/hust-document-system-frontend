import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSubjectDetailQuery } from "../../services/SubjectService";
import SubjectType from "./SubjectType";
import { documentType as type } from "../../settings/SubjectSetting";
import SubjectTypeDetail from "./SubjectTypeDetail";
import CustomModal from "../../components/modal";

function SubjectDetail() {
  const { id } = useParams();
  const { data: subjectDetail = [], isSuccess } = useGetSubjectDetailQuery(id);
  const [selected, setSelected] = useState(null);
  const [modalData, setModalData] = useState({ open: false, data: null });
  const openModal = (data)=> setModalData({data, open: true})
  const closeModal = ()=> setModalData({data:null, open: false})
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
              <Grid container pt={2}>
                {subjectDetail?.subjectDocuments?.map((document, index) => (
                  <Grid item xl={6} key={index}>
                    <Typography
                      noWrap
                      variant="h5"
                      fontWeight={500}
                      p={1}
                      pl={2}
                      color={type[document.type].color}
                      onClick={() =>
                        setSelected(
                          selected?.type === document.type
                            ? undefined
                            : document
                        )
                      }
                      sx={{
                        boxShadow: selected?.type === document.type ? 2 : 0,
                        transform: "box-shadow 0.4s",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 2,
                        },
                        width: "100%",
                      }}
                    >
                      <strong>{document.documents.length}</strong>{" "}
                      {type[document.type].title}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider />
          </Box>
          <Box width={"70%"} overflow={"auto"}>
            {selected && (
              <SubjectTypeDetail
                subjectType={selected}
                subjectDetail={subjectDetail}
              />
            )}
            {!selected && (
              <Grid container spacing={0}>
                {subjectDetail?.subjectDocuments?.map((item, index) => (
                  <SubjectType
                    key={index}
                    data={item}
                    select={() => setSelected(item)}
                    openModal={openModal}
                  />
                ))}
              </Grid>
            )}
          </Box>
        </>
      )}
      <CustomModal type={'ADD_SUBJECT_DOCUMENT'} modalData={modalData} handleClose={closeModal}/>
    </Box>
  );
}

export default SubjectDetail;
