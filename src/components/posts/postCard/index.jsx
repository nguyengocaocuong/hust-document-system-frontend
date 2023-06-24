import { Box, Card, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import CardActions from "./PostCardActions";
import { useNavigate } from "react-router-dom";
import Owner from "../../Owner";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import {
  useFavoritePostMutation,
  useGetAllPostsQuery,
} from "../../../services/PostService";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import FlagIcon from "@mui/icons-material/Flag";
import PropperMenu from "../../PropperMenu";
function PostCard({ data, close }) {
  const navigate = useNavigate();
  const { refetch: refetchAllPostForHomePage } = useGetAllPostsQuery();
  const [post, setPost] = useState({ ...data });
  const { user } = useSelector((state) => state.authentication);
  const isFavorited =
    post.favorites.find((favorite) => favorite.user.id === user.id) !==
    undefined;
  const [favoritePost] = useFavoritePostMutation();
  const toggleFavorite = () => {
    favoritePost(post.id).then(() => {
      if (isFavorited) {
        setPost({
          ...post,
          favorites: post.favorites.filter(
            (favorite) => favorite.user.id !== user.id
          ),
        });
      } else
        setPost({
          ...post,
          favorites: [...post.favorites, { user }],
        });
      refetchAllPostForHomePage();
    });
  };
  const copyUrl = () => {
    const url = `http://localhost:3000/post/${post.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Đã copy vào clipboard");
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép vào clipboard:", error);
      });
  };
  const reportSubjectDocument = () => {};
  const actions = () => [
    {
      Icon: FlagIcon,
      label: "Báo cáo",
      action: reportSubjectDocument,
    },
    { Icon: CopyAllIcon, label: "Copy link truy cập", action: copyUrl },
  ];
  return (
    <Card
      sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <Owner
        owner={post?.owner}
        createdAt={post?.createdAt}
        listItem={[
          <Chip key={1} icon={<LocalOfferIcon />} label={post?.subject.name} />,
          <PropperMenu key={2} action={actions()} />,
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
        totalFavorite={post?.favorites?.length}
        totalComment={post?.comments?.length}
        totalAnswer={post?.answers?.length}
        isFavorited={isFavorited}
        toggleFavorite={toggleFavorite}
      />
    </Card>
  );
}

export default PostCard;
