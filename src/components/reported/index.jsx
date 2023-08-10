import React from "react";
import ReportContentReviewSubject from "./ReportContentReviewSubject";
import ReportContentReviewTeacher from "./ReportContentReviewTeacher";
import ReportContentSubjectDocument from "./ReportContentSubjectDocument";
import ReportDuplicateSubjectDocument from "./ReportDuplicateSubjectDocument";

function ReportCard({ report: { type, ...data } }) {
  let Component;
  switch (type) {
    case "REVIEW_SUBJECT":
      Component = ReportContentReviewSubject;
      break;
    case "REVIEW_TEACHER":
      Component = ReportContentReviewTeacher;
      break;
    case "CONTENT_SUBJECT_DOCUMENT":
      Component = ReportContentSubjectDocument;
      break;
    case "DUPLICATE_SUBJECT_DOCUMENT":
      Component = ReportDuplicateSubjectDocument;
      break;
    default:
      Component = React.Fragment;
  }
  return <Component report={data} />;
}

export default ReportCard;
