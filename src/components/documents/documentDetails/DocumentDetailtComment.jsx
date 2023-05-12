import { Box } from "@mui/material";
import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
const commentData = [
  {
    userId: "02b",
    comId: "017",
    fullName: "Lily",
    userProfile: "http://localhost:3000/",
    text: "I think you have a point🤔",
    avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
    replies: [],
  },
  {
    userId: "02b",
    comId: "018",
    fullName: "Nguyễn Ngô Cao Cường",
    userProfile: "http://localhost:3000/",
    text: "I think you have a point🤔",
    avatarUrl: "https://ui-avatars.com/api/name=Cuong&background=random",
    replies: [],
  },
];
function DocumentDetailtComment() {
  const [data, setData] = useState(commentData);
  return (
    <Box width={"100%"}>
      <CommentSection
        currentUser={{
          currentUserId: "01a",
          currentUserImg:
            "https://ui-avatars.com/api/name=Riya&background=random",
          currentUserProfile:
            "https://www.linkedin.com/in/riya-negi-8879631a9/",
          currentUserFullName: "Riya Negi",
        }}
        commentData={data}
        onSubmitAction={(comment) => setData([...data, comment])}
        currentData={(data) => {
          console.log("curent data", data);
        }}
        hrStyle={{ display: "none" }}
        titleStyle={{ display: "none" }}
        commentsCount={2}
        inputStyle={{ borderBottom: "1px solid rgb(208 208 208)" }}
        formStyle={{borderRadius:'25px', padding:'5px 10px',}}
        submitBtnStyle={{ borderRadius:'25px', fontSize:'14px'}}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          fontSize:'10px'
        }}
        //   removeEmoji={true}
          // overlayStyle={{ backgroundColor: "#0f0d29", color: "white" }}
        // replyInputStyle={{ borderBottom: "1px solid black", color: "black", backgroundColor:'transparent' }}
      />
    </Box>
  );
}

export default DocumentDetailtComment;
