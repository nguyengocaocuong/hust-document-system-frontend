import React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100vh",
  overflow: "hidden",
  width: "100vw",
  display:'flex',
  justifyContent:'center',
  alignItem:'center',
};

function LostInternetModal({ open }) {
  return (
    <Modal open={open} sx={{ border: "none" }} >
      <Box sx={{ ...style }} >
        <div class="patterns">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="polka-dots"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle fill="red" cx="25" cy="25" r="3"></circle>
              </pattern>
              <style>
                @import url("https://fonts.googleapis.com/css?
                family=Lora:400,400i,700,700i");
              </style>
            </defs>

            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#polka-dots)"
            >
              {" "}
            </rect>

            <text x="50%" y="60%" text-anchor="middle">
              Mất Kết nối Internet
            </text>
          </svg>
        </div>
      </Box>
    </Modal>
  );
}

export default LostInternetModal;
