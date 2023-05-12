const data = {
  image: {
    link: "https://sample-videos.com/img/Sample-jpg-image-50kb.jpg",
    name: "image.jpg",
    type: "image",
  },
  pdf: {
    link: "https://sample-videos.com/pdf/Sample-pdf-5mb.pdf",
    name: "document_pdf.pdf",
    type: "pdf",
  },
  xls: {
    link: "https://sample-videos.com/xls/Sample-Spreadsheet-1000-rows.xls",
    name: "document_xls.xls",
    type: "xls",
  },
  csv: {
    link: "https://sample-videos.com/csv/Sample-Spreadsheet-1000-rows.csv",
    name: "document_csv.csv",
    type: "csv",
  },
  doc: {
    link: "https://sample-videos.com/doc/Sample-doc-file-1000kb.doc",
    name: "document_doc.doc",
    type: "doc",
  },
  docx: {
    link: "https://sample-videos.com/doc/Sample-doc-file-1000kb.docx",
    name: "document_docx.docx",
    type: "docx",
  },
  ppt: {
    link: "https://sample-videos.com/doc/Sample-doc-file-1000kb.ppt",
    name: "document_ppt.ppt",
    type: "ppt",
  },
  txt: {
    link: "https://sample-videos.com/text/Sample-text-file-1000kb.txt",
    name: "document_txt.txt",
    type: "txt",
  },
};
const type = ["pdf", "image", "csv", "xls", "ppt", "txt", "docx", "doc"];
export const getDocumentByType = (type) => data[type];
export const getRandomDocument = () =>
  data[type[Math.round(Math.random() * 10) % 8]];
