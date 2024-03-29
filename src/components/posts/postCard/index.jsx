import { Box, Card, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import CardActions from "./PostCardActions";
import { useNavigate } from "react-router-dom";
import Owner from "../../Owner";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFavoritePostMutation } from "../../../services/PostService";
function PostCard({ data, close }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({ ...data });
  const [favoritePost] = useFavoritePostMutation();
  const toggleFavorite = () => {
    favoritePost(post.id).then(() => {
      if (post.favorite) {
        setPost({
          ...post,
          favorite: false,
          totalFavorites: post.totalFavorites - 1,
        });
      } else
        setPost({
          ...post,
          favorite: true,
          totalFavorites: post.totalFavorites + 1,
        });
    });
  };

  return (
    <Card
      sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <Owner
        owner={post?.owner}
        createdAt={post?.createdAt}
        listItem={[
          <Chip
            key={1}
            icon={<LocalOfferIcon />}
            label={post?.subject.name}
            color="primary"
          />,
          <IconButton
            key={3}
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Typography
        variant="h5"
        fontStyle={"italic"}
        color="text.secondary"
        p={"10px"}
        pb={"0"}
      >
        {post.description}
      </Typography>
      <Box
        width={"100%"}
        maxHeight={"400px"}
        overflow={"hidden"}
        borderRadius={1}
      >
        <img src={post.document.path} alt="?" width={"100%"} />
      </Box>
      <CardActions
        totalFavorite={post?.totalFavorites}
        totalComment={post?.totalComments}
        totalAnswer={post?.totalAnswers}
        isFavorited={post?.favorite}
        toggleFavorite={toggleFavorite}
      />
    </Card>
  );
}

export default PostCard;
