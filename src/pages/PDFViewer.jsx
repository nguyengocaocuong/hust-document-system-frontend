import { Viewer, Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";


const PDFViewer = () => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl="http://localhost:8080/api/v1/users/subjects/subjectDocuments/53/readFile?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdW9uZy5ubmMxODQwNTVAc2lzLmh1c3QuZWR1LnZuIiwiZXhwIjoxNjg1MTU5ODYyLCJpYXQiOjE2ODUwNzM0NjIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dfQ.eTujsuh3GXVcvriGkKiqHwrgA1atnvyabVOyUd4O6Cw" />
    </Worker>
  );
};
export default PDFViewer;
