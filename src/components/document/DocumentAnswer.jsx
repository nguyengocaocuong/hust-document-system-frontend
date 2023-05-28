import * as React from "react";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
function DocumentAnswer({ answer }) {
  const [isShowAll, setShowAll] = React.useState(false);
  return (
    <Card
      sx={{
        display: "flex",
        "&:hover": { boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" },
        cursor: "pointer",
      }}
    >
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
              src={answer.owner.avatar}
              style={{ width: "40px", height: "40px" }}
            >
              {answer.owner.lastName.substring(
                answer.owner.lastName.lastIndexOf(" ") + 1,
                answer.owner.lastName.lastIndexOf(" ") + 2
              )}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: "15px" }} ml="10px">
                {`${answer.owner.firstName} ${answer.owner.lastName}`}
              </Typography>
              <Typography sx={{ fontSize: "12px" }} ml="10px">
                {answer.createdAt.substring(0, 10)}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ lineHeight: "17px" }}
          >
            {isShowAll ? answer.content : answer.content?.substring(0, 90)}{" "}
            <Typography
              fontWeight={700}
              fontSize={"10px"}
              sx={{ cursor: "pointer" }}
              display={"inline"}
              onClick={() => setShowAll(!isShowAll)}
            >
              {answer.content?.length > 90 && isShowAll
                ? "(ẩn bớt)"
                : "(xem thêm)"}
            </Typography>
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <Button>
            <FavoriteOutlinedIcon style={{ color: "red" }} />{" "}
            <Typography style={{ fontSize: "15px" }}>{12}</Typography>
          </Button>
          <Button>
            <RemoveRedEyeIcon style={{ color: "blue", marginRight: "5px" }} />{" "}
            <Typography style={{ fontSize: "15px" }}>{123}</Typography>
          </Button>
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

export default DocumentAnswer;
