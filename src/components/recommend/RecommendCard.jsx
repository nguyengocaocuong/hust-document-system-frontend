import React from "react";
import RecommendSubjectDocumentCard from "./RecommendSubjectDocumentCard";
import RecommendAnswerSubjectDocument from "./RecommendAnswerSubjectDocument";

function RecommendCard({ recommend, closeRecommend }) {
  let Component;
  switch (recommend.typeRecommend) {
    case "SUBJECT_DOCUMENT":
      Component = RecommendSubjectDocumentCard;
      break;
    case "ANSWER_SUBJECT_DOCUMENT":
      Component = RecommendAnswerSubjectDocument;
      break;
    default:
      Component = React.Fragment;
  }
  return <Component recommend={recommend} closeRecommend={closeRecommend}/>;
}

export default RecommendCard;
