import React, { useEffect, useState } from "react";
import { logo2 } from "../../assets/imagePath";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import { useUserLoginMutation } from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../Redux/Reducers/UserSlice";
import Loading from "../../Components/Loader/Loading";
import { addAddress } from "../../Redux/Reducers/AddressSlice";
const SignIn = () => {
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const { _id } = useSelector((state) => state.userSlice.user);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const submithandler = async (e) => {
    e.preventDefault();
    const res = await userLogin({ phoneno, password });
    if (res.data) {
      toast.success(res.data.message);
      dispatch(getUserDetails(res.data.user));
      const getAddress = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/me/address`,
            {
              withCredentials: true,
            }
          );
          if (data.address) {
            dispatch(addAddress({ success: true, address: data.address }));
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      getAddress();
    } else {
      // console.log(res)
      toast.error(res.error.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (_id) return <Navigate to={"/"} />;
  return (
    <div className="h-fit relative">
      <div className=" bg-[#fff] h-16 py-10 flex justify-center items-center w-full fixed top-0 shadow-productcard">
        <Link to={"/"}>
          <img
            src={logo2}
            alt={logo2}
            className="w-36 mt-2 headerHover hover:border-black"
          />
        </Link>
      </div>
      {isLoading && <Loading />}
      <div className="flex flex-col h-fit min-h-screen">
        <div className="h-fit flex pt-24 justify-center items-center pb-5 flex-grow">
          <div className="bg-[#ffffff] w-[98%] phoneLarge:w-[350px] p-5 border-[1.5px] border-[rgb(75 85 99 1)] rounded-md">
            <div className="text-3xl mb-5">
              <p>SignIn</p>
            </div>
            <form onSubmit={submithandler}>
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="phoneno" className="text-sm font-semibold">
                  Mobile number
                </label>
                <input
                  type="text"
                  name="phoneno"
                  id="phoneno"
                  className="w-full h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox"
                  placeholder="Mobile number"
                  minLength={10}
                  value={phoneno}
                  maxLength={10}
                  required
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <div className="text-sm font-semibold flex justify-between">
                  <label htmlFor="password">Password</label>
                  <Link
                    to={"/forgot/password"}
                    className="text-blue-500 cursor-pointer hover:text-red-500"
                  >
                    Forgot Password
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox"
                  placeholder="Atleast 6 characters"
                  minLength={6}
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex justify-center items-center py-1 m-1">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#ffdf00",
                    color: "ButtonText",
                    width: "16rem",
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  SignIn
                </Button>
              </div>

              <div className="flex text-sm font-medium gap-1 mb-7 mt-5">
                <p>Don't have an account?</p>
                <p className="text-blue-500 cursor-pointer hover:text-red-500">
                  <Link to={"/signup"}>SignUp</Link>
                </p>
              </div>

              <div className="text-xs font-medium">
                <p>
                  By creating an account or logging in, you agree to Amazon's
                  <b className="text-blue-500 cursor-pointer hover:text-red-500 font-medium">
                    Conditions of Use{" "}
                  </b>
                  and{" "}
                  <b className="text-blue-500 cursor-pointer hover:text-red-500 font-medium">
                    Privacy Policy
                  </b>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="h-fit bg-[#131A22] border-b-4 border-red-950 p-7">
          <div className="flex justify-center items-center gap-5 font-bottom text-[#ddd] text-[10px] tabletSmall:text-xs font-semibold">
            <span className="whitespace-nowrap hover:underline cursor-pointer">
              Conditions of Use & Sale
            </span>
            <span className="whitespace-nowrap hover:underline cursor-pointer">
              Privacy Notice
            </span>
            <span className="whitespace-nowrap hover:underline cursor-pointer">
              Interest-Based Ads
            </span>
          </div>
          <div className="font-bottom text-[#ddd] text-center mt-1 font-semibold text-[10px] tabletSmall:text-xs">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
