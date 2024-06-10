import React from "react";
import { userAccountdata } from "./data";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UserAccountDas = () => {
  const { _id } = useSelector((State) => State.userSlice.user);
  if (!_id) return <Navigate to={"/signin"} />;
  return (
    <div className="pt-5 pb-20 pl-5 phoneMedium:pl-[10%]">
      <h1 className="text-3xl font-header mb-5 ">Your Account</h1>

      <div className="flex justify-center phoneMedium:justify-start flex-wrap gap-5">
        {userAccountdata.map((data, idx) => (
          <Link
            to={`${data.link}`}
            key={idx}
            className="w-80 h-32 border border-gray-300 p-4 flex rounded-lg cursor-pointer hover:-translate-y-1 hover:shadow-productcard duration-150"
          >
            <div className="w-28 h-full flex items-center">
              <img src={data.image} alt={`${data.image}`} className="h-14" />
            </div>

            <div className="w-full h-full flex flex-col justify-center -mt-2">
              <h3 className="font-semibold">{data.header}</h3>

              <h4 className="text-sm whitespace-nowrap text-gray-600">
                {data.body}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserAccountDas;
