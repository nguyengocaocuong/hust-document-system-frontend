import { Card } from "@mui/material";
import React from "react";
import CardHeader from "./PostCardHeader";
import CardContent from "./PostCardContent";
import CardActions from "./PostCardActions";

function PostCard({ data }) {
  return (
      <Card sx={{ width: "100%"}}>
        <CardHeader data={data} />
        <CardContent data={data} />
        <CardActions data={data}/>
      </Card>
  );
}

export default PostCard;
