import { BottomNavigation, BottomNavigationAction, Box, IconButton, InputBase, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const CustomBottomNavigationAction = styled(BottomNavigationAction)(
    `
    &.Mui-selected {
      color: red;
    }
    &:hover{
      color:red;
    }
  `
  );
function Recommend() {
  const location = useLocation();
  const [toogleRightContainer, setToggleRightContainer] = useState(true);

  return (
    <>
      <Box width={"100%"}>
        <IconButton onClick={() => setToggleRightContainer(false)}>
          <ClearOutlinedIcon />
        </IconButton>
      </Box>
      <Box pl="10px">
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Có thể bạn quan tâm
        </Typography>
      </Box>
      <Box
        width={"100%"}
        sx={{ height: "40px" }}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        p={"10px"}
        pt={"30px"}
      >
        <SearchOutlinedIcon sx={{ fontSize: "30px" }} />
        <InputBase
          sx={{ ml: 1, fontSize: "16px", width: "95%" }}
          placeholder="Bạn muốn tìm gì kiếm..."
        />
      </Box>
      <Box
        height={"67vh"}
        width={"100%"}
        sx={{ backgroundColor: "transparent" }}
        overflow={"hidden"}
        p="15px"
      ></Box>
      <BottomNavigation
        showLabels
        value={1}
        onChange={(event, newValue) => {
          // setValue(newValue);
        }}
        sx={{
          borderRadius: "25px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <CustomBottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <CustomBottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <CustomBottomNavigationAction
          label="Nearby"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default Recommend;
