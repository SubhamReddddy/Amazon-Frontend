import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import Bottom from "../Bottom/Bottom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { user } = useSelector((State) => State.userSlice);
  return user._id ? (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Bottom />
    </div>
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default UserRoute;
