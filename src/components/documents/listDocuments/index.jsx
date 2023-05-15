import { Box } from "@mui/system";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DocumentCard from "../documentsCard";
import { Typography } from "@mui/material";

const documents = [
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
function ListDocuments({title}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <Box width={"100%"} maxWidth={"100%"} pt={0} p={2} height={'270px'}>
      <Typography style={{fontWeight:600}} mb={-1}>{title}</Typography>
      <Slider {...settings} prevArrow={<></>} nextArrow={<></>}>
        {documents.map((document, index) => (
          <DocumentCard document={document} key={index} />
        ))}
      </Slider>
    </Box>
  );
}

export default ListDocuments;
