import slideImg from "../assets/images/document/slide.png";
import ebookImg from "../assets/images/document/ebook.png";
import projectImg from "../assets/images/document/project.png";
import examImg from "../assets/images/document/exam.png";
import quizImg from "../assets/images/document/idea.png";
import handoutImg from "../assets/images/document/idea.png";
import homeworkImg from "../assets/images/document/homework.png";
import finalExamImg from "../assets/images/document/final_exam.png";
import textbookImg from "../assets/images/document/textBook.png";
import syllabusImg from "../assets/images/document/syllabus.png";
import paperImg from "../assets/images/document/paper.png";
import midtermExamImg from "../assets/images/document/midtermExam.png";
export const documentType  = {
    SLIDE: {
      title: "Slide môn học",
      subTitle: "Slide",
      img: slideImg,
      color: "#FF9F00",
    },
    EXAM: {
      title: "Bài kiểm tra",
      subTitle: "EXAM",
      img: examImg,
      color: "#ABCDEF",
    },
    QUIZ: {
      title: "Kiểm tra nhanh",
      subTitle: "QUIZ",
      img: quizImg,
      color: "#7974E3",
    },
    MIDTERM_EXAM: {
      title: "Kiểm tra giữa kỳ",
      subTitle: "Midterm Exam",
      img: midtermExamImg,
      color: "#789ABC",
    },
    FINAL_EXAM: {
      title: "Kiểm tra cuối kỳ",
      subTitle: "Final Exam",
      img: finalExamImg,
      color: "#EAB044",
    },
    PROJECT: {
      title: "Đề tài bài tập lớn",
      subTitle: "Project",
      img: projectImg,
      color: "#8F9FF5",
    },
    HOMEWORK: {
      title: "Bài tập về nhà",
      subTitle: "Homework",
      img: homeworkImg,
      color: "#CDEF12",
    },
    TEXTBOOK: {
      title: "Sách giáo trình",
      subTitle: "Text Book",
      img: textbookImg,
      color: "#DB4737",
    },
    REFERENCE_BOOK: {
      title: "Tài liệu tham khảo",
      subTitle: "Ebook",
      img: ebookImg,
      color: "#F55A8E",
    },
    SYLLABUS: {
      title: "Chương trình học",
      subTitle: "Syllabus",
      img: syllabusImg,
      color: "#233D91",
    },
    PAPER: {
      title: "Bài báo",
      subTitle: "Paper",
      img: paperImg,
      color: "#321ABC",
    },
    HANDOUT: {
      title: "Tài liệu phát",
      subTitle: "Handout",
      img: handoutImg,
      color: "#FF0000",
    },
  };