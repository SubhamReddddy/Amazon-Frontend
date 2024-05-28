import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  useEmailOtpMutation,
  useEmailVarifyMutation,
  useEmailUpdateMutation,
} from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import Loading from "../Loader/Loading";
import { userUpdate } from "../../Redux/Reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../Features/InputValidator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
const EmailUpdateComponent = () => {
  const { _id } = useSelector((State) => State.userSlice.user);
  const { update } = useSelector((State) => State.userSlice);
  const { email } = useSelector((State) => State.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(false);
  const [PasswordField, setPasswordField] = useState(false);
  const [emailOtp, { isLoading }] = useEmailOtpMutation();
  const [emailVarify, { isLoading: Load }] = useEmailVarifyMutation();
  const [emailUpdate, { isLoading: Load1 }] = useEmailUpdateMutation();
  const [newEmail, setNewEmail] = useState("");
  const [emailTime, setEmailTime] = useState(15);
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
    let result = validateEmail(newEmail);
    setCorrect(result);
  }, [newEmail]);

  const sendOTP = async () => {
    if (correct) {
      if (intervalId !== "") clearInterval(intervalId);
      const res = await emailOtp({ email: newEmail });
      if (res.data) {
        setPasswordField(true);
        intervalId = setInterval(() => {
          let expiry = (
            (res.data.time - new Date(Date.now()).getTime()) /
            60000
          ).toFixed(2);
          setEmailTime(expiry);

          if (expiry <= 0) {
            clearInterval(intervalId);
            setPasswordField(false);
            setEmailTime(15);
          }
        }, 100);
      } else if (res.error) {
        toast.error(res.error.data.message);
        if (res.error.data.time) {
          setPasswordField(true);
          intervalId = setInterval(() => {
            let expiry = (
              (res.error.data.time - new Date(Date.now()).getTime()) /
              60000
            ).toFixed(2);
            setEmailTime(expiry);

            if (expiry <= 0) {
              clearInterval(intervalId);
              setPasswordField(false);
              setEmailTime(15);
            }
          }, 100);
        }
      }
    } else {
      toast.error("Please Enter Valid Email Address !");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res1 = await emailVarify({ email: newEmail, otp });
    if (res1.error) {
      toast.error(res1.error.data.message);
    } else if (res1.data) {
      const res2 = await emailUpdate({ newEmail });
      if (res2.data) {
        toast.success(res2.data.message);
        dispatch(userUpdate({ user: res2.data.user, update: false }));
        navigate("/me/account/profile");
      } else if (res2.error) {
        toast.error(res2.error.data.message);
      }
    }
  };

  return (
    <div className="bg-[#fff] flex justify-center py-10 px-5 phoneLarge:px-0">
      {(isLoading || Load || Load1) && <Loading />}
      <div className="w-[600px]">
        <h1 className="font-header text-3xl mb-5 font-medium pl-1">
          Change your email address
        </h1>
        <form
          onSubmit={submitHandler}
          className="border border-gray-300 rounded-lg"
        >
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="text-sm">
              <p>Current email address: </p>
              <p className="font-medium">{email}</p>
              <br />
              <p>
                Enter the new email address you would like to associate with
                your account below. We will send a One Time Password (OTP) to
                that address
              </p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-header font-medium"
              >
                New email address
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={newEmail}
                  readOnly={PasswordField}
                  onChange={(e) => setNewEmail(e.target.value)}
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
                  {!PasswordField ? "otp" : emailTime}
                </Button>
              </div>
              {newEmail && (
                <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
                  {correct ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <CancelIcon color="error" fontSize="small" />
                  )}
                  {correct ? "Email is valid." : "Invalid Email."}
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

export default EmailUpdateComponent;
