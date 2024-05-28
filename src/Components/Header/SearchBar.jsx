import React, { useEffect, useState } from "react";
import { allCategories } from "./list";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useGetAllProductAdminFilteredMutation } from "../../Redux/Api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { ProductStore } from "../../Redux/Reducers/ProductStoreSlice";
import Loading from "../Loader/Loading";
import { filterProduct } from "../../Redux/Reducers/ProductFilterSlice";
import { UseDebounce } from "../../Features/Debouncing";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(false);
  const { categoryProduct, currentPage, price } = useSelector(
    (State) => State.ProductFilterSlice
  );
  const [search, setSearch] = useState("");
  const debounce = UseDebounce(search);
  const [getAllProductAdminFiltered, { isLoading }] =
    useGetAllProductAdminFilteredMutation();
  useEffect(() => {
    (async () => {
      const res = await getAllProductAdminFiltered({
        categoryProduct,
        search: debounce,
        currentPage,
        price,
      });
      if (res.data) {
        dispatch(
          ProductStore({
            products: res.data.product,
            totalPages: res.data.totalPages,
          })
        );
      }
    })();
  }, [categoryProduct, currentPage, price, debounce]);

  return (
    <div className="min-w-[90%] top-16 phoneLarge:top-0 phoneLarge:min-w-44 tabletLarge:w-[40%] h-10 flex rounded-md overflow-hidden border border-gray-600 mx-1 phoneSmall:absolute phoneLarge:static hover:shadow-searchbar">
      {isLoading && <Loading />}
      <div
        className="bg-gray-300 text-gray-700 w-fit min-w-12 flex justify-center items-center border-r border-gray-600 text-[11px] font-semibold z-20 cursor-pointer px-5"
        onClick={() => {
          setCategory(!category);
        }}
      >
        <span className="whitespace-nowrap pl-2">{categoryProduct}</span>
        <ArrowDropDownOutlinedIcon fontSize="small" />
      </div>
      <input
        type="search"
        className="flex-grow w-fit min-w-20 outline-none border-none font-header text-gray-700 px-5"
        placeholder="Search Amazon.in"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="bg-[#f0c14b] text-gray-800 min-w-12 flex justify-center items-center font-extrabold cursor-pointer">
        <SearchSharpIcon fontSize="large" />
      </div>
      {/* searchbar list */}
      {category && (
        <div className="bg-white h-56 w-48 fixed border border-gray-400 rounded z-30 top-24 phoneLarge:top-12 left-10 phoneLarge:left-auto text-gray-800 overflow-y-scroll font-header text-sm">
          {allCategories.map((item, idx) => (
            <div
              className="hover:bg-blue-500 hover:text-white pl-2 delay-50 cursor-pointer"
              key={idx}
              onClick={() => {
                dispatch(
                  filterProduct({
                    categoryProduct: item,
                    currentPage: 1,
                    price,
                  })
                );
                setCategory(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {/* transparent div */}
      {category && (
        <div
          className="bg-transparent fixed w-screen h-screen left-0 top-0 z-10 cursor-pointer"
          onClick={() => {
            setCategory(!category);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
