import React from "react";
import { BottomMiddleList } from "./list";
import { Link } from "react-router-dom";

const BottomMiddle = () => {
  return (
    <div className="h-full w-full bg-[#232F3E] grid grid-cols-1 phoneMedium:grid-cols-2 tabletSmall:grid-cols-4 pt-5 pb-10">
      {BottomMiddleList.map((item, idx) => (
        <div
          key={idx}
          className="w-fit tabletSmall:w-full ml-[15%] tabletSmall:ml-0 tabletSmall:flex flex-col items-center"
        >
          <div className="w-fit">
            <div className="whitespace-nowrap text-[#fff] font-header font-semibold text-base mt-5">
              {item.heading}
            </div>

            {item.data.map((bottom, i) => (
              <Link
                to={"/servicecomingsoon"}
                key={i}
                className=" block whitespace-nowrap w-fit text-[#ddd] font-bottom cursor-pointer hover:underline delay-100 font-medium text-sm mt-1"
              >
                {bottom}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomMiddle;
