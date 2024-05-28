import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteAddressMutation } from "../../Redux/Api/UserApi";
import Loading from "../Loader/Loading";
import { Link, Navigate } from "react-router-dom";
import { addAddress } from "../../Redux/Reducers/AddressSlice";
const UserAddressComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((State) => State.userSlice);
  const { _id } = useSelector((State) => State.userSlice.user);
  const [useraddresses, setUseraddresses] = useState([]);
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const AddressDelete = async (id) => {
    const { data } = await deleteAddress(id);
    dispatch(addAddress({ success: true, address: data.address }));
    setUseraddresses(data.address);
    toast.success(data.message);
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/me/address`,
          {
            withCredentials: true,
          }
        );
        dispatch(addAddress({ success: true, address: data.address }));
        setUseraddresses(data.address);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getAddress();
  }, []);
  if (!_id) return <Navigate to={"/signin"} />;
  return (
    <div className="h-full w-full bg-[#fff] pl-[10%]">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-3xl font-header mb-5">Your Addresses</h1>
          <div className="flex flex-wrap gap-7">
            <Link
              to={"/me/account/address/add"}
              className="w-72 h-72 border-2 border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer"
            >
              <div className="flex flex-col items-center gap-1">
                <AddLocationIcon
                  color="disabled"
                  style={{ fontSize: "50px" }}
                />
                <p className="text-xl font-bold text-gray-500">Add address</p>
              </div>
            </Link>

            {useraddresses &&
              user._id &&
              useraddresses.map((data, idx) => (
                <div
                  key={idx}
                  className="w-72 h-72 border border-gray-400 rounded-md hover:shadow-productcard p-5 flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="border-b border-gray-500 font-header">{`Address ${
                      idx + 1
                    }`}</h3>
                    <p className="text-sm font-header font-semibold capitalize">
                      {user.username}
                    </p>
                    <p className="font-bottom">{data.flatNo}</p>
                    <p className="text-sm font-bottom capitalize">
                      {`${data.area}`.substring(0, 10) + "..."}
                      {`,${data.landmark}`.substring(0, 10) + "..."}
                      {`,${data.city}`}
                    </p>
                    <p className="text-sm font-bottom uppercase">{`${data.city},${data.state} ${data.pinCode}`}</p>
                    <p className="capitalize">{data.country}</p>
                    <p>{`Phone number: ${user.phoneno}`}</p>
                  </div>

                  <div className="flex text-sm gap-2 font-semibold items-center text-blue-800">
                    <Link
                      to={`/me/account/address/update/${data._id}`}
                      className="cursor-pointer hover:text-red-700 duration-150 hover:underline underline-offset-4"
                    >
                      Edit
                    </Link>
                    <p>|</p>
                    <p
                      className="cursor-pointer hover:text-red-700 duration-150 hover:underline underline-offset-4"
                      onClick={() => {
                        AddressDelete(data._id);
                      }}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddressComponent;
