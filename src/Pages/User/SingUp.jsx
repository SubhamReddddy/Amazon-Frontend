import React, { useEffect, useState } from "react";
import { logo2 } from "../../assets/imagePath";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link, Navigate } from "react-router-dom";
import {
  checkName,
  validateEmail,
  checkPhoneno,
  checkPasswordStrength,
} from "../../Features/InputValidator";
import toast from "react-hot-toast";
import {
  useEmailOtpMutation,
  useEmailVarifyMutation,
  useUserRegisterMutation,
  usePhoneNumberVarifyMutation,
  usePhoneNumberOtpVarifyMutation,
} from "../../Redux/Api/UserApi";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../Redux/Reducers/UserSlice";
import Loading from "../../Components/Loader/Loading";
const SignIn = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.userSlice.user);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [email, setEmail] = useState("");
  const [emailTime, setEmailTime] = useState(15);
  const [emailReq, setEmailReq] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [emailVarified, setEmailVarified] = useState(false);
  let emailId = "";

  const [phoneno, setPhoneno] = useState("");
  const [validPhoneno, setValidPhoneno] = useState(false);
  const [phoneVarified, setPhoneVarified] = useState(false);
  const [phoneReq, setPhoneReq] = useState(true);
  const [phoneTime, setPhoneTime] = useState(15);
  const [phoneOTP, setPhoneOTP] = useState("");
  let phoneId = "";

  const [password, setPassword] = useState("");
  const [ValidPassword, setValidPassword] = useState("Very Weak");

  const [submit, setSubmit] = useState(false);
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const [emailOtp, { isLoading: Load1 }] = useEmailOtpMutation();
  const [emailVarify, { isLoading: Load2 }] = useEmailVarifyMutation();
  const [phoneNumberVarify, { isLoading: Load3 }] =
    usePhoneNumberVarifyMutation();
  const [phoneNumberOtpVarify, { isLoading: Load4 }] =
    usePhoneNumberOtpVarifyMutation();

  useEffect(() => {
    setValidUsername(checkName(username));
    setValidEmail(validateEmail(email));
    setValidPhoneno(checkPhoneno(phoneno));
    setValidPassword(checkPasswordStrength(password));
    if (
      validEmail &&
      validPhoneno &&
      validUsername &&
      ValidPassword === "Very Strong"
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [
    username,
    email,
    phoneno,
    password,
    validEmail,
    validPhoneno,
    validUsername,
    ValidPassword,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailVarified && phoneVarified) {
      if (submit) {
        const res = await userRegister({ username, email, phoneno, password });
        if (res.data) {
          toast.success(res.data.message);
          dispatch(getUserDetails(res.data.user));
        } else if (res.error) {
          toast.error(res.error.data.message);
        }
      } else {
        toast.error("Invalid Information!");
      }
    } else {
      toast.error("please verify your email or phoneno !");
    }
  };

  const OTPemail = async () => {
    if (validEmail) {
      if (emailId !== "") clearInterval(emailId);
      const res = await emailOtp({ email });
      setEmailVarified(false);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message);
        if (res.error.data.time) {
          setEmailReq(false);
          const { time } = res.error.data;
          emailId = setInterval(() => {
            const expiry = (
              (time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setEmailTime(expiry);

            if (expiry <= 0) {
              clearInterval(emailId);
              setEmailReq(true);
            }
          }, 100);
        }
      } else if (res.data) {
        toast.success(res.data.message);
        setEmailReq(false);
        const { time } = res.data;
        emailId = setInterval(() => {
          const expiry = (
            (time - new Date(Date.now()).getTime()) /
            60000
          ).toFixed(2);
          setEmailTime(expiry);

          if (expiry <= 0) {
            clearInterval(emailId);
            setEmailReq(true);
          }
        }, 100);
      }
    } else {
      toast.error("Please enter a valid mail !");
    }
  };

  const otpVarifyHandler = async () => {
    console.log(email, emailOTP);
    const res = await emailVarify({ email, otp: emailOTP });
    if (res.data) {
      setEmailVarified(true);
      toast.success(res.data.message);
    } else if (res.error) {
      setEmailVarified(false);
      toast.error(res.error.data.message);
    }
  };

  const OTPphone = async () => {
    if (validPhoneno) {
      if (phoneId !== "") clearInterval(phoneId);
      const res = await phoneNumberVarify({ phoneno });
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (_id) return <Navigate to={"/"} />;
  return (
    <div className="h-fit relative">
      {/* Header */}
      <div className="fixed z-10">
        <div className=" bg-[#fff] h-16 py-10 flex justify-center items-center w-full fixed top-0 shadow-productcard">
          <Link to={"/"}>
            <img
              src={logo2}
              alt={logo2}
              className="h-16 mt-2 headerHover hover:border-black"
            />
          </Link>
        </div>
      </div>

      {(isLoading || Load1 || Load2 || Load3 || Load4) && <Loading />}

      {/* form */}
      <div className="flex flex-col h-fit min-h-screen">
        <div className="h-fit pt-24 flex justify-center items-center pb-5 flex-grow">
          <div className="bg-[#ffffff] w-[98%] phoneLarge:w-[350px] p-5 border-[1.5px] border-[rgb(75 85 99 1)] rounded-md">
            {/* form head */}
            <div className="text-3xl mb-5 ">
              <p>Create Account</p>
            </div>

            {/* form tag */}
            <form onSubmit={submitHandler}>
              {/* name field */}
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="username" className="text-sm font-semibold">
                  Your name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-full h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox"
                  placeholder="First and last name"
                  minLength={6}
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {username && (
                  <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                    {validUsername ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    {validUsername
                      ? "Full name is valid."
                      : "Invalid full name."}
                  </p>
                )}
              </div>

              {/* email field */}
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full h-8 border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox"
                    placeholder="sample@gmail.com"
                    value={email}
                    required
                    readOnly={emailVarified || !emailReq}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {!emailVarified ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "#ffdf00",
                        color: "ButtonText",
                        fontWeight: "normal",
                        zIndex: 1,
                      }}
                      onClick={OTPemail}
                      disabled={!emailReq}
                    >
                      {" "}
                      {emailReq ? "otp" : emailTime}
                    </Button>
                  ) : (
                    <div className="text-green-600 capitalize">verified</div>
                  )}
                </div>
                {email && (
                  <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                    {validEmail ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    {validEmail ? "Email is valid." : "Invalid email."}
                  </p>
                )}

                {/* emailOTP */}
                {!emailReq && !emailVarified && (
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
                        value={emailOTP}
                        required
                        onChange={(e) => {
                          setEmailOTP(e.target.value);
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
                        onClick={otpVarifyHandler}
                      >
                        {" "}
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* phone field */}
              {emailVarified && (
                <div className="flex flex-col gap-1 mb-5">
                  <label htmlFor="phoneno" className="text-sm font-semibold">
                    Mobile number
                  </label>
                  <div className="flex gap-3">
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
              )}

              {/* password field */}
              <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
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
                {password && (
                  <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                    {ValidPassword === "Very Strong" ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    {ValidPassword}
                  </p>
                )}
              </div>

              {/* form bottom  */}
              <div className="text-sm font-medium text-[#2b2b2b] mb-5 flex items-center">
                <p>
                  To verify your email and number, we will send you a text
                  message with a temporary code. Message and data rates may
                  apply.
                </p>
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
                  signup
                </Button>
              </div>

              <div className="flex text-sm font-medium gap-1 mb-7 mt-5">
                <p>Already have an account?</p>
                <p className="text-blue-500 cursor-pointer hover:text-red-500">
                  <Link to={"/signin"}>SignIn</Link>
                </p>
              </div>

              <div className="text-xs font-medium">
                <p>
                  By creating an account or logging in, you agree to Amazon's
                  <b className="text-blue-500 cursor-pointer hover:text-red-500 font-medium">
                    Conditions of Use{" "}
                  </b>
                  and
                  <b className="text-blue-500 cursor-pointer hover:text-red-500 font-medium">
                    Privacy Policy
                  </b>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* footer */}
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
