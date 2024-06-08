import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../../Components/Loader/Loading";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {
  useDeleteProductMutation,
  useGetAllProductAdminMutation,
} from "../../Redux/Api/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { renderUpdate } from "../../Redux/Reducers/RenderSlice";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const AdminProductPage = () => {
  const { render } = useSelector((State) => State.RenderSlice);
  const [getAllProductAdmin, { isLoading }] = useGetAllProductAdminMutation();
  const [deleteProduct, { isLoading: Load }] = useDeleteProductMutation();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  // pagination part
  const contentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [endingPage, setEndingPage] = useState(0);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    if (render) {
      if (render === true) {
        dispatch(renderUpdate({ render: false }));
      }
    }
    (async () => {
      const res = await getAllProductAdmin();
      if (res.data) {
        setData(res.data);
      } else {
        toast.error(res.error.data.message);
        setData(null);
      }
    })();
  }, [render]);

  useEffect(() => {
    if (data) {
      setEndingPage(Math.ceil(data.products.length / contentsPerPage));
      if (currentPage === 0) {
        setContents(
          data.products.slice(
            currentPage * contentsPerPage,
            currentPage + contentsPerPage
          )
        );
      } else if (currentPage === endingPage - 1) {
        setContents(
          data.products.slice(
            currentPage * contentsPerPage,
            data.products.length
          )
        );
        // console.log(currentPage * 10 + 1);
        // console.log(data.products.length);
      } else {
        setContents(
          data.products.slice(
            currentPage * contentsPerPage,
            (currentPage + 1) * contentsPerPage
          )
        );
      }
    } else {
      setContents(null);
    }
  }, [data, currentPage]);

  const paginationFunction = (value) => {
    setCurrentPage(currentPage + value);
  };

  const deleteProductFunction = async (_id) => {
    const res = await deleteProduct(_id);
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(renderUpdate({ render: true }));
    } else {
      toast.error(res.data.message);
      dispatch(renderUpdate({ render: true }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex bg-white relativ">
      {(isLoading || Load) && <Loading />}
      <NavBar />
      {contents && (
        <div className="w-full min-h-screen p-5 flex flex-col ">
          <h1 className=" text-3xl font-bold px-6 py-5 font-header ml-0 tabletSmall:ml-60 mb-5">
            Products
          </h1>
          <div className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid-cols-[10%,50%,20%,20%] phoneMedium:grid-cols-[10%,30%,10%,10%,15%,15%] place-items-center gap-3 text-xs phoneLarge:text-sm font-header font-semibold place-items-center">
            <span>Photo</span>
            <span>Name</span>
            <span>Price</span>
            <span>Stock</span>
            <span className="hidden phoneMedium:block">Manage</span>
            <span className="hidden phoneMedium:block">Delete</span>
          </div>
          <div className="flex-grow">
            {contents ? (
              contents.map((items, idx) => (
                <div
                  key={idx}
                  className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid-cols-[10%,50%,20%,20%] phoneMedium:grid-cols-[10%,30%,10%,10%,15%,15%] place-items-center gap-3 text-xs phoneLarge:text-sm font-bottom font-medium"
                >
                  <div className="flex flex-grow">
                    <img
                      src={items.images[0].url}
                      alt="product image"
                      className="w-14 min-w-14 aspect-square object-contain"
                    />
                  </div>
                  <span className="text-center">
                    {items.productName.substring(0, 30) + "..."}
                  </span>
                  <span>{items.productPrice}</span>
                  <span>{items.productStock}</span>
                  <span className="block phoneMedium:hidden"></span>
                  <span className="block phoneMedium:hidden"></span>
                  <Link
                    to={`/admin/products/${items._id}`}
                    className="bg-blue-500/40 rounded-lg overflow-hidden py-1 px-2 text-blue-800"
                  >
                    Manage
                  </Link>
                  <button
                    onClick={() => {
                      deleteProductFunction(items._id);
                    }}
                    className="bg-red-500/50 rounded-lg overflow-hidden py-1 px-2 text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>

          <div className="ml-0 tabletSmall:ml-60 flex gap-5 justify-center items-center">
            <Button
              variant="contained"
              size="small"
              startIcon={<ChevronLeftIcon />}
              disabled={currentPage === 0}
              onClick={() => {
                paginationFunction(-1);
              }}
            >
              Prev
            </Button>
            <span> {`${currentPage + 1} of ${endingPage}`}</span>
            <Button
              variant="contained"
              size="small"
              endIcon={<ChevronRightIcon />}
              disabled={endingPage - 1 === currentPage || endingPage === 0}
              onClick={() => {
                paginationFunction(1);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <Link to={"/admin/product/add"} className="absolute right-10 top-10">
        <AddCircleIcon fontSize="large" style={{ color: "#22c55e80" }} />
      </Link>
    </div>
  );
};

export default AdminProductPage;
