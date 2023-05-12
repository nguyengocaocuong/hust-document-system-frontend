import * as React from "react";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import { red } from "@mui/material/colors";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const avatars = [
  "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg",
  "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg",
  "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg",
  "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg",
  "https://cdn.pixabay.com/photo/2013/12/17/20/10/bubbles-230014__340.jpg",
  "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990__340.jpg",
];
function PostCardAnswer({ data }) {
  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100% - 100px)",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box display={"flex"} alignItems={"center"} mb={1}>
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={data.owner.avatar}
              style={{ width: "40px", height: "40px" }}
            >
              {data.owner.name.substring(
                data.owner.name.lastIndexOf(" ") + 1,
                data.owner.name.lastIndexOf(" ") + 2
              )}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: "15px" }} ml="10px">
                {data.owner.name}
              </Typography>
              <Typography sx={{ fontSize: "12px" }} ml="10px">
                {data.createAt}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ lineHeight: "17px" }}
          >
            {data.description}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
            justifyContent: "space-between",
          }}
        >
          <IconButton aria-label="previous" sx={{ fontSize: "18px" }}>
            <StarPurple500Icon
              style={{ color: "yellow", marginRight: "5px" }}
            />{" "}
            <Typography style={{ fontSize: "15px" }}>{data.rate}</Typography>
          </IconButton>
          <IconButton aria-label="play/pause" sx={{ fontSize: "18px" }}>
            <FavoriteOutlinedIcon
              style={{ color: "red", marginRight: "5px" }}
            />{" "}
            <Typography style={{ fontSize: "15px" }}>
              {data.favorite}
            </Typography>
          </IconButton>
          <IconButton aria-label="next" sx={{ fontSize: "18px" }}>
            <RemoveRedEyeIcon style={{ color: "blue", marginRight: "5px" }} />{" "}
            <Typography style={{ fontSize: "15px" }}>{data.view}</Typography>
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={avatars[Math.round(Math.random() * 100) % avatars.length]}
        alt="Live from space album cover"
      />
    </Card>
  );
}

export default PostCardAnswer;
