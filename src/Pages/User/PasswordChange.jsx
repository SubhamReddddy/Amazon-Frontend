import React, { useEffect } from "react";
import PasswordChangeComponent from "../../Components/UserAccount/PasswordChangeComponent";

const PasswordChange = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <PasswordChangeComponent />
    </div>
  );
};

export default PasswordChange;
