import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetSubjectDocumentDetailQuery,
  useUploadAnnotateForSubjectDocumentMutation,
} from "../services/SubjectService";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import BoxFull from "./BoxFull";
import SubjectDocumentInfo from "./SubjectDocumentInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import ConfrimSplitModal from "./modal/ConfrimSplitModal";
import noteIcon from "../assets/images/icon/noteIcon.png";
import saveIcon from "../assets/images/icon/save.svg";
import { useProSidebar } from "react-pro-sidebar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
function SubjectDocumentDetail() {
  const { id } = useParams();
  const viewer = useRef(null);
  const location = useLocation();
  const { user } = useSelector((state) => state.authentication);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [instance, setInstance] = useState(null);
  const [openConfirmSplit, setOpenConfirmSplit] = useState({ open: false });
  const [docPDf, setDocPdf] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [uploadAnnotateForSubjectDocument] =
    useUploadAnnotateForSubjectDocumentMutation();
  const { data: subjectDocumentDetail = {}, isSuccess } =
    useGetSubjectDocumentDetailQuery(id);
  const [tmpXfdfFile, setTmpXfdfFile] = useState({
    open: false,
    xfdfFile: null,
    description: "",
  });
  const [language, setLanguage] = useState({
    value: "ROOT",
    loading: true,
  });

  // Xử lý dịch tài liệu
  const isImageDocument = () => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = subjectDocumentDetail.document.name
      ?.split(".")
      .pop()
      .toLowerCase();
    return imageExtensions.includes(fileExtension);
  };
  const translateImage = async (value) => {
    setLanguage({ value, loading: true });
    var file;
    if (docPDf === null) {
      const doc = instance.Core.documentViewer.getDocument();
      const docBuffer = await doc.getFileData();
      const blob = new Blob([docBuffer], { type: "application/pdf" });
      file = new File([blob], "translate.pdf", {
        type: blob.type,
      });
    } else {
      file = new File([docPDf], "translate.pdf", {
        type: docPDf.type,
      });
    }
    const body = new FormData();
    body.append("file", file);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/users/subjects/subjectDocument/2/translate-file?targetLanguage=${value}`,
      {
        method: "POST",
        headers: {
          "X-HUST-DOCUMENT-KEY": user.token,
        },
        body: body,
      }
    )
      .then((response) => response.blob())
      .then((blobData) => {
        instance.UI.TabManager.addTab(blobData, {
          filename: language.value + ".pdf",
          setActive: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onTranslage = async (translate, page) => {
    if (translate) {
      var file;
      setOpenConfirmSplit({ open: false });
      setLanguage({ value: openConfirmSplit.language, loading: true });
      if (docPDf === null) {
        const doc = instance.Core.documentViewer.getDocument();
        const data = await doc.extractPages(page);
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });
        file = new File([blob], "filename.pdf", { type: blob.type });
      } else {
        const doc = await instance.Core.createDocument(docPDf);
        const data = await doc.extractPages(page);
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });
        file = new File([blob], "filename.pdf", { type: blob.type });
      }
      const body = new FormData();
      body.append("file", file);
      fetch(
        `${process.env.REACT_APP_BASE_URL}/users/subjects/subjectDocument/2/translate-file?targetLanguage=${openConfirmSplit.language}`,
        {
          method: "POST",
          headers: {
            "X-HUST-DOCUMENT-KEY": user.token,
          },
          body: body,
        }
      )
        .then((response) => response.blob())
        .then((blobData) => {
          instance.UI.TabManager.addTab(blobData, {
            setActive: true,
            filename: language.value + ".pdf",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return;
    }
  };
  const handleSelectLanguage = async (value) => {
    if (docPDf === null) {
      const doc = instance.Core.documentViewer.getDocument();
      const docBuffer = await doc.getFileData();
      const blob = new Blob([docBuffer], { type: "application/pdf" });
      setDocPdf(blob);
      setPageCount(instance.Core.documentViewer.getPageCount());
    }
    if (isImageDocument()) {
      translateImage(value);
      return;
    }

    if (pageCount >= 15 || instance.Core.documentViewer.getPageCount() >= 15) {
      setOpenConfirmSplit({ open: true, language: value });
      return;
    }
    setLanguage({ value, loading: true });
    fetch(
      `${process.env.REACT_APP_BASE_URL}/users/subjects/subjectDocument/${id}/translate?targetLanguage=${value}&${location.search}`,
      {
        method: "GET",
        headers: {
          "X-HUST-DOCUMENT-KEY": user.token,
        },
      }
    )
      .then((response) => response.blob())
      .then((blobData) => {
        instance.UI.TabManager.addTab(blobData, {
          filename: language.value + ".pdf",
          setActive: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetLanguage = () => {
    instance?.UI?.TabManager.setActiveTab(1);
    setLanguage({
      value: "ROOT",
      loading: true,
    });
  };

  // Khởi tạo vùng hiển thị tài liệu
  useEffect(() => {
    WebViewer(
      {
        path: "/lib",
        enableAnnotations: false,
        isReadOnly: true,
        loadAsPDF: true,
        licenseKey:
          "demo:1687424583865:7d9865fa030000000050a5812850e2d2c4914807b2282b5e7b5bb1cb9f",
      },
      viewer.current
    ).then((instance) => {
      const {
        UI,
        Core: { annotationManager, documentViewer },
      } = instance;
      UI.enableFeatures([UI.Feature.MultiTab]);
      UI.setHeaderItems((headers) => {
        headers.push({
          type: "actionButton",
          img: noteIcon,
          onClick: () => {
            if (UI.TabManager.getActiveTab().id !== 1) return;
            annotationManager.disableReadOnlyMode();
            UI.enableFeatures([UI.Feature.Annotations]);
            documentViewer.enableAnnotations();
            annotationManager.setCurrentUser(
              `${user.firstName} ${user.lastName}`
            );
            UI.setHeaderItems((headers) => {
              headers.pop();
              headers.push({
                type: "actionButton",
                img: saveIcon,
                onClick: async () => {
                  if (UI.TabManager.getActiveTab().id === 1) {
                    const xfdfString =
                      await annotationManager.exportAnnotations();
                    const blob = new Blob([xfdfString], {
                      type: "application/vnd.adobe.xfdf",
                    });
                    const file = new File([blob], "annotate.xfdf", {
                      type: blob.type,
                    });
                    if (UI.isFullscreen()) UI.toggleFullScreen();
                    setTmpXfdfFile({
                      open: true,
                      xfdfFile: file,
                      description: "",
                    });
                  }
                },
              });
            });
          },
        });
      });
      documentViewer.addEventListener(UI.Events.DOCUMENT_LOADED, () => {
        setLanguage((preState) => ({ ...preState, loading: false }));
        if (UI.TabManager.getActiveTab().id !== 1) {
          annotationManager.enableReadOnlyMode();
          UI.disableFeatures([UI.Feature.Annotations]);
          documentViewer.disableAnnotations();
        }
      });
      setInstance(instance);
    });
    // eslint-disable-next-line
  }, []);

  // Đọc tệp gốc và hiển thị
  useEffect(() => {
    if (isSuccess && instance)
      instance.UI.TabManager.addTab(
        `${process.env.REACT_APP_BASE_URL}/users/subjects/subjectDocument/${id}/readFile${location.search}`,
        {
          filename: subjectDocumentDetail.document.name,
          customHeaders: {
            "X-HUST-DOCUMENT-KEY": user.token,
          },
          setActive: true,
        }
      );
    // eslint-disable-next-line
  }, [instance, isSuccess]);

  useEffect(() => {
    const handleResize = () => {
      if (!collapsed && window.innerWidth < 1400) {
        collapseSidebar(true);
      }
      if (collapsed && window.innerWidth >= 1400) {
        collapseSidebar(false);
      }
      if (window.innerWidth <= 1150) setShowDetail(false);
      if (window.innerWidth > 1150) setShowDetail(true);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapseSidebar, collapsed]);
  const [isShowDetail, setShowDetail] = useState(true);
  const [show, setShow] = useState(false);

  const onSaveAnnotate = () => {
    const formData = new FormData();
    formData.append("documents", tmpXfdfFile.xfdfFile);
    formData.append("description", tmpXfdfFile.description);
    uploadAnnotateForSubjectDocument({
      subjectDocumentId: id,
      body: formData,
    }).then((response) => {
      if (!response.error) {
        setTmpXfdfFile({
          xfdfFile: null,
          description: "",
          open: false,
        });
      }
    });
  };

  const onAddAnnotate = () => {
    if (!instance || instance.UI.TabManager.getActiveTab().id !== 1) return;
    const {
      UI,
      Core: { annotationManager, documentViewer },
    } = instance;
    annotationManager.disableReadOnlyMode();
    UI.enableFeatures([UI.Feature.Annotations]);
    documentViewer.enableAnnotations();
    annotationManager.setCurrentUser(`${user.firstName} ${user.lastName}`);
  };
  const onShowAnnotate = (annotateId) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/users/subjects/subjectDocument/${id}/answerSubjectDocument/${annotateId}/readFile`,
      {
        method: "GET",
        headers: {
          "X-HUST-DOCUMENT-KEY": user.token,
        },
      }
    )
      .then((response) => response.text())
      .then(async (text) => {
        const {
          UI,
          Core: { annotationManager, documentViewer },
        } = instance;

        // annotationManager.promoteUserToAdmin();
        // const annots = annotationManager.getAnnotationsList();
        // annotationManager.deleteAnnotations(annots);
        // annotationManager.demoteUserFromAdmin();

        // if (user.id !== subjectDocumentDetail.owner.id)
        annotationManager.enableReadOnlyMode();
        UI.enableFeatures([UI.Feature.Annotations]);
        documentViewer.enableAnnotations();
        annotationManager.importAnnotations(text);
      });
  };
  return (
    <BoxFull sx={{ backgroundColor: "white" }}>
      <Box display={"flex"} height={"100%"} position={"relative"}>
        <Box
          width={!isShowDetail ? "100%" : `70%`}
          borderRight="1px solid #D8D9D9"
          borderBottom="1px solid #D8D9D9"
          ref={viewer}
          position={"relative"}
          sx={{ transition: "width 0.4s" }}
        >
          <Box
            position={"absolute"}
            top={50}
            right={0}
            bottom={50}
            height={"100%"}
            width={"100px"}
            display={isShowDetail ? "none" : "flex"}
            alignItems={"center"}
            justifyContent={"end"}
            sx={{
              background:
                "linear-gradient(90deg, rgba(213,209,209,0) 50%, rgba(128,126,124,0.4515056022408963) 100%)",
              opacity: 0.4,
              "&:hover": {
                opacity: 1,
              },
              transition: "opacity 0.4s",
            }}
          >
            <Tooltip title={show ? "Ẩn bình luận" : "Hiện bình luận"}>
              {show ? (
                <ChevronRightIcon
                  onClick={() => setShow(false)}
                  color="primary"
                  style={{
                    height: "150px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <ChevronLeftIcon
                  onClick={() => setShow(true)}
                  color="primary"
                  style={{
                    height: "150px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                />
              )}
            </Tooltip>
          </Box>
          <Box
            position={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={7}
            // bgcolor={"white"}
            sx={{
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                bgcolor: "gray",
                zIndex: 8,
                opacity: 0.6,
              },
            }}
            display={tmpXfdfFile.open ? "flex" : "none"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              width={"500px"}
              bgcolor={"white"}
              boxShadow={10}
              zIndex={10}
              borderRadius={1}
            >
              <Stack spacing={2} width={"100%"} p={2}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h3" fontWeight={"bold"}>
                    Nhập mô tả cho bản ghi chú
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setTmpXfdfFile({
                        open: false,
                        description: "",
                        xfdfFile: null,
                      });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box px={1}>
                  <InputBase
                    sx={{
                      width: "100%",
                      py: 1,
                      px: 2,
                      border: 1,
                      fontSize: "17px",
                    }}
                    placeholder="Nhập mô tả"
                    value={tmpXfdfFile.description}
                    onChange={(e) =>
                      setTmpXfdfFile((preState) => ({
                        ...preState,
                        description: e.target.value,
                      }))
                    }
                    name="description"
                  />
                </Box>
                <Box display={"flex"} justifyContent={"end"} px={1}>
                  <Button
                    variant="contained"
                    color={"primary"}
                    endIcon={<FileUploadIcon />}
                    disabled={tmpXfdfFile.description.length <= 10}
                    onClick={onSaveAnnotate}
                  >
                    Lưu ghi chú
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        {isSuccess && (
          <Box
            width={isShowDetail || show ? "30%" : 0}
            minWidth={isShowDetail || show ? "400px" : 0}
            opacity={isShowDetail || show ? 1 : 0}
            overflow={"hidden"}
            height={"100%"}
            sx={{ transition: "width 0.4s, opacity 0.4s" }}
          >
            <SubjectDocumentInfo
              subjectDocumentDetail={subjectDocumentDetail}
              language={language}
              setLanguage={handleSelectLanguage}
              resetLanguage={resetLanguage}
              onAddAnnotate={onAddAnnotate}
              onShowAnnotate={onShowAnnotate}
            />
          </Box>
        )}
      </Box>
      <ConfrimSplitModal
        open={openConfirmSplit.open}
        closeModal={() => setOpenConfirmSplit({ open: false })}
        action={onTranslage}
      />
    </BoxFull>
  );
}

export default SubjectDocumentDetail;
