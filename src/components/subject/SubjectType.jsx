import { Box, Grid, Typography } from "@mui/material";
import PropperMenu from "../PropperMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { documentType as type } from "../../settings/SubjectSetting";

const getAction = (data, select, openModal) => {
  return [
    {
      icon: <VisibilityIcon sx={{ fontSize: "13px", marginRight: "5px" }} />,
      label: <Typography sx={{ fontSize: "13px" }}>Xem chi tiết</Typography>,
      handle: (close) => {
        select(data);
        close();
      },
    },
    {
      icon: (
        <AddCircleOutlineIcon sx={{ fontSize: "13px", marginRight: "5px" }} />
      ),
      label: <Typography sx={{ fontSize: "13px" }}>Thêm tài liệu</Typography>,
      handle: (close) => {
        openModal(data)
        close();
      },
    },
  ];
};
const SubjectType = ({ data = {}, select, openModal }) => {
  return (
    <Grid item xl={6}>
      <Box
        width={"100%"}
        display={"flex"}
        p={2}
        alignItems={"center"}
        height={"200px"}
        justifyContent={"center"}
      >
        <Box
          width={"90%"}
          height={"100%"}
          borderRadius={2}
          sx={{
            backgroundColor: "#c2e7ff",
            transition: "box-shadow 0.4s",
            "&:hover": { boxShadow: 4 },
            cursor: "pointer",
          }}
          p={2}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={"30px"}
            pb={1}
          >
            <Typography variant="h5" fontWeight={700}>
              {type[data.type].title}
            </Typography>
            <PropperMenu
              icon={<MoreVertIcon />}
              action={getAction(data, select, openModal)}
            />
          </Box>
          <Box
            width={"100%"}
            height={"120px"}
            display={"flex"}
            alignItems={"center"}
          >
            <img src={type[data.type].img} width={"100x"} alt="" />
            <Box p={2} height={"100%"}>
              <Typography
                variant="h3"
                fontWeight={700}
                color={type[data.type].color}
              >
                {data.documents?.length} {type[data.type].subTitle}{" "}
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                được chia sẻ bởi mọi người{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default SubjectType;
