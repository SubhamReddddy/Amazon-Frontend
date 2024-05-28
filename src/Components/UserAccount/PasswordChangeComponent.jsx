import React, { useEffect, useState } from "react";
import { checkPasswordStrength } from "../../Features/InputValidator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import { usePasswordUpdateMutation } from "../../Redux/Api/UserApi";
import Loading from "../Loader/Loading";
import { useNavigate } from "react-router-dom";
import { userUpdate } from "../../Redux/Reducers/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const PasswordChangeComponent = () => {
  const { _id } = useSelector((State) => State.userSlice.user);
  const { update } = useSelector((State) => State.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [confirmPasswordConfirm, setConfirmPasswordConfirm] = useState("");
  const [passwordUpdate, { isLoading }] = usePasswordUpdateMutation();

  useEffect(() => {
    if (!_id) {
      navigate("/signin");
    }
    if (!update) {
      history.go(-1);
    }
  }, []);

  useEffect(() => {
    let res = checkPasswordStrength(newPassword);
    setNewPasswordConfirm(res);
  }, [newPassword]);

  useEffect(() => {
    let res = checkPasswordStrength(confirmPassword);
    setConfirmPasswordConfirm(res);
  }, [confirmPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      confirmPasswordConfirm === "Very Strong" &&
      newPasswordConfirm === "Very Strong"
    ) {
      if (newPassword === confirmPassword) {
        const res = await passwordUpdate({ newPassword });
        if (res.data) {
          toast.success(res.data.message);
          dispatch(userUpdate({ user: res.data.user, update: false }));
          navigate("/me/account/profile");
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
  return (
    <div className="bg-[#fff] flex justify-center py-10 px-5 phoneLarge:px-0">
      {isLoading && <Loading />}
      <div className="w-[600px]">
        <h1 className="font-header text-3xl mb-5 font-medium pl-1">
          Change Your Name
        </h1>
        <form
          onSubmit={submitHandler}
          className="border border-gray-300 rounded-lg"
        >
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="text-sm">
              If you want to change the password associated with your Amazon
              customer account, you may do so below. Be sure to click the Save
              Changes button when you are done.
            </div>
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
                  className="outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
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
                  className="outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
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
            <button className="h-fit w-fit bg-yellow-400 py-0.5 px-8 rounded shadow-productcard">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeComponent;
