import React from "react";
import BoxFull from "../../../components/BoxFull";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { getRandomDocument } from "../../../data/Documents";

function PostDetailtContent({
  data = {
    description: "Mọi người làm hộ giúp em bài này với ạ",
    content: `<strong>Đề bài:</strong> Nghiên cứu động năng của quả bóng bay lên không trung
            <ul>
              <li><em>Câu hỏi 1:</em> Tại sao một quả bóng bay lên trên không trung?</li>
              <li><em>Câu hỏi 2:</em> Quả bóng bay lên trên không trung có động năng không? Tại sao?</li>
              <li><em>Câu hỏi 3:</em> Làm thế nào để tính động năng của quả bóng bay lên trên không trung?</li>
              <li><em>Câu hỏi 4:</em> Nếu quả bóng bay được thả từ độ cao 10m, hãy tính động năng của quả bóng bay khi nó đạt độ cao 5m?</li>
            </ul>
            `,
    documents: [
      getRandomDocument(),
      getRandomDocument(),
      getRandomDocument(),
      getRandomDocument(),
    ],
  },
}) {

  return (
    <BoxFull maxHeight={"100%"} overflow={"hidden"}>
      {data.content === null ? (
        <div
          style={{ width: "50%", padding: "16px" }}
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      ) : (
        <DocViewer
          style={{ height: "100%" }}
          documents={data.documents.map(doc=> ({uri: doc.link, fileType: doc.type, fileName: doc.name}))}
          pluginRenderers={DocViewerRenderers}
          prefetchMethod="GET"
          theme={{
            primary: "#5296d8",
            secondary: "#ffffff",
            tertiary: "#5296d899",
            textPrimary: "#ffffff",
            textSecondary: "#5296d8",
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

export default PostDetailtContent;
