import React, { useEffect } from "react";
import UserAddressAddComponent from "../../Components/UserAccount/UserAddressAddComponent";

const AddUserAddress = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full bg-[#ddd] overflow-hidden phoneLarge:mt-24 py-5 px-1 tabletSmall:flex justify-center">
      <UserAddressAddComponent />
    </div>
  );
};

export default AddUserAddress;
