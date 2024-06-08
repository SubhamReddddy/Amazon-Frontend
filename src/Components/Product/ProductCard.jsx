import React from "react";
import Rating from "@mui/material/Rating";
import DoneIcon from "@mui/icons-material/Done";
const ProductCard = (productes) => {
  const product = productes.productes;
  return (
    <div
      className="w-full h-80 pt-7 pb-[5%] relative bg-white shadow-productcard hover:-translate-y-2 duration-300 cursor-pointer dur"
      style={{ animation: "ease-in-out", transitionTimingFunction: "linear" }}
    >
      <div className="h-4/6 flex justify-center">
        <img
          src={product.images[0].url}
          alt="image"
          className="h-full aspect-square object-contain"
        />
      </div>
      <div className="p-[4%] h-2/5">
        <div className="flex h-5 items-center">
          <Rating
            name="half-rating-read"
            value={product.rating.rate}
            precision={0.5}
            size="small"
            readOnly
          />
          <p className="ml-2">{`(${product.rating.count})`}</p>
        </div>
        <p className="font-header">{`Price : ₹${product.productPrice}`}</p>
        <p className="text-sm font-header">
          {product.productName.substring(0, 15) + "..."}
        </p>
        <p className="text-xs font-bottom">
          {product.productDiscription.substring(0, 20) + "..."}
        </p>
      </div>
      <p className="absolute top-[2px] right-[2px] text-sm bg-white px-2 rounded font-semibold text-blue-500">
        <DoneIcon style={{ color: "#f57f17" }} />
        Prime
      </p>
    </div>
  );
};

export default ProductCard;
