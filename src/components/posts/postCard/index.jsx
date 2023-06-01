import { Card } from "@mui/material";
import React from "react";
import CardHeader from "./PostCardHeader";
import CardContent from "./PostCardContent";
import CardActions from "./PostCardActions";
import { useNavigate } from "react-router-dom";

function PostCard({ data }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "100%" }} onClick={()=> navigate(`/post/${data.id}`)}>
      <CardHeader owner={data?.owner} subject={data?.subject} />
      <CardContent data={data} />
      <CardActions
        totalFavorite={data?.totalFavorite}
        totalComment={data?.totalComment}
        totalAnswer={data?.totalAnswer}
      />
    </Card>
  );
}

export default PostCard;
