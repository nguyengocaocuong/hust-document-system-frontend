import React from "react";
import BoxFull from "../../../containers/BoxFull";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function DocumentDetailtContent({
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
      {
        description: "",
        name: "",
        path: "https://scontent.fhan9-1.fna.fbcdn.net/v/t1.6435-9/131064365_1820503494774093_2354004607082473069_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a83260&_nc_ohc=bt1UapK817wAX8XJ5ds&_nc_ht=scontent.fhan9-1.fna&oh=00_AfAUZ51kVYcj3RW-pzULoBEx2hq-bWC_Ej7YVyuSOw6MXg&oe=6482ACDE",
        contentType: "image/png",
      },
      {
        description: "",
        name: "",
        path: "https://scontent.fhan9-1.fna.fbcdn.net/v/t1.6435-9/138610227_1843127405845035_1658456136754674068_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a83260&_nc_ohc=cOyBOkpZhKYAX_8IRN3&_nc_ht=scontent.fhan9-1.fna&oh=00_AfDt9dpstNTA-_aMmkcDciMppO8i0x_ymn7cZxyv-Mqueg&oe=6482B93E",
        contentType: "image/png",
      },
      {
        description: "",
        name: "",
        path: "https://scontent.fhan9-1.fna.fbcdn.net/v/t1.6435-9/131064365_1820503494774093_2354004607082473069_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a83260&_nc_ohc=bt1UapK817wAX8XJ5ds&_nc_ht=scontent.fhan9-1.fna&oh=00_AfAUZ51kVYcj3RW-pzULoBEx2hq-bWC_Ej7YVyuSOw6MXg&oe=6482ACDE",
        contentType: "image/png",
      },
      {
        description: "",
        name: "",
        path: "https://scontent.fhan9-1.fna.fbcdn.net/v/t1.6435-9/131064365_1820503494774093_2354004607082473069_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a83260&_nc_ohc=bt1UapK817wAX8XJ5ds&_nc_ht=scontent.fhan9-1.fna&oh=00_AfAUZ51kVYcj3RW-pzULoBEx2hq-bWC_Ej7YVyuSOw6MXg&oe=6482ACDE",
        contentType: "image/png",
      },
    ],
  },
}) {
  const docs = [
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/docx`,
      fileType: "docx",
      fileName: "docxtest.docx",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/xls`,
      fileType: "xls",
      fileName: "doxtest.xls",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/pdf`,
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/txt`,
      fileType: "txt",
      fileName: "docxtest.txt",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/xlsx`,
      fileType: "xlsx",
      fileName: "docxtest.xlsx",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/doc`,
      fileType: "doc",
      fileName: "docxtest.doc",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/html`,
      fileType: "html",
      fileName: "docxtest.html",
    },
    {
      uri: `${process.env.REACT_APP_BASE_URL}/api/v1/public/odt`,
      fileType: "odt",
      fileName: "docxtest.odt",
    },
  ];
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
          documents={docs}
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

export default DocumentDetailtContent;
