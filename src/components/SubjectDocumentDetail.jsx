import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSubjectDocumentDetailQuery } from "../services/SubjectService";
import { Box, Fab, IconButton, Tooltip } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BoxFull from "./BoxFull";
import SubjectDocumentInfo from "./SubjectDocumentInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import ConfrimSplitModal from "./modal/ConfrimSplitModal";
import editIcon from "../assets/images/icon/edit.svg";
import { useProSidebar } from "react-pro-sidebar";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function SubjectDocumentDetail() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [openConfirmSplit, setOpenConfirmSplit] = useState({ open: false });
  const viewer = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);
  const [viewerInstance, setViewerInstance] = useState(null);
  const location = useLocation();
  const token = location.search?.length > 7 ? location.search.substring(7) : "";
  const { id } = useParams();
  const { data: subjectDocumentDetail = {}, isSuccess } =
    useGetSubjectDocumentDetailQuery(id);
  const [uri, setUri] = useState(
    `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/readFile?token=${token}`
  );
  const [language, setLanguage] = useState({
    value: "ROOT",
    loading: true,
  });
  const [rootBlob, setRootBlob] = useState(null);
  const handleSelectLanguage = async (value) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"]; // Các phần mở rộng tệp tin hình ảnh hợp lệ
    const pageCount = viewerInstance.Core.documentViewer.getPageCount();

    const fileExtension = subjectDocumentDetail.document.name
      ?.split(".")
      .pop()
      .toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      setLanguage({ value, loading: true });
      const doc = viewerInstance.Core.documentViewer.getDocument();
      const xfdfString =
        await viewerInstance.Core.annotationManager.exportAnnotations();
      const docBuffer = await doc.getFileData({ xfdfString });
      const blob = new Blob([docBuffer], { type: "application/pdf" });
      const file = new File([blob], "filename.pdf", { type: blob.type });
      const body = new FormData();
      body.append("file", file);
      fetch(
        `http://localhost:8080/api/v1/users/subjects/subjectDocument/2/translate-file?targetLanguage=${value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: body,
        }
      )
        .then((response) => response.blob())
        .then((blobData) => {
          viewerInstance.UI.loadDocument(blobData, {
            filename: "filename.pdf",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return;
    } else if (pageCount >= 15) {
      setOpenConfirmSplit({ open: true, language: value });
    } else {
      setLanguage(() => {
        setUri(
          () =>
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/translate?targetLanguage=${value}&token=${token}`
        );
        return { value, loading: true };
      });
    }
  };

  const resetLanguage = () => {
    viewerInstance.UI.loadDocument(rootBlob, {
      filename: subjectDocumentDetail.document.name,
    });
  };

  const onTranslage = async (translate, page) => {
    if (translate) {
      setOpenConfirmSplit({ open: false });
      setLanguage({ value: openConfirmSplit.language, loading: true });
      const doc = viewerInstance.Core.documentViewer.getDocument();
      const data = await doc.extractPages(page);
      const arr = new Uint8Array(data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const file = new File([blob], "filename.pdf", { type: blob.type });
      const body = new FormData();
      body.append("file", file);
      fetch(
        `http://localhost:8080/api/v1/users/subjects/subjectDocument/2/translate-file?targetLanguage=${openConfirmSplit.language}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: body,
        }
      )
        .then((response) => response.blob())
        .then((blobData) => {
          viewerInstance.UI.addEventListener(
            viewerInstance.UI.Events.TAB_MANAGER_READY,
            async () => {
              await viewerInstance.UI.TabManager.addTab(blobData, {
                setActive: true,
              });
            }
          );
          viewerInstance.UI.enableFeatures(["MultiTab"]);
          // viewerInstance.UI.loadDocument(blobData, {
          //   filename: subjectDocumentDetail.document.name,
          // });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return;
    }
  };

  useEffect(() => {
    if (isSuccess)
      WebViewer(
        {
          path: "/lib",
          isAdminUser: true,
          isReadOnly: true,
          enableAnnotations: false,
          loadAsPDF: true,
          fullAPI: true,
          licenseKey:
            "demo:1687424583865:7d9865fa030000000050a5812850e2d2c4914807b2282b5e7b5bb1cb9f",
        },
        viewer.current
      ).then((instance) => {
        const { UI } = instance;
        UI.setHeaderItems((headers) => {
          headers.push({
            type: "actionButton",
            img: editIcon,
            onClick: () => {
              setShowDetail(false)
              navigate("/annotation");
            },
          });
        });
        UI.addEventListener(UI.Events.DOCUMENT_LOADED, () => {
          UI.setFitMode(UI.FitMode.FitWidth);
          setLanguage((preState) => ({ ...preState, loading: false }));
        });
        setViewerInstance(instance);
      });
  }, [isSuccess]);
  useEffect(() => {
    if (viewerInstance !== null)
      fetch(uri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.blob())
        .then((blobData) => {
          setRootBlob(URL.createObjectURL(blobData));
          viewerInstance.UI.loadDocument(blobData, {
            filename: subjectDocumentDetail.document.name,
          });
        })
        .catch(() => {});
    return () => {
      if (rootBlob !== null) URL.revokeObjectURL(rootBlob);
    };
  }, [uri, subjectDocumentDetail, user, viewerInstance]);
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
  }, []);
  const [isShowDetail, setShowDetail] = useState(true);
  const [show, setShow] = useState(false);
  return (
    isSuccess && (
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
          </Box>
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
            />
          </Box>
        </Box>
        <ConfrimSplitModal
          open={openConfirmSplit.open}
          closeModal={() => setOpenConfirmSplit({ open: false })}
          action={onTranslage}
        />
      </BoxFull>
    )
  );
}

export default SubjectDocumentDetail;
