import React, { useEffect } from "react";
import EmailUpdateComponent from "../../Components/UserAccount/EmailUpdateComponent";

const EmailUpdate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <EmailUpdateComponent />
    </div>
  );
};

export default EmailUpdate;
