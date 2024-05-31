import React, { useEffect } from "react";
import UserNameUpdateComponent from "../../Components/UserAccount/UserNameUpdateComponent";

const UserNameUpdate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <UserNameUpdateComponent />
    </div>
  );
};

export default UserNameUpdate;
