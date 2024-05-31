import React, { useEffect } from "react";
import UserAddreddUpdate from "../../Components/UserAccount/UserAddressUpdate";

const UpdateUserAddress = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full bg-[#ddd] overflow-hidden phoneLarge:mt-24 py-5 px-1 tabletSmall:flex justify-center">
      <UserAddreddUpdate />
    </div>
  );
};

export default UpdateUserAddress;
