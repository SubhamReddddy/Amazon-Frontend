import React, { useEffect } from "react";
import GetAllProductWithFilterComponent from "../../Components/Product/GetAllProductWithFilterComponent";

const AllProductWithFilter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-48 h-fit w-full overflow-hidden phoneLarge:mt-36">
      <GetAllProductWithFilterComponent />
    </div>
  );
};

export default AllProductWithFilter;
