import { Box, Card, Chip, Typography } from "@mui/material";
import React from "react";
import CardActions from "./PostCardActions";
import { useNavigate } from "react-router-dom";
import Owner from "../../Owner";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
function PostCard({ data }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "100%" }} onClick={() => navigate(`/post/${data.id}`)}>
      <Owner
        owner={data?.owner}
        createdAt={data?.createdAt}
        listItem={[
          <Chip key={1} icon={<LocalOfferIcon />} label={data?.subject.name} />,
        ]}
      />
      <Typography
        variant="h5"
        fontStyle={"italic"}
        color="text.secondary"
        p={"10px"}
        pb={"0"}
      >
        {data.description}
      </Typography>
      <Box
        width={"100%"}
        maxHeight={"400px"}
        overflow={"hidden"}
        borderRadius={1}
      >
        <img
          src={data.document.path}
          alt="?"
          width={"100%"}
        />
      </Box>
      <CardActions
        totalFavorite={data?.totalFavorite}
        totalComment={data?.totalComment}
        totalAnswer={data?.totalAnswer}
      />
    </Card>
  );
}

export default PostCard;
