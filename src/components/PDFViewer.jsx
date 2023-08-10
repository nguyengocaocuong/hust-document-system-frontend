
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import BoxFull from "./BoxFull";
import { useSelector } from "react-redux";
const PDFViewer = ({
  url
}) => {
  const [pdfData, setPdfData] = useState(null);
  const { user } = useSelector((state) => state.authentication);
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'HUST-DOCUMENT-KEY': user.token,
        },
      });
      const data = await response.blob();
      setPdfData(URL.createObjectURL(data));
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return (
    <BoxFull>
      {pdfData ? (
        <object
          data={pdfData}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{backgroundColor:'white'}}
        >
          <p>Không thể hiển thị file PDF</p>
        </object>
      ) : (
        <p>Đang tải nội dung file PDF...</p>
      )}
    </BoxFull>
  );
};
export default PDFViewer;
