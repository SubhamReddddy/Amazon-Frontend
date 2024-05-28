import React from "react";
import { flag, logo } from "../../assets/imagePath";
const BottomBottom = () => {
  const contry = [
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "Italy",
    "Japan",
    "Mexico",
    "Netherlands",
    "Poland",
    "Singapore",
    "Spain",
    "Turkey",
    "United Arab Emirates",
  ];
  return (
    <div>
      <div className="h-fit bg-[#232F3E] p-5 flex items-center flex-col">
        <div className="flex h-14 w-full justify-center items-center ">
          <div>
            <img src={logo} alt="logo" className="h-10 mr-10" />
          </div>

          <div>
            <img src={flag} alt="flag" className="h-8 -mt-4" />
          </div>
        </div>
        <ul className="flex gap-3 justify-center flex-wrap p-5">
          {contry.map((i, j) => (
            <li
              key={j}
              className="font-des text-[10px] phoneLarge:text-xs font-medium text-white mt-2 cursor-pointer hover:underline duration-100"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-fit bg-[#131A22] border-b-4 border-red-950 p-7">
        <div className="flex justify-center items-center gap-5 font-bottom text-[#ddd] text-[10px] tabletSmall:text-xs font-semibold">
          <span className="whitespace-nowrap hover:underline cursor-pointer">
            Conditions of Use & Sale
          </span>
          <span className="whitespace-nowrap hover:underline cursor-pointer">
            Privacy Notice
          </span>
          <span className="whitespace-nowrap hover:underline cursor-pointer">
            Interest-Based Ads
          </span>
        </div>
        <div className="font-bottom text-[#ddd] text-center mt-1 font-semibold text-[10px] tabletSmall:text-xs">
          &copy; 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default BottomBottom;
