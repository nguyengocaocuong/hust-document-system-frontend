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

export const Documents = [
  {
    id: 1,
    description: "Đề thi giữa kì 1",
    content: `<strong>Đề bài:</strong> Nghiên cứu động năng của quả bóng bay lên không trung
      <ul>
        <li><em>Câu hỏi 1:</em> Tại sao một quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 2:</em> Quả bóng bay lên trên không trung có động năng không? Tại sao?</li>
        <li><em>Câu hỏi 3:</em> Làm thế nào để tính động năng của quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 4:</em> Nếu quả bóng bay được thả từ độ cao 10m, hãy tính động năng của quả bóng bay khi nó đạt độ cao 5m?</li>
      </ul>`,
    path: "pdf",
    name: "test.pdf",
    createAt: "24/10/2000",
    thumbnail:
      "https://nld.mediacdn.vn/2019/6/25/653191531967161712717002816168446344036352n-15614539760131493581366-156145410632187592879.png",
    type: "FILE",
  },
  {
    id: 1,
    description:
      "Đề thi giữa cuối kỳ , đề năm nay khá dễ, chỉ cần ôn trong sách là đã được tầm 8-9",
    content: `<strong>Đề bài:</strong> Nghiên cứu động năng của quả bóng bay lên không trung
      <ul>
        <li><em>Câu hỏi 1:</em> Tại sao một quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 2:</em> Quả bóng bay lên trên không trung có động năng không? Tại sao?</li>
        <li><em>Câu hỏi 3:</em> Làm thế nào để tính động năng của quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 4:</em> Nếu quả bóng bay được thả từ độ cao 10m, hãy tính động năng của quả bóng bay khi nó đạt độ cao 5m?</li>
      </ul>`,
    path: "docx",
    name: "ck.docx",
    createAt: "24/10/2000",
    thumbnail:
      "https://nld.mediacdn.vn/2019/6/25/653191531967161712717002816168446344036352n-15614539760131493581366-156145410632187592879.png",
    type: "FILE",
  },
  {
    id: 1,
    description:
      "Đề thi giữa cuối kỳ , đề năm nay khá dễ, chỉ cần ôn trong sách là đã được tầm 8-9",
    content: `<strong>Đề bài:</strong> Nghiên cứu động năng của quả bóng bay lên không trung
      <ul>
        <li><em>Câu hỏi 1:</em> Tại sao một quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 2:</em> Quả bóng bay lên trên không trung có động năng không? Tại sao?</li>
        <li><em>Câu hỏi 3:</em> Làm thế nào để tính động năng của quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 4:</em> Nếu quả bóng bay được thả từ độ cao 10m, hãy tính động năng của quả bóng bay khi nó đạt độ cao 5m?</li>
      </ul>`,
    path: "docx",
    name: "ck.docx",
    createAt: "24/10/2000",
    thumbnail:
      "https://nld.mediacdn.vn/2019/6/25/653191531967161712717002816168446344036352n-15614539760131493581366-156145410632187592879.png",
    type: "FILE",
  },
  {
    id: 1,
    description:
      "Đề thi giữa cuối kỳ , đề năm nay khá dễ, chỉ cần ôn trong sách là đã được tầm 8-9",
    content: `<strong>Đề bài:</strong> Nghiên cứu động năng của quả bóng bay lên không trung
      <ul>
        <li><em>Câu hỏi 1:</em> Tại sao một quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 2:</em> Quả bóng bay lên trên không trung có động năng không? Tại sao?</li>
        <li><em>Câu hỏi 3:</em> Làm thế nào để tính động năng của quả bóng bay lên trên không trung?</li>
        <li><em>Câu hỏi 4:</em> Nếu quả bóng bay được thả từ độ cao 10m, hãy tính động năng của quả bóng bay khi nó đạt độ cao 5m?</li>
      </ul>`,
    path: "docx",
    name: "ck.docx",
    createAt: "24/10/2000",
    thumbnail:
      "https://nld.mediacdn.vn/2019/6/25/653191531967161712717002816168446344036352n-15614539760131493581366-156145410632187592879.png",
    type: "FILE",
  },
  {
    id: 1,
    description: "Đề thi giữa cuối kỳ 1",
    content: null,
    path: "xlsx",
    name: "ck.xlsx",
    createAt: "24/10/2000",
    thumbnail:
      "https://nld.mediacdn.vn/2019/6/25/653191531967161712717002816168446344036352n-15614539760131493581366-156145410632187592879.png",
    type: "FILE",
  },
];
