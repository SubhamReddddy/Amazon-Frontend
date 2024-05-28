import React from "react";
import Slick from "../../Components/Slick/Slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from "../../assets/imagePath";
import AllProducts from "../../Components/Product/AllProducts";
const Home = () => {
  const image = [
    bannerImgOne,
    bannerImgTwo,
    bannerImgThree,
    bannerImgFour,
    bannerImgFive,
  ];
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24 text-white">
      <Slick />
      <div
        className="h-fit w-full relative block -top-12 tabletSmall:-top-28 tabletMedium:-top-36
      tabletLarge:-top-44 laptopmin:-top-[283px] -mb-12 tabletSmall:-mb-28 tabletMedium:-mb-36
      tabletLarge:-mb-44 laptopmin:-mb-72 text-black z-20"
      >
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
