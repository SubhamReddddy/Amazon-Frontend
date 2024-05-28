import React, { useEffect, useState } from "react";
import Payment from "../../Components/CheckOut/Payment";
import { useDispatch, useSelector } from "react-redux";
import { useDefaultAddressUpdateMutMutation } from "../../Redux/Api/UserApi";
import { addAddress } from "../../Redux/Reducers/AddressSlice";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loader/Loading";

const CheckOutPage = () => {
  const { address } = useSelector((State) => State.AddressSlice);
  const { user, payment } = useSelector((State) => State.userSlice);
  const [defaultAddressUpdateMut, { isLoading }] =
    useDefaultAddressUpdateMutMutation();
  const dispatch = useDispatch();

  const updateFunction = async (id) => {
    const selectedAddress = address.find((add) => add._id === id);
    if (selectedAddress.defaultAddress !== true) {
      const res = await defaultAddressUpdateMut({ id });
      if (res.data) {
        dispatch(addAddress({ success: true, address: res.data.address }));
      }
    }
  };

  if (!payment) return <Navigate to={"/product/cart"} />;
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      {isLoading && <Loading />}
      <div className="pt-5 pb-20 pl-[10%]">
        <h1 className="text-3xl font-header mb-5">
          Select Your Deliver Address
        </h1>
        <div className="flex flex-wrap gap-7">
          {address &&
            address.map((data, idx) => (
              <div
                key={idx}
                className="w-64 h-64 border border-gray-400 rounded-md hover:shadow-productcard p-5 flex flex-col gap-5 relative overflow-hidden cursor-pointer"
                onClick={() => {
                  updateFunction(data._id);
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="border-b border-gray-500 font-header flex justify-between h-7 items-center">
                    <h3>{`Address ${idx + 1}`}</h3>
                    <input
                      type="radio"
                      name="address"
                      className="w-4 h-4 accent-orange-600 cursor-pointer"
                      checked={data.defaultAddress}
                      onChange={() => {
                        updateFunction(data._id);
                      }}
                    />
                  </div>
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
                {data.defaultAddress && (
                  <div className="bg-orange-600 h-full w-full absolute left-0 top-0 opacity-30" />
                )}
              </div>
            ))}
        </div>
        <Payment />
      </div>
    </div>
  );
};

export default CheckOutPage;
