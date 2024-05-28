import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsByCategoryQuery } from "../../Redux/Api/ProductApi";
import Loading from "../Loader/Loading";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { SingleProductStore } from "../../Redux/Reducers/ProductSlice";
const GetAllProductesByCategory = () => {
  const { productCategories } = useSelector(
    (state) => state.ProductSlice.product
  );
  const { product } = useSelector((state) => state.ProductSlice);
  const { data, isLoading } = useGetProductsByCategoryQuery(productCategories);
  const items = data ? data.product : null;
  const { _id } = useSelector((state) => state.ProductSlice.product);
  const dispatch = useDispatch();
  const clickme = () => {
    dispatch(SingleProductStore({ product }));
  };
  return (
    <div>
      {isLoading && <Loading />}
      {items && items.length > 1 && (
        <div className="flex justify-center h-10">
          <div className="w-fit text-2xl font-semibold  bg-gradient-to-br from-purple-500 via-fuchsia-700 to-orange-500 bg-clip-text text-transparent">
            Related products
            <hr className=" w-[110%] -ml-[5%] h-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-700 to-orange-500" />
          </div>
        </div>
      )}

      {items && (
        <div className="flex py-5 gap-5 overflow-x-auto px-5">
          {items.map(
            (productes) =>
              _id !== productes._id && (
                <Link
                  to={`/product/${productes._id}`}
                  key={productes._id}
                  className="min-w-56"
                  onClick={clickme}
                >
                  <ProductCard productes={productes} />
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default GetAllProductesByCategory;
