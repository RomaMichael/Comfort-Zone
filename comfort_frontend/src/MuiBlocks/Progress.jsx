import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingCircle() {
  return (
    <Box>
      <CircularProgress style={{ position: "relative", top: "200px" }} />
    </Box>
  );
}
