import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noProduct } from "../../assets/imagePath";
import { filterProduct } from "../../Redux/Reducers/ProductFilterSlice";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Slider from "@mui/material/Slider";
import { UseDebounce } from "../../Features/Debouncing";

const GetAllProductWithFilterComponent = () => {
  const { products, totalPages } = useSelector(
    (State) => State.ProductStoreSlice
  );
  const { categoryProduct, currentPage, price } = useSelector(
    (State) => State.ProductFilterSlice
  );
  const [show, setShow] = useState(false);
  const [rangeValue, setRangeValue] = useState(100000);
  const debounce = UseDebounce(rangeValue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      filterProduct({ categoryProduct: "All", currentPage: 1, price: price })
    );
  }, []);

  useEffect(() => {
    dispatch(
      filterProduct({
        categoryProduct: categoryProduct,
        currentPage: 1,
        price: debounce,
      })
    );
  }, [debounce]);

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 phoneLarge:grid-cols-3 tabletMedium:grid-cols-4 laptopmin:grid-cols-5 gap-5 mx-5 mb-2">
          {products.map((producte) => (
            <Link
              key={producte._id}
              to={`/product/${producte._id}`}
              onClick={() => {
                dispatch(
                  filterProduct({ categoryProduct: producte.productCategories })
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
        <div className="flex gap-5 justify-center items-center">
          <Button
            variant="contained"
            size="small"
            startIcon={<ChevronLeftIcon />}
            disabled={currentPage === 1}
            onClick={() => {
              dispatch(
                filterProduct({
                  categoryProduct: categoryProduct,
                  currentPage: currentPage - 1,
                  price: price,
                })
              );
              window.scrollTo(0, 0);
            }}
          >
            Prev
          </Button>
          <span> {`${currentPage} of ${totalPages}`}</span>
          <Button
            variant="contained"
            size="small"
            endIcon={<ChevronRightIcon />}
            disabled={currentPage === totalPages}
            onClick={() => {
              dispatch(
                filterProduct({
                  categoryProduct: categoryProduct,
                  currentPage: currentPage + 1,
                  price: price,
                })
              );
              window.scrollTo(0, 0);
            }}
          >
            Next
          </Button>
        </div>
      )}
      <div
        className="cursor-pointer fixed top-[145px] left-4 phoneLarge:top-[100px] bg-[#fff] shadow-admin rounded-lg flex flex-col items-center z-10 w-52"
        onMouseOver={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        <div className="flex items-center">
          <span className="font-header uppercase">Filters</span>
          <FilterAltIcon fontSize="small" color="info" />
        </div>
        {show && (
          <div className="w-52 px-3 pb-5">
            <form>
              <div className="flex flex-col">
                <label htmlFor="price" className="">
                  price
                </label>
                <div className="flex gap-2">
                  <Slider
                    size="small"
                    value={rangeValue}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={999}
                    max={100000}
                    onChange={(e) => {
                      setRangeValue(e.target.value);
                    }}
                  />
                  <span>{rangeValue}</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="cursor-pointer fixed top-[133px] left-0 phoneLarge:top-[88px] bg-[#1f2937] shadow-admin rounded-lg flex flex-col items-center w-60 h-11"></div>
    </div>
  );
};

export default GetAllProductWithFilterComponent;
