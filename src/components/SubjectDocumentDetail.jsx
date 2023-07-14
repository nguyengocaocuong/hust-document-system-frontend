import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSubjectDocumentDetailQuery } from "../services/SubjectService";
import { Box } from "@mui/material";

import BoxFull from "./BoxFull";
import SubjectDocumentInfo from "./SubjectDocumentInfo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import ConfrimSplitModal from "./modal/ConfrimSplitModal";
function SubjectDocumentDetail() {
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
  const [language, setLanguage] = useState("ROOT");

  const handleSelectLanguage = async (value) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"]; // Các phần mở rộng tệp tin hình ảnh hợp lệ
    const pageCount = viewerInstance.Core.documentViewer.getPageCount();

    const fileExtension = subjectDocumentDetail.document.name
      ?.split(".")
      .pop()
      .toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      setLanguage(value);
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
        return value;
      });
    }
  };

  const resetLanguage = () => {
    setUri(() => {
      setLanguage("ROOT");
      return `${process.env.REACT_APP_BASE_URL}/api/v1/users/subjects/subjectDocument/${id}/readFile?token=${token}`;
    });
  };

  const onTranslage = async (translate, page) => {
    if (translate) {
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
          viewerInstance.UI.loadDocument(blobData, {
            filename: subjectDocumentDetail.document.name,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setLanguage(openConfirmSplit.language);
      setOpenConfirmSplit({ open: false });
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
        },
        viewer.current
      ).then((instance) => {
        const { UI } = instance;
        UI.setFitMode(instance.UI.FitMode.FitWidth);
        UI.setHeaderItems((headers) => {
          console.log(headers.headers.default[5])
          headers.push({
            type: "actionButton",
            html: `<div
            style="width: 50px; height: 50px; background-color: aqua; border-radius: 50%"
          ></div>
          `,
            onClick: () => {
              navigate("/annotation");
            },
          });
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
          viewerInstance.UI.loadDocument(blobData, {
            filename: subjectDocumentDetail.document.name,
            customHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        })
        .catch(() => {});
  }, [uri, subjectDocumentDetail, user, viewerInstance]);
  return (
    isSuccess && (
      <BoxFull sx={{ backgroundColor: "white" }}>
        <Box display={"flex"} height={"100%"}>
          <Box
            width={`70%`}
            borderRight="1px solid #D8D9D9"
            borderBottom="1px solid #D8D9D9"
            ref={viewer}
          ></Box>
          <SubjectDocumentInfo
            subjectDocumentDetail={subjectDocumentDetail}
            language={language}
            setLanguage={handleSelectLanguage}
            resetLanguage={resetLanguage}
          />
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
