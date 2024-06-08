import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sideBarList } from "./list";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserDetails } from "../../Redux/Reducers/UserSlice";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { addAddress } from "../../Redux/Reducers/AddressSlice";
const SideBar = ({ fun, value }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((State) => State.userSlice);

  const Logout = async () => {
    if (user) {
      if (user._id) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/logout`,
            { withCredentials: true }
          );
          toast.success(data.message);
          dispatch(getUserDetails({}));
          dispatch(addAddress({ success: false, address: [] }));
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <div>
      {/* motion div */}
      <motion.div
        initial={{ x: -400, opacity: 1 }}
        animate={value ? { x: 0, opacity: 1 } : { x: -400, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-72 phoneMedium:w-80 h-full fixed left-0 top-0 z-50 overflow-auto"
      >
        <Link
          to={user ? (user._id ? "/" : "/signin") : "/signin"}
          className="bg-gray-800 h-14 flex items-center gap-5 px-8"
        >
          {user.avtar ? (
            user.avtar.url ? (
              <img
                src={user.avtar.url}
                className="aspect-square object-contain h-10 w-10 rounded-full"
              />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
          <span className="text-xl font-bold -ml-2">
            Hello,
            {user
              ? user._id
                ? user.username.substring(0, 6)
                : "Sign In"
              : "Sign In"}
          </span>
        </Link>
        <div>
          {sideBarList.map((items, ixd) => (
            <div key={ixd} className="py-5">
              <div>
                <h1 className="text-lg text-black font-heading font-bold h-10 cursor-pointer px-5">
                  {items.heading}
                </h1>
                {items.data.map((itm, idx) => (
                  <Link
                    to={items.link[idx]}
                    key={idx}
                    className="flex items-center justify-between hover:bg-slate-200 pr-5"
                    onClick={() => {
                      fun(!value);
                    }}
                  >
                    <h2 className="text-gray-700 font-des text-sm font-semibold h-10 cursor-pointer flex items-center p-5 ">
                      {itm}
                    </h2>
                    <KeyboardDoubleArrowRightIcon sx={{ color: grey[500] }} />
                  </Link>
                ))}
              </div>
              <hr className="bg-black h-[1.5px]" />
            </div>
          ))}
          <div className="py-5">
            <div>
              <h1 className="text-lg text-black font-heading font-bold h-10 cursor-pointer px-5">
                Help & Settings
              </h1>
              {user && user._id && (
                <Link
                  to={"/me/account"}
                  className="flex items-center justify-between hover:bg-slate-200 pr-5"
                  onClick={() => {
                    fun(!value);
                  }}
                >
                  <h2 className="text-gray-700 font-des text-sm font-semibold h-10 cursor-pointer flex items-center p-5 ">
                    Your Account
                  </h2>
                  <KeyboardDoubleArrowRightIcon sx={{ color: grey[500] }} />
                </Link>
              )}
              {user && user._id && user.role === "admin" && (
                <Link
                  to={"/admin/dashboard"}
                  className="flex items-center justify-between hover:bg-slate-200 pr-5"
                  onClick={() => {
                    fun(!value);
                  }}
                >
                  <h2 className="text-gray-700 font-des text-sm font-semibold h-10 cursor-pointer flex items-center p-5 ">
                    Admin Dashboard
                  </h2>
                  <KeyboardDoubleArrowRightIcon sx={{ color: grey[500] }} />
                </Link>
              )}
              {user && user._id && (
                <Link
                  to={"/servicecomingsoon"}
                  className="flex items-center justify-between hover:bg-slate-200 pr-5"
                  onClick={() => {
                    fun(!value);
                  }}
                >
                  <h2 className="text-gray-700 font-des text-sm font-semibold h-10 cursor-pointer flex items-center p-5 ">
                    Customer Service
                  </h2>
                  <KeyboardDoubleArrowRightIcon sx={{ color: grey[500] }} />
                </Link>
              )}
              <Link
                to={user ? (user._id ? "/" : "/signin") : "/signin"}
                className="flex items-center justify-between hover:bg-slate-200 pr-5"
                onClick={() => {
                  Logout();
                  fun(!value);
                }}
              >
                <h2 className="text-gray-700 font-des text-sm font-semibold h-10 cursor-pointer flex items-center p-5">
                  {user ? (user._id ? "Logout" : "Sing In") : "Sing In"}
                </h2>
                <KeyboardDoubleArrowRightIcon sx={{ color: grey[500] }} />
              </Link>
            </div>
            <hr className="bg-black h-[1.5px]" />
          </div>
        </div>
      </motion.div>

      {/* transparent div */}
      <motion.div
        initial={{ x: -1500, opacity: 0 }}
        animate={value ? { x: 0, opacity: 1 } : { x: -1500, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 fixed w-screen h-full left-0 top-0 z-30 cursor-default"
        onClick={() => {
          fun(!value);
        }}
      >
        <CancelSharpIcon
          fontSize="large"
          className="absolute left-72 phoneMedium:left-80 cursor-pointer"
        />
      </motion.div>
    </div>
  );
};

export default SideBar;
