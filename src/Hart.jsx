import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Hart = ({ value }) => {
  return value ? (
    <FavoriteIcon fontSize="large" color="error" />
  ) : (
    <FavoriteBorderIcon fontSize="large" color="disabled" />
  );
};

export default Hart;
