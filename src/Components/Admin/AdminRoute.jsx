import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

const AdminRoute = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useSelector((State) => State.userSlice);
  useEffect(() => {
    setUserDetails(user);
  }, [user]);
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
