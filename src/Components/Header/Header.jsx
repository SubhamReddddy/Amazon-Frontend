import React from "react";
import Top from "./Top";
import Bottom from "./Bottom";

const Header = () => {
  return (
    <div className="h-fit bg-gray-900 w-full phoneLarge:h-24 text-white fixed top-0 z-30">
      <Top />
      <Bottom />
    </div>
  );
};

export default Header;
