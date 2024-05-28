import React, { useEffect, useState } from "react";
import { flag, logo } from "../../assets/imagePath";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SearchBar from "./SearchBar";
const Top = () => {
  const [signHover, setSignHover] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { cart } = useSelector((state) => state.CartSlice);
  const { user } = useSelector((State) => State.userSlice);
  const { address } = useSelector((State) => State.AddressSlice);

  useEffect(() => {
    let total = 0;
    cart.forEach((element) => {
      total += element.quantity;
    });
    setTotalCartItem(total);
  }, [cart]);

  return (
    <div className="bg-gray-900 w-full h-16 flex items-center justify-evenly relative mb-12 phoneLarge:mb-0">
      {/* logo */}
      <Link to={"/"} className="headerHover">
        <img src={logo} alt="logo" className="h-[100%] mt-2" />
      </Link>
      {/* location */}
      <Link
        to={"/me/account/address"}
        className="headerHover whitespace-nowrap phoneSmall:hidden tabletMedium:flex"
      >
        <div className="flex justify-center items-center">
          <FmdGoodOutlinedIcon />
        </div>
        <div>
          <div className="text-xs font-header text-gray-300">
            {!address[0]
              ? "Delivery only in INDIA"
              : `Delivering to ${address[0].city} ${address[0].pinCode}`}
          </div>
          <div className="text-sm font-bold font-bottom -mt-1">
            Update location
          </div>
        </div>
      </Link>
      {/* searchbar */}
      <SearchBar />
      {/* language */}
      <div className="headerHover whitespace-nowrap phoneSmall:hidden tabletLarge:flex">
        <div className="h-full flex justify-center items-center">
          <img src={flag} alt="india" className="h-[50%] mr-1" />
          <div className="text-sm font-bold font-bottom">IN</div>
          {/* <ArrowDropDownOutlinedIcon /> */}
        </div>
      </div>
      {/* sign in */}
      <div
        className="headerHover whitespace-nowrap relative"
        onMouseOver={() => {
          setSignHover(true);
        }}
        onMouseLeave={() => {
          setSignHover(false);
        }}
      >
        <div>
          <div className="text-xs font-header">
            Hello,{" "}
            {user
              ? user._id
                ? user.username.substring(0, 6)
                : "Sign in"
              : "Sign in"}
          </div>
          <div className="text-sm font-bold font-bottom -mt-1">
            Account & Lists
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ArrowDropDownOutlinedIcon />
        </div>
        {/* hover part */}
        {signHover && (
          <div className="h-fit w-56 absolute top-11 bg-white text-black p-5 rounded-md">
            <div className="flex justify-end">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-white absolute -top-4 mr-[34.5px]" />
            </div>
            <div>
              {!user._id ? (
                <div>
                  <Link
                    to={"/signin"}
                    className="flex justify-center items-center font-heading py-1 m-1"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "#ffdf00",
                        color: "black",
                        width: "16rem",
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <div className="flex justify-center gap-1 text-[11px] font-des font-medium">
                    <p>New customer?</p>
                    <Link
                      to={"/signup"}
                      className="text-blue-700 hover:text-red-800 cursor-pointer duration-75 font-medium"
                    >
                      Start here.
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="font-header font-bold">Your Account</p>
                  <Link
                    to={"/me/account"}
                    className="text-sm font-medium text-gray-800 hover:underline hover:text-orange-600"
                    onClick={() => {
                      setSignHover(false);
                    }}
                  >
                    Your Account
                  </Link>
                  <Link
                    to={"/me/account/orders"}
                    className="text-sm font-medium text-gray-800 hover:underline hover:text-orange-600"
                    onClick={() => {
                      setSignHover(false);
                    }}
                  >
                    Your Orders
                  </Link>
                  <p
                    className="text-sm font-medium text-gray-800 hover:underline hover:text-orange-600"
                    onClick={() => {
                      setSignHover(false);
                    }}
                  >
                    Your Wish List
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Orders */}
      <Link
        to={"/me/account/orders"}
        className="headerHover whitespace-nowrap phoneSmall:hidden tabletSmall:flex"
      >
        <div>
          <div className="text-xs font-header">Returns</div>
          <div className="text-sm font-bold font-bottom -mt-1">& Orders</div>
        </div>
      </Link>
      {/* Cart */}
      <Link to="/product/cart" className="headerHover">
        <div className="h-full w-fit flex justify-center items-center">
          <div className="text-base font-bold font-bottom phoneSmall:hidden laptopSmall:block">
            Cart
          </div>
          <div className="flex">
            <ShoppingCartOutlinedIcon fontSize="large" />
            <div className="bg-amazonyellow flex justify-center items-center pr-[1px] h-fit w-6 rounded-full relative -left-4 -top-1 z-0">
              {totalCartItem}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Top;
