import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function Annotation() {
  const viewer = useRef(null);
  const [isViewerReady, setViewerReady] = useState(false);
  const [instance, setInstance] = useState(null);
  const { user } = useSelector((state) => state.authentication);
  useEffect(() => {
    if (isViewerReady && instance == null) {
      WebViewer(
        {
          path: "/lib",
          enableAnnotations: true,
          disableMultiViewerComparison: true,
          initialDoc: "Free_Test_Data_500KB_PPTX.pptx.pdf",
        },
        viewer.current
      ).then((instance) => {
        const {
          Core: { annotationManager, Tools },
          UI,
        } = instance;
        UI.setLanguage(UI.Languages.VI);
        annotationManager.setCurrentUser(`${user.firstName} ${user.lastName}`);
        instance.UI.disableElements([
          "toolbarGroup-Forms",
          "toolbarGroup-EditText",
          "toolbarGroup-FillAndSign",
          "toolbarGroup-Edit",
        ]);
        UI.setHeaderItems((header) => {
          console.log(header)
          header.getHeader("toolbarGroup-Insert").delete(1);
          header.getHeader("toolbarGroup-Insert").delete(1);
          header.getHeader("toolbarGroup-Insert").delete(5);
          header.getHeader("toolbarGroup-Insert").delete(6);
        });
        setInstance(instance);
      });
    }
  }, [isViewerReady]);
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      ref={(el) => {
        viewer.current = el;
        setViewerReady(true);
      }}
    ></Box>
  );
}

export default Annotation;
