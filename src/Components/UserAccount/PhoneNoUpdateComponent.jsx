import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  usePhoneNumberVarifyMutation,
  usePhoneNumberOtpVarifyMutation,
  usePhoneUpdateMutation,
} from "../../Redux/Api/UserApi";
import { checkPhoneno } from "../../Features/InputValidator";
import toast from "react-hot-toast";
import Loading from "../Loader/Loading";
import { userUpdate } from "../../Redux/Reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
const PhoneNoUpdateComponent = () => {
  const { phoneno } = useSelector((State) => State.userSlice.user);
  const { _id } = useSelector((State) => State.userSlice.user);
  const { update } = useSelector((State) => State.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(false);
  const [PasswordField, setPasswordField] = useState(false);
  const [phoneNumberVarify, { isLoading }] = usePhoneNumberVarifyMutation();
  const [phoneNumberOtpVarify, { isLoading: Load }] =
    usePhoneNumberOtpVarifyMutation();
  const [phoneUpdate, { isLoading: Load1 }] = usePhoneUpdateMutation();
  const [NewPhoneNumber, setNewPhoneNumber] = useState("");
  const [PhoneTime, setPhoneTime] = useState(15);
  let intervalId = "";
  const [otp, setotp] = useState("");

  useEffect(() => {
    if (!_id) {
      navigate("/signin");
    }
    if (!update) {
      history.go(-1);
    }
  }, []);

  useEffect(() => {
    let result = checkPhoneno(NewPhoneNumber);
    setCorrect(result);
  }, [NewPhoneNumber]);

  const sendOTP = async () => {
    if (correct) {
      if (intervalId !== "") clearInterval(intervalId);
      const res = await phoneNumberVarify({ phoneno: NewPhoneNumber });
      if (res.data) {
        if (res.data.message === "Please try after some time!") {
          toast.error(res.data.message);
        } else {
          setPasswordField(true);
          intervalId = setInterval(() => {
            let expiry = (
              (res.data.time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setPhoneTime(expiry);

            if (expiry <= 0) {
              clearInterval(intervalId);
              setPasswordField(false);
              setPhoneTime(15);
            }
          }, 100);
        }
      } else if (res.error) {
        toast.error(res.error.data.message);
        if (res.error.data.time) {
          setPasswordField(true);
          intervalId = setInterval(() => {
            let expiry = (
              (res.error.data.time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setPhoneTime(expiry);

            if (expiry <= 0) {
              clearInterval(intervalId);
              setPasswordField(false);
              setPhoneTime(15);
            }
          }, 100);
        }
      }
    } else {
      toast.error("Please Enter Valid Phone Number !");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res1 = await phoneNumberOtpVarify({ phoneno: NewPhoneNumber, otp });
    if (res1.error) {
      toast.error(res1.error.data.message + "noob");
    } else if (res1.data) {
      const res2 = await phoneUpdate({ NewPhoneNumber });
      if (res2.data) {
        toast.success(res2.data.message);
        dispatch(userUpdate({ user: res2.data.user, update: false }));
        navigate("/me/account/profile");
      } else if (res2.error) {
        toast.error(res2.error.data.message + "pro");
      }
    }
  };

  return (
    <div className="bg-[#fff] flex justify-center py-10 px-5 phoneLarge:px-0">
      {(isLoading || Load || Load1) && <Loading />}
      <div className="w-[600px]">
        <h1 className="font-header text-3xl mb-5 font-medium pl-1">
          Change Your Phone Number
        </h1>
        <form
          onSubmit={submitHandler}
          className="border border-gray-300 rounded-lg"
        >
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="text-sm">
              <p>Current Phone Number : </p>
              <p className="font-medium">{phoneno}</p>
              <br />
              <p>
                Enter the new phone number you would like to associate with your
                account below. We will send a One Time Password (OTP) to that
                address
              </p>
            </div>
            <div>
              <label
                htmlFor="phoneno"
                className="text-sm font-header font-medium"
              >
                New Phone Number
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength={10}
                  value={NewPhoneNumber}
                  readOnly={PasswordField}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
                />
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#ffdf00",
                    color: "ButtonText",
                    fontWeight: "normal",
                  }}
                  onClick={sendOTP}
                  disabled={PasswordField}
                >
                  {!PasswordField ? "otp" : PhoneTime}
                </Button>
              </div>
              {NewPhoneNumber && (
                <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                  {correct ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <CancelIcon color="error" fontSize="small" />
                  )}
                  {correct ? "Phone number is valid." : "Invalid phone number."}
                </p>
              )}
              {PasswordField && (
                <div>
                  <label
                    htmlFor="otp"
                    className="text-sm font-header font-medium"
                  >
                    One Time Password
                  </label>
                  <div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
                      className="outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox tracking-[1.1rem] text-center"
                    />
                  </div>
                </div>
              )}
            </div>
            {PasswordField && (
              <Button
                type="submit"
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#ffdf00",
                  color: "ButtonText",
                  fontWeight: "normal",
                  width: "11rem",
                }}
              >
                continue
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneNoUpdateComponent;
