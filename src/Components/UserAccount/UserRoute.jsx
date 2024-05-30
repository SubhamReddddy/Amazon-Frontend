import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import Bottom from "../Bottom/Bottom";
import { useSelector } from "react-redux";
import Loading from "../Loader/Loading";

const UserRoute = () => {
  const { user } = useSelector((State) => State.userSlice);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  if (loading) return <Loading />;
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
