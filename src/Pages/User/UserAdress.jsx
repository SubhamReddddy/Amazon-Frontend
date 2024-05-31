import React, { useEffect } from "react";
import UserAddressComponent from "../../Components/UserAccount/UserAddressComponent";

const UserAdress = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full phoneLarge:mt-24 py-10">
      <UserAddressComponent />
    </div>
  );
};

export default UserAdress;
