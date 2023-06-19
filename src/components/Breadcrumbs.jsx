import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbs } from "../settings/sidebarSetting";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function IconBreadcrumbs() {
  const location = useLocation();
  const [data] = getBreadcrumbs(location.pathname);
  return (
    <Breadcrumbs
      sx={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        pl: 2,
        backgroundColor: "white",
        borderBottom: "1px solid #D8D9D9",
      }}
    >
      {data.map(({ Icon, title, to }, index) => (
        <Link
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          to={to}
        >
          {<Icon sx={{ fontSize: "28px", color: "text.secondary" }} />}
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              "&:hover": { textDecoration: "underline" },
            }}
            color="text.secondary"
            ml={0.5}
          >
            {title}
          </Typography>
        </Link>
      ))}

      <Typography
        variant="h4"
        sx={{ display: "flex", fontSize: "23px" }}
        color="text.primary"
        display={"flex"}
        alignItems={"center"}
      >
        <HomeOutlinedIcon sx={{ fontSize: "23px", mr: 0.5 }} />
        Tổng quan
      </Typography>
    </Breadcrumbs>
  );
}

export default IconBreadcrumbs;
