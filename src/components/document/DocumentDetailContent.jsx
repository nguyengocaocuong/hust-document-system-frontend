import React from "react";
import BoxFull from "../../../components/BoxFull";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useSelector } from "react-redux";

function DocumentDetailtContent({ document = {} }) {
  const { user } = useSelector((state) => state.authentication);
  const docs = [
    {
      uri: `${
        process.env.REACT_APP_BASE_URL
      }/api/v1/users/subjects/subjectDocuments/readFile/${document.document.id}`,
      fileName: document.document.name,
      fileType: document.document.contentType,
    },
  ];
  const headers = { Authorization: `Bearer ${user.token}` };
  return (
    <BoxFull maxHeight={"100%"} overflow={"hidden"}>
      {document.content === null ? (
        <div
          style={{ width: "50%", padding: "16px" }}
          dangerouslySetInnerHTML={{ __html: document.content }}
        ></div>
      ) : (
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
            csvDelimiter: ",", // "," as default,
            pdfZoom: {
              defaultZoom: 1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
            pdfVerticalScrollByDefault: false,
          }}
        />
      )}
    </BoxFull>
  );
}

export default DocumentDetailtContent;
