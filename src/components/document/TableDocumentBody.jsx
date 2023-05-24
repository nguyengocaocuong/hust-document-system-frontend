import React from "react";
import avatar1 from "../../../assets/images/avatar/05.jpg";
import avatar3 from "../../../assets/images/avatar/06.jpg";
import avatar4 from "../../../assets/images/avatar/07.jpg";
import avatar2 from "../../../assets/images/avatar/1.jpg";
import TableItem from "./TableItem";
import { Box } from "@mui/material";
const avatars = [avatar1, avatar2, avatar3, avatar4];
const names = [
  "Nguyễn Ngô Cao Cường",
  "Nguyễn Đình Cảnh",
  "Hà Huy Cường",
  "Chu Thị Hiền",
  "Đặng Văn Mạnh",
  "Lê Văn Lương",
];
const documentType = ["SLIDE", "EXAM", "ANSWER", "EBOOK"];
const fileType = [".pdf", ".docx", ".xlsx", ".ppt", ".csv"];
const dataTest = [
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
    {
        name: fileType[Math.round((Math.random() * 10)) % fileType.length],
        description:
          "Đề thi giữa học kì 1, đề này không khó đâu mọi người ạ, đọc qua sách giáo khoa là được á",
        sharedAt: "01/23/2012",
        documentType:
          documentType[Math.round((Math.random() * 10)) % documentType.length],
        owner: {
          avatar: avatars[Math.round((Math.random() * 10)) % avatars.length],
          name: names[Math.round((Math.random() * 10)) % names.length],
        },
      },
]
function TableContent({ data = dataTest }) {
  return (
    <Box width={'100%'}  overflow={'auto'}>
      {data.map((doc, index) => (
        <TableItem data={doc} key={index} />
      ))}
    </Box>
  );
}

export default TableContent;
