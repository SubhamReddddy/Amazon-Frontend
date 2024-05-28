import React from "react";
import SingleProduct from "../../Components/Product/SingleProduct";
import GetAllProductesByCategory from "../../Components/Product/GetAllProductesByCategory";
import Review from "../../Components/Product/Review";

const ProductDetailsPage = () => {
  return (
    <div>
      <SingleProduct />
      <GetAllProductesByCategory />
      <Review />
    </div>
  );
};

export default ProductDetailsPage;
