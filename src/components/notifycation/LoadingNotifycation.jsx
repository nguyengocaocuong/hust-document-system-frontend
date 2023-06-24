import React from "react";
import LoadingSubjectDocumentNotifycation from "./LoadingSubjectDocumentNotifycation";
import LoadingAnswerSubjectDocumentNotifycation from "./LoadingAnswerSubjectDocumentNotifycation";
import LoadingAnswerPost from "./LoadingAnswerPost";
import LoadingPostNotifycation from "./LoadingPostNotifycation";

function LoadingNotifycation({ notifycation }) {
  let Component;
  switch (notifycation.objectType) {
    case "SUBJECT_DOCUMENT":
      Component = LoadingSubjectDocumentNotifycation;
      break;
    case "ANSWER_SUBJECT_DOCUMENT":
      Component = LoadingAnswerSubjectDocumentNotifycation;
      break;
    case "ANSWER_POST":
      Component = LoadingAnswerPost;
      break;
    case "POST":
      Component = LoadingPostNotifycation;
      break;
    default:
      Component = React.Fragment;
  }
  return <Component notifycation={notifycation} />;
}

export default LoadingNotifycation;
