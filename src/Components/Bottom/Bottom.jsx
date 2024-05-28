import React from "react";
import BottomTop from "./BottomTop";
import BottomMiddle from "./BottomMiddle";
import BottomBottom from "./BottomBottom";
import { useSelector } from "react-redux";

const Bottom = () => {
  const { user } = useSelector((State) => State.userSlice);
  return (
    <div className="mt-5">
      {user && (!user._id ? <BottomTop /> : <div className="my-5" />)}
      <BottomMiddle />
      <BottomBottom />
    </div>
  );
};

export default Bottom;
