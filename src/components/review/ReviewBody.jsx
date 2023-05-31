import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import ReviewTeacherCard from "./ReviewTeacherCard";
import ReviewModal from "../modal/ReviewModal";
const tempContent = `
<div>
  <h2>Đánh giá Giảng viên - Đỗ Quốc Huy</h2>
  <h3>Cách giảng dạy:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy có phong cách giảng dạy rất truyền cảm hứng và sáng tạo. Anh ấy sử dụng nhiều ví dụ thực tế và minh họa đồ họa để giải thích các khái niệm khó khăn. Bài giảng của anh ấy luôn thú vị và không nhàm chán, giúp học viên tăng cường hiểu biết và áp dụng kiến thức một cách hiệu quả.
  </p>

  <h3>Tính cách:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy rất thân thiện, luôn tạo một môi trường học tập thoải mái và ấm cúng. Anh ấy rất nhiệt tình và luôn sẵn lòng trợ giúp học viên khi có thắc mắc. Sự tận tâm và chu đáo của anh ấy thực sự tạo nên một trải nghiệm học tập tuyệt vời.
  </p>

  <h3>Cách chấm điểm:</h3>
  <p>
    Giảng viên Đỗ Quốc Huy chấm điểm công bằng và minh bạch. Anh ấy cung cấp các tiêu chí rõ ràng để đánh giá bài tập và luôn cung cấp phản hồi chi tiết và xây dựng để học viên có thể cải thiện. Qua đó, anh ấy tạo động lực cho học viên nỗ lực hơn trong quá trình học tập.
  </p>
</div>

`;
function ReviewBody({ reviews = []}) {
  const [modalData, setModalData] = useState({ open: false, data: null });
  const openModal = (data) => setModalData({ open: true, data });
  const closeModal = () => setModalData({ open: false, data: null });
  return (
    <Box pt={2} width={"100%"}>
      <Grid container spacing={2}>
        {reviews?.map((review, index) => (
          <Grid item xl={3} key={index}>
            <ReviewTeacherCard openModal={openModal} review={review}/>
          </Grid>
        ))}
      </Grid>
      <ReviewModal modalData={modalData} closeModal={closeModal} />
    </Box>
  );
}

export default ReviewBody;
