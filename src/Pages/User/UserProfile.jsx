import React, { useEffect } from "react";
import ProfileComponent from "../../Components/UserAccount/ProfileComponent";

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <ProfileComponent />
    </div>
  );
};

export default UserProfile;
