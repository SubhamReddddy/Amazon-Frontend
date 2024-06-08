import React, { useEffect, useState } from "react";
import {
  useAvtarUpdateMutation,
  useGetUserDetailsMutMutation,
  useUserLoginMutation,
} from "../../Redux/Api/UserApi";
import { avatar } from "../../assets/imagePath";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, userUpdate } from "../../Redux/Reducers/UserSlice";
import Loading from "../Loader/Loading";

const ProfileComponent = () => {
  const { _id } = useSelector((State) => State.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getUserDetailsMut, { isLoading: Load }] =
    useGetUserDetailsMutMutation();
  const [user, setUser] = useState({});
  const [passwordField, setPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [path, setPath] = useState("");
  const [avtar, setAvtar] = useState("");
  const [newAvtar, setNewAvtar] = useState("");
  const [saveButton, setSaveButton] = useState(true);
  const [AvtarUpdate, { isLoading: Load2 }] = useAvtarUpdateMutation();

  useEffect(() => {
    const getDetails = async () => {
      const res = await getUserDetailsMut();
      setUser(res.data.user);
      setAvtar(res.data.user.avtar.url);
      setNewAvtar(res.data.user.avtar.url);
    };
    getDetails();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await userLogin({ phoneno: user.phoneno, password });
    if (res.error) {
      if (res.error.data.message === "Wrong phone number or password!") {
        toast.error("Invalid Password!");
      } else {
        toast.error(res.error.data.message);
      }
    } else if (res.data) {
      dispatch(userUpdate({ user, update: true }));
      navigate(path);
    }
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewAvtar(reader.result);
      setSaveButton(false);
    };
    reader.readAsDataURL(file);
  };

  const savebuttonfunction = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("avtar", newAvtar);
    const res = await AvtarUpdate(form);
    if (res.data) {
      toast.success(res.data.message);
      setSaveButton(true);
      dispatch(getUserDetails(res.data.user));
    } else {
      toast.error(res.error.data.message);
    }
  };
  if (!_id) return <Navigate to={"/signin"} />;
  return (
    <div className="bg-[#fff] flex justify-center py-10 px-5 phoneLarge:px-0">
      <div className="w-80 phoneMedium:w-[600px]">
        <h1 className="font-header text-3xl mb-5 font-medium pl-1">
          Login and Security
        </h1>
        {user.username && (
          <div className="border border-gray-300 rounded-lg text">
            <div className="flex flex-col items-center gap-5 px-6 py-3 border-b border-gray-300">
              <div className="h-36 w-36 rounded-full flex justify-center items-center overflow-hidden">
                <img src={newAvtar} alt="profile" className="h-full" />
              </div>

              <div className="flex w-full gap-5">
                <label
                  htmlFor="userAvatar"
                  className="h-fit border flex-grow border-gray-300 py-0.5 rounded shadow-productcard text-center cursor-pointer"
                >
                  Edit
                </label>

                {!saveButton && (
                  <button
                    className="h-fit bg-green-500/20 text-green-700 border border-gray-300 py-0.5 rounded  shadow-productcard text-center cursor-pointer w-20"
                    onClick={(e) => {
                      savebuttonfunction(e);
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <input
                type="file"
                name="userAvatar"
                id="userAvatar"
                className="hidden"
                onChange={(e) => {
                  imageChange(e);
                }}
              />
            </div>

            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-header font-medium"
                >
                  Name
                </label>
                <p className="text-sm phoneLarge:text-base">{user.username}</p>
              </div>
              <button
                onClick={() => {
                  setPasswordField(true);
                  setPath("/me/account/profile/update/name");
                }}
                className="h-fit border border-gray-300 py-0.5 px-5 rounded shadow-productcard"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300 gap-5">
              <div>
                <label
                  htmlFor="Email"
                  className="text-sm font-header font-medium"
                >
                  Email
                </label>
                <p className="text-sm phoneLarge:text-base">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  setPasswordField(true);
                  setPath("/me/account/profile/update/email");
                }}
                className="h-fit border border-gray-300 py-0.5 px-5 rounded shadow-productcard"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-header font-medium"
                >
                  Phone
                </label>
                <p className="text-sm phoneLarge:text-base">{user.phoneno}</p>
              </div>
              <button
                onClick={() => {
                  setPasswordField(true);
                  setPath("/me/account/profile/update/phone");
                }}
                className="h-fit border border-gray-300 py-0.5 px-5 rounded shadow-productcard"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center px-6 py-3">
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-header font-medium"
                >
                  Password
                </label>
                <p className="text-sm phoneLarge:text-base">********</p>
              </div>
              <button
                onClick={() => {
                  setPasswordField(true);
                  setPath("/me/account/profile/update/password");
                }}
                className="h-fit border border-gray-300 py-0.5 px-5 rounded shadow-productcard"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {passwordField && (
        <div>
          <div className="w-full h-screen bg-gray-900 opacity-80 fixed top-0 left-0 z-50"></div>

          <div className="w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
            <form
              onSubmit={submitHandler}
              className="w-96 h-fit bg-white rounded-lg border border-gray-400 overflow-hidden"
            >
              <h1 className="text-xl font-header p-5 font-medium border-b border-gray-400 ">
                Varify
              </h1>

              <div className="flex gap-5 p-5 items-center">
                <div className="h-20 w-20 rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src={user.avatar || avatar}
                    alt="profile"
                    className="h-full"
                  />
                </div>

                <div className="font-header text-sm font-medium">
                  <p>{user.username}</p>
                  <p>{user.phoneno}</p>
                </div>
              </div>

              <div className="px-5 pb-5 font-header text-sm font-medium">
                <label htmlFor="password">Password</label>
                <div>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    className="border border-gray-400 outline-none focus:shadow-inputbox rounded p-1"
                  />
                </div>
              </div>

              <div className="px-5 pb-5 flex gap-5">
                <button className="bg-yellow-400 px-10 py-1 rounded shadow-productcard">
                  Proceed
                </button>
                <button
                  onClick={() => {
                    setPasswordField(false);
                  }}
                  className="bg-[#ccc] px-10 py-1 rounded shadow-productcard"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {(isLoading || Load || Load2) && <Loading />}
    </div>
  );
};

export default ProfileComponent;
