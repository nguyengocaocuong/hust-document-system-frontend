import { Box } from "@mui/material";
import WebViewerPDFTron from "@pdftron/webviewer";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function WebViewer({
  filename,
  url,
  owner,
  viewerInstance,
  setViewerInstance,
}) {
  const { user } = useSelector((state) => state.authentication);
  const viewer = useRef(null);
  useEffect(() => {
    if (viewerInstance == null)
      WebViewerPDFTron(
        {
          path: "/lib",
          isAdminUser: true,
          isReadOnly: true,
          enableAnnotations: false,
          loadAsPDF: true,
        },
        viewer.current
      ).then((instance) => {
        const {
          UI,
          Core: { annotationManager },
        } = instance;
        UI.setLanguage("vi");
        UI.setZoomLevel(1.5);
        annotationManager.setCurrentUser(`${user.firstName} ${user.lastName}`);
        setViewerInstance(instance);
      });

    return () => {};
  }, [user, viewerInstance, setViewerInstance, owner]);
  useEffect(() => {
    if (viewerInstance === null) return;
    const { UI } = viewerInstance;
    if (url instanceof Blob) {
      UI.loadDocument(url, {
        filename,
      });
    } else {
      console.log('white')
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.blob())
        .then((blobData) => {
          UI.loadDocument(blobData, {
            filename,
            customHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [url, filename, user, viewerInstance, owner]);
  return <Box width={"100%"} height={"100%"} ref={viewer}></Box>;
}

export default WebViewer;
