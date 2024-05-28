import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const Hart = () => {
  return (
    <StyledRating
      name="customized-color"
      precision={1}
      size="large"
      max={1}
      icon={<FavoriteIcon fontSize="large" />}
      emptyIcon={<FavoriteBorderIcon fontSize="large" />}
    />
  );
};

export default Hart;
