import React from "react";
import Slider from "react-slick";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageStack.css";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="right-10 top-56"
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
        className="text-black hover:shadow-slidebutton py-5 px-5 -mt-8  rounded-full cursor-pointer"
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
      className="left-10 top-56"
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
        className="text-black hover:shadow-slidebutton py-5 px-5 -mt-8 rounded-full cursor-pointer"
      >
        <KeyboardArrowLeftIcon fontSize="large" />
      </div>
    </div>
  );
}

function ImageStack(props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container relative w-full">
      <Slider {...settings}>
        {props.images.map((image, ind) => {
          return (
            <div key={ind}>
              <img
                src={image.url}
                alt="product image"
                className="w-96 h-auto tabletSmall:max-h-96 m-auto aspect-square object-contain"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default ImageStack;
