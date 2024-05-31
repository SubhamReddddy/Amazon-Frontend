import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loader/Loading";
import { logo2 } from "../../assets/imagePath";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  checkPhoneno,
  checkPasswordStrength,
} from "../../Features/InputValidator";
import {
  usePhoneNumberOtpVarifyMutation,
  usePhoneOTPSendMutation,
  usePasswordForgotMutation,
  useGetUserDetailsMutMutation,
} from "../../Redux/Api/UserApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const [phoneno, setPhoneno] = useState("");
  const [validPhoneno, setValidPhoneno] = useState(false);
  const [phoneVarified, setPhoneVarified] = useState(false);
  const [phoneReq, setPhoneReq] = useState(true);
  const [phoneTime, setPhoneTime] = useState(15);
  const [phoneOTP, setPhoneOTP] = useState("");
  let phoneId = "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [confirmPasswordConfirm, setConfirmPasswordConfirm] = useState("");

  const [phoneOTPSend, { isLoading }] = usePhoneOTPSendMutation();
  const [phoneNumberOtpVarify, { isLoading: Load }] =
    usePhoneNumberOtpVarifyMutation();
  const [passwordForgot, { isLoading: Load1 }] = usePasswordForgotMutation();
  const [getUserDetailsMut, { isLoading: Load2 }] =
    useGetUserDetailsMutMutation();

  useEffect(() => {
    setValidPhoneno(checkPhoneno(phoneno));
  }, [phoneno]);

  useEffect(() => {
    let res = checkPasswordStrength(newPassword);
    setNewPasswordConfirm(res);
  }, [newPassword]);

  useEffect(() => {
    let res = checkPasswordStrength(confirmPassword);
    setConfirmPasswordConfirm(res);
  }, [confirmPassword]);

  const OTPphone = async () => {
    if (validPhoneno) {
      if (phoneId !== "") clearInterval(phoneId);
      const res = await phoneOTPSend({ phoneno });
      setPhoneVarified(false);
      if (res.error) {
        toast.error(res.error.data.message);
        if (res.error.data.time) {
          setPhoneReq(false);
          const { time } = res.error.data;
          phoneId = setInterval(() => {
            const expiry = (
              (time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setPhoneTime(expiry);

            if (expiry <= 0) {
              clearInterval(phoneId);
              setPhoneReq(true);
            }
          });
        }
      } else if (res.data) {
        if (res.data.message === "Please try after some time!") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setPhoneReq(false);
          const { time } = res.data;
          phoneId = setInterval(() => {
            const expiry = (
              (time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setPhoneTime(expiry);

            if (expiry <= 0) {
              clearInterval(phoneId);
              setPhoneReq(true);
            }
          });
        }
      }
    } else {
      toast.error("Please enter a valid phone !");
    }
  };

  const otpPhoneVarifyHandler = async () => {
    const res = await phoneNumberOtpVarify({ phoneno, otp: phoneOTP });
    if (res.data) {
      setPhoneVarified(true);
      toast.success(res.data.message);
    } else if (res.error) {
      setPhoneVarified(false);
      toast.error(res.error.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      confirmPasswordConfirm === "Very Strong" &&
      newPasswordConfirm === "Very Strong"
    ) {
      if (newPassword === confirmPassword) {
        const res = await passwordForgot({ phoneno, newPassword });
        if (res.data) {
          toast.success(res.data.message);
          navigate("/signin");
        } else if (res.error) {
          toast.error(res.error.data.message);
        }
      } else {
        toast.error("newPassword and confirmPassword must be same !");
      }
    } else {
      toast.error("please enter very strong password !");
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const res = await getUserDetailsMut();
      if (res.data.user) {
        history.go(-1);
      }
    };
    getDetails();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading || Load || Load1 || Load2 ? (
    <Loading />
  ) : (
    <div className="h-fit relative">
      <div className=" bg-[#fff] h-16 py-10 flex justify-center items-center w-full fixed top-0 shadow-productcard">
        <Link to={"/"}>
          <img
            src={logo2}
            alt={"logo"}
            className="h-16 mt-2 headerHover hover:border-black"
          />
        </Link>
      </div>

      <div className="flex flex-col h-fit min-h-screen">
        <div className="flex justify-center items-center pb-5 flex-grow">
          <div className="bg-[#ffffff] w-[98%] phoneLarge:w-[350px] p-5 border-[1.5px] border-[rgb(75 85 99 1)] rounded-md">
            <div className="text-3xl mb-5">
              <p>Password assistance</p>
              <p className="text-sm font-medium mt-1">
                Enter the mobile phone number associated with your Amazon
                account.
              </p>
            </div>
            <form onSubmit={submitHandler}>
              {/* phone otp box */}
              <div>
                <label
                  htmlFor="mobile phone number"
                  className="text-sm font-semibold ml-0.5"
                >
                  mobile phone number
                </label>
                <div className="flex gap-3 mb-5">
                  <input
                    type="text"
                    name="phoneno"
                    id="phoneno"
                    className="w-full h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox"
                    placeholder="Mobile number"
                    minLength={10}
                    maxLength={10}
                    value={phoneno}
                    required
                    readOnly={phoneVarified || !phoneReq}
                    onChange={(e) => {
                      setPhoneno(e.target.value);
                    }}
                  />
                  {!phoneVarified ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "#ffdf00",
                        color: "ButtonText",
                        fontWeight: "normal",
                      }}
                      disabled={!phoneReq}
                      onClick={OTPphone}
                    >
                      {" "}
                      {phoneReq ? "otp" : phoneTime}
                    </Button>
                  ) : (
                    <div className="text-green-600 capitalize">verified</div>
                  )}
                </div>
                {phoneno && (
                  <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                    {validPhoneno ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    {validPhoneno
                      ? "Phone number is valid."
                      : "Invalid phone number."}
                  </p>
                )}

                {/* phoneOTP */}
                {!phoneReq && !phoneVarified && (
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold">
                      OTP
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="emailopt"
                        className="w-40 h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox tracking-[0.8rem] text-center"
                        maxLength={6}
                        value={phoneOTP}
                        required
                        onChange={(e) => {
                          setPhoneOTP(e.target.value);
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: "#ffdf00",
                          color: "ButtonText",
                          fontWeight: "normal",
                          zIndex: 1,
                        }}
                        onClick={otpPhoneVarifyHandler}
                      >
                        {" "}
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {phoneVarified && (
                <div className="flex flex-col gap-5">
                  {/* newPassword */}
                  <div>
                    <label
                      htmlFor="newpassword"
                      className="text-sm font-header font-medium"
                    >
                      New Password
                    </label>
                    <div>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        required
                        minLength={6}
                        className="w-full outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
                      />
                    </div>
                    {newPassword && (
                      <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                        {newPasswordConfirm === "Very Strong" ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <CancelIcon color="error" fontSize="small" />
                        )}
                        {newPasswordConfirm}
                      </p>
                    )}
                  </div>

                  {/* confirmPassword */}
                  <div>
                    <label
                      htmlFor="confirmpassword"
                      className="text-sm font-header font-medium"
                    >
                      Confirm Password
                    </label>
                    <div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        required
                        minLength={6}
                        className="w-full outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
                      />
                    </div>
                    {confirmPassword && (
                      <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                        {confirmPasswordConfirm === "Very Strong" ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <CancelIcon color="error" fontSize="small" />
                        )}
                        {confirmPasswordConfirm}
                      </p>
                    )}
                  </div>

                  {/* button */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    style={{
                      backgroundColor: "#ffdf00",
                      color: "ButtonText",
                      fontWeight: "normal",
                      width: "11rem",
                      width: "100%",
                    }}
                  >
                    continue
                  </Button>
                </div>
              )}
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

export default ForgotPassword;
