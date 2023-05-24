import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbs } from "../settings/SidebarSetting";

function IconBreadcrumbs() {
  const location = useLocation();
  const [data, { Icon, title }] = getBreadcrumbs(location.pathname);
  return (
    <Breadcrumbs
      sx={{
        height: "50px",
        backgroundColor: "#E7E9EB",
        display: "flex",
        alignItems: "center",
        pl: 2,
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
          {<Icon sx={{ fontSize: "25px", color: "text.secondary" }} />}
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
        sx={{ display: "flex", alignItems: "center" }}
        color="text.primary"
      >
        <Icon sx={{ fontSize: "20px", mr: 0.5 }} />
        {title}
      </Typography>
    </Breadcrumbs>
  );
}

export default IconBreadcrumbs;
