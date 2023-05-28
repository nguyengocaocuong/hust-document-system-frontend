import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useSelector } from "react-redux";
import BoxFull from "../BoxFull";

function DocumentViewer({ docs = [] }) {
  const { user } = useSelector((state) => state.authentication);
  const headers = { Authorization: `Bearer ${user.token}` };
  return (
    <BoxFull maxHeight={"100%"} overflow={"hidden"}>
      <DocViewer
        style={{ height: "100%" }}
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        requestHeaders={headers}
        prefetchMethod="GET"
        theme={{
          primary: "#FA0B0B",
          secondary: "#ffffff",
          tertiary: "#EF9E9E",
          textPrimary: "#ffffff",
          textSecondary: "#FA0B0B",
          textTertiary: "#00000099",
        }}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
          csvDelimiter: ",",
          pdfZoom: {
            defaultZoom: 1,
            zoomJump: 0.2,
          },
          pdfVerticalScrollByDefault: false,
        }}
      />
    </BoxFull>
  );
}

export default DocumentViewer;
