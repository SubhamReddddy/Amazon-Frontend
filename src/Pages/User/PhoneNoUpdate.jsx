import React, { useEffect } from "react";
import PhoneNoUpdateComponent from "../../Components/UserAccount/PhoneNoUpdateComponent";

const PhoneNoUpdate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <PhoneNoUpdateComponent />
    </div>
  );
};

export default PhoneNoUpdate;
