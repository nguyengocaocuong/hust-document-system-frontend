import React from "react";
import RecommendSubjectDocumentCard from "./RecommendSubjectDocumentCard";

function RecommendCard({ recommend, closeRecommend }) {
  return <RecommendSubjectDocumentCard recommend={recommend} closeRecommend={closeRecommend}/>;
}

export default RecommendCard;
