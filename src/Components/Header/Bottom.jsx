import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
const Bottom = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="bg-gray-800 h-8 flex items-center gap-2 font-bottom text-base px-1 cursor-pointer">
      <div
        className="flex items-center headerHover h-[98%] whitespace-nowrap"
        onClick={() => {
          setSidebar(!sidebar);
        }}
      >
        <FaBars className="text-lg mr-1" />
        <span className="h-fit mt-[1px]">All</span>
      </div>

      <Link
        to={"/product/category/newreleases"}
        className="headerHover h-[98%] whitespace-nowrap cursor-pointer"
      >
        Fresh
      </Link>

      <Link
        to={"/product/category/bestsellers"}
        className="headerHover h-[98%] whitespace-nowrap cursor-pointer"
      >
        Best Sellers
      </Link>

      <Link
        to={"/servicecomingsoon"}
        className="headerHover h-[98%] whitespace-nowrap cursor-pointer hidden tabletSmall:block"
      >
        Customer Service
      </Link>
      <SideBar fun={setSidebar} value={sidebar} />
    </div>
  );
};

export default Bottom;
