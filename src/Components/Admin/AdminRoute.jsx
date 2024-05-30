import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import Loading from "../Loader/Loading";

const AdminRoute = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useSelector((State) => State.userSlice);
  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  if (loading) return <Loading />;

  return user._id ? (
    user.role === "admin" ? (
      <div>
        <ScrollRestoration />
        <Outlet />
      </div>
    ) : (
      <Navigate to={"*"} />
    )
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default AdminRoute;
