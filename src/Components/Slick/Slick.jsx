import React from "react";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
  bannerImgSix,
  bannerImgSeven,
  bannerImgEitght,
} from "../../assets/imagePath";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// Import css files
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./Slick.css";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="right-7 top-20 phoneMedium:top-24 phoneLarge:right-10 phoneLarge:top-36"
      style={{
        ...style,
        display: "block",
        backgroundColor: "transparent",
        position: "absolute",
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
        className="text-black hover:shadow-slidebutton py-7 phoneMedium:py-12 px-3 -mt-8 phoneLarge:py-24 phoneLarge:px-6 rounded cursor-pointer"
      >
        <KeyboardArrowRightIcon fontSize="large" />
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="left-7 top-20 phoneMedium:top-24 phoneLarge:left-10 phoneLarge:top-36"
      style={{
        ...style,
        display: "block",
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
        className="text-black hover:shadow-slidebutton py-7 phoneMedium:py-12 px-3 -mt-8 phoneLarge:py-24 phoneLarge:px-6  rounded cursor-pointer"
      >
        <KeyboardArrowLeftIcon fontSize="large" />
      </div>
    </div>
  );
}

function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container relative">
      <div
        className="w-full h-[26%] phoneLarge:h-[15%] tabletSmall:h-[30%] tabletMedium:h-[40%] laptopmin:h-[50%] absolute bottom-0 z-10 
      bg-gradient-to-t from-gray-100 from-5% via-gray-50 via-20% to-transparent to-90%"
      ></div>
      <Slider {...settings}>
        <div>
          <img src={bannerImgOne} alt="bannerImgOne" />
        </div>
        <div>
          <img src={bannerImgTwo} alt="bannerImgTwo" />
        </div>
        <div>
          <img src={bannerImgThree} alt="bannerImgThree" />
        </div>
        <div>
          <img src={bannerImgFour} alt="bannerImgFour" />
        </div>
        <div>
          <img src={bannerImgFive} alt="bannerImgFive" />
        </div>
        <div>
          <img src={bannerImgSix} alt="bannerImgSix" />
        </div>
        <div>
          <img src={bannerImgSeven} alt="bannerImgSeven" />
        </div>
        <div>
          <img src={bannerImgEitght} alt="bannerImgEitght" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
