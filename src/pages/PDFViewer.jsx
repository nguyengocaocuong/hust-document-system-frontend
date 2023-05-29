import { Viewer, Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import BoxFull from "../components/BoxFull";
import { useSelector } from "react-redux";
const PDFViewer = ({
  url = "http://localhost:8080/api/v1/users/subjects/subjectDocuments/2/readFile",
}) => {
  const [pdfData, setPdfData] = useState(null);
  const { user } = useSelector((state) => state.authentication);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.blob();
        setPdfData(URL.createObjectURL(data));
        console.log(URL.createObjectURL(data));
      } catch (error) {
        console.error("Error fetching PDF data:", error);
      }
    };
    fetchData();
  }, []);
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
