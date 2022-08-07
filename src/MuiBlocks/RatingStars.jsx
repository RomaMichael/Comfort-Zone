import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

export default function BasicRating({ rating, setRating }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
      />
    </Box>
  );
}
