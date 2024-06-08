import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noProduct } from "../../assets/imagePath";
import { filterProduct } from "../../Redux/Reducers/ProductFilterSlice";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, totalPages } = useSelector(
    (State) => State.ProductStoreSlice
  );
  const { price } = useSelector((State) => State.ProductFilterSlice);
  useEffect(() => {
    dispatch(
      filterProduct({ categoryProduct: "All", currentPage: 1, price: 100000 })
    );
  }, []);
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 phoneMedium:grid-cols-2 phoneLarge:grid-cols-3 tabletMedium:grid-cols-4 laptopmin:grid-cols-5 gap-5 mx-5 mb-2">
          {products.map((producte) => (
            <Link
              key={producte._id}
              to={`/product/${producte._id}`}
              onClick={() => {
                dispatch(
                  filterProduct({
                    categoryProduct: producte.productCategories,
                    currentPage: 1,
                    price: price,
                  })
                );
              }}
            >
              <ProductCard productes={producte} />
            </Link>
          ))}
        </div>
      ) : (
        <img src={noProduct} alt="no product" />
      )}
      {totalPages > 1 && (
        <div className="mb-3 flex justify-center">
          <Link to={"/products"}>
            <Button
              variant="contained"
              size="small"
              endIcon={<KeyboardDoubleArrowRightIcon />}
            >
              See More Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
