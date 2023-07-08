import { Box } from "@mui/material";
import WebViewerPDFTron from "@pdftron/webviewer";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Pusher from "pusher-js";
import { useSendAnnotationSubjectDocumentMutation } from "../services/SubjectService";

function WebViewer({ filename, url, owner, channelName = "annotation-11" }) {
  const { user } = useSelector((state) => state.authentication);
  const viewer = useRef(null);
  const [viewerInstance, setViewerInstance] = useState(null);
  const [sendAnnotationSubjectDocument] =
    useSendAnnotationSubjectDocumentMutation();
  useEffect(() => {
    if (viewerInstance == null)
      WebViewerPDFTron(
        {
          path: "/lib",
          isAdminUser: true,
          isReadOnly: owner.id !== user.id,
          enableAnnotations: true,
        },
        viewer.current
      ).then((instance) => {
        const {
          UI,
          Core: { annotationManager },
        } = instance;

        UI.setLanguage("vi");
        annotationManager.setPermissionCheckCallback(() => {
          return owner.id === user.id;
        });
        annotationManager.setCurrentUser(`${user.firstName} ${user.lastName}`);

        annotationManager.addEventListener(
          "annotationChanged",
          (annotations, action) => {
            const exportAnnot = [];
            for (let i = 0; i < annotations.length; i++) {
              if (annotations[i].Author === annotationManager.getCurrentUser())
                exportAnnot.push(annotations[i]);
            }
            if (exportAnnot.length === 0) return;
            annotationManager
              .exportAnnotations({ annotationList: exportAnnot })
              .then((xfdfString) => {
                sendAnnotationSubjectDocument({
                  subjectDocumentId: 11,
                  body: xfdfString,
                  action,
                });
              });
          }
        );
        setViewerInstance(instance);
      });
    const pusherService = new Pusher("070ff19e8a1a4c8d4553", {
      cluster: "ap1",
    });
    const channel = pusherService.subscribe(channelName);
    channel.bind("add", (newAnnot) => {
      if (viewerInstance === null) return;
      const dom = new DOMParser();
      const xml = dom.parseFromString(newAnnot, "text/xml");
      const annotId = xml
        .getElementsByTagName("annots")[0]
        .childNodes[0].getAttribute("name");
      const allAnnot =
        viewerInstance.Core.annotationManager.getAnnotationsList();
      for (let i = 0; i < allAnnot.length; i++)
        if (allAnnot[i].Id === annotId) {
          return;
        }
      viewerInstance.Core.annotationManager.importAnnotations(newAnnot);
    });
    channel.bind("modify", (modifyAnnot) => {
      if (viewerInstance === null) return;
      const dom = new DOMParser();
      const xml = dom.parseFromString(modifyAnnot, "text/xml");
      const annotId = xml
        .getElementsByTagName("annots")[0]
        .childNodes[0].getAttribute("name");
      //   const annot =
      //     viewerInstance.Core.annotationManager.getAnnotationById(annotId);
      //   viewerInstance.Core.annotationManager.deleteAnnotation(annot);
      viewerInstance.Core.annotationManager.setPermissionCheckCallback(() => {
        return true;
      });
      viewerInstance.Core.annotationManager.disableReadOnlyMode();
      const allAnnot =
        viewerInstance.Core.annotationManager.getAnnotationsList();
      viewerInstance.Core.annotationManager.deleteAnnotations(allAnnot);
      viewerInstance.Core.annotationManager.setPermissionCheckCallback(() => {
        return owner.id === user.id;
      });
      if (owner.id !== user.id)
        viewerInstance.Core.annotationManager.enableReadOnlyMode();
    });

    return () => {
      channel.unbind();
      pusherService.unsubscribe(channelName);
      pusherService.disconnect();
    };
  }, [user, viewerInstance, owner]);
  useEffect(() => {
    if (viewerInstance === null) return;
    const { UI } = viewerInstance;
    UI.loadDocument(url, {
      filename,
      customHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }, [url, filename, user, viewerInstance, owner]);
  return <Box width={"100%"} height={"100%"} ref={viewer}></Box>;
}

export default WebViewer;
