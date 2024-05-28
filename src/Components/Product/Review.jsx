import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();
  const { product } = useSelector((State) => State.ProductSlice);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (product._id) {
      setData(product.rating.reviews);
    }
  }, [id, product]);
  return (
    <div>
      {data.length > 0 && (
        <div className="flex justify-center">
          <div className="w-fit text-2xl font-semibold  bg-gradient-to-br from-purple-500 via-fuchsia-700 to-orange-500 bg-clip-text text-transparent">
            reviews
            <hr className=" w-[110%] -ml-[5%] h-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-700 to-orange-500" />
          </div>
        </div>
      )}
      <div className="flex gap-5 flex-wrap m-5 justify-center">
        {data.length > 0 &&
          data.map((items, idx) => (
            <div
              key={idx}
              className="bg-[#fff] h-fit min-h-40 w-72 shadow-admin rounded-lg"
            >
              <div className="flex items-center gap-2 p-3">
                <img
                  src={items.userAvtar}
                  alt="user"
                  className="h-12 w-12 aspect-square object-contain bg-[#ddd] rounded-full shadow-productcard"
                />
                <div>
                  <p className="ml-1">
                    {items.userName.length < 20
                      ? items.userName
                      : items.userName.substring(0, 20) + "..."}
                  </p>
                  <Rating precision={0.5} value={items.rating} readOnly />
                </div>
              </div>
              <div className="px-3 pb-3 break-words font-bottom text-xs">
                {items.message.length <= 150
                  ? items.message
                  : items.message.substring(0, 140) + "..."}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Review;
