import React, { useEffect, useState } from "react";
import {
  useGetUserDetailsMutMutation,
  useNameUpdateMutation,
} from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../Redux/Reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loading";

const UserNameUpdateComponent = () => {
  const { _id } = useSelector((State) => State.userSlice.user);
  const { user } = useSelector((State) => State.userSlice);
  const { update } = useSelector((State) => State.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getUserDetailsMut, { isLoading: Load }] =
    useGetUserDetailsMutMutation();
  const [nameUpdate, { isLoading }] = useNameUpdateMutation();
  const [name, setName] = useState("");
  useEffect(() => {
    if (!_id) {
      navigate("/signin");
    }
    if (!update) {
      history.go(-1);
    }
    const getData = async () => {
      const res = await getUserDetailsMut();
      setName(res.data.user.username);
    };
    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await nameUpdate({ name });
    if (res.data) {
      toast.success(res.data.message);
      dispatch(userUpdate({ user: res.data.user, update: false }));
      navigate("/me/account/profile");
    } else if (res.error) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <div className="bg-[#fff] flex justify-center py-10 px-5 phoneLarge:px-0">
      {(isLoading || Load) && <Loading />}
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
              If you want to change the name associated with your Amazon
              customer account, you may do so below. Be sure to click the Save
              Changes button when you are done.
            </div>
            <div>
              <label htmlFor="name" className="text-sm font-header font-medium">
                Name
              </label>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="outline-none border border-gray-400 rounded px-2 text-sm py-1 focus:shadow-inputbox"
                />
              </div>
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

export default UserNameUpdateComponent;
