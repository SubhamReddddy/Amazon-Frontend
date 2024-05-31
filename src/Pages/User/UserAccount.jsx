import React, { useEffect } from "react";
import UserAccountDas from "../../Components/UserAccount/UserAccountDas";

const UserAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <UserAccountDas />
    </div>
  );
};

export default UserAccount;
