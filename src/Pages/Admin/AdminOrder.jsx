import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import Loading from "../../Components/Loader/Loading";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useGetAllOrdersAdminMutation } from "../../Redux/Api/AdminApi";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const AdminOrder = () => {
  const [getAllOrdersAdmin, { isLoading }] = useGetAllOrdersAdminMutation();
  const [orderData, setOrderData] = useState([]);
  const contentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [endingPage, setEndingPage] = useState(0);
  const [contents, setContents] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAllOrdersAdmin();
      if (res.data) {
        setData(res.data);
      } else {
        toast.error(res.error.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      let OrderItemData = [];
      data.order.map((items) => {
        items.orderItems.map((elements) => {
          OrderItemData.push({ ...elements, orderId: items._id });
        });
      });
      setOrderData(OrderItemData);
    }
  }, [data]);

  useEffect(() => {
    if (orderData.length > 0) {
      setEndingPage(Math.ceil(orderData.length / contentsPerPage));
      if (currentPage === 0) {
        setContents(
          orderData.slice(
            currentPage * contentsPerPage,
            currentPage + contentsPerPage
          )
        );
      } else if (currentPage === endingPage - 1) {
        setContents(
          orderData.slice(currentPage * contentsPerPage, orderData.length)
        );
      } else {
        setContents(
          orderData.slice(
            currentPage * contentsPerPage,
            (currentPage + 1) * contentsPerPage
          )
        );
      }
    }
  }, [orderData, currentPage]);

  const paginationFunction = (value) => {
    setCurrentPage(currentPage + value);
  };

  return (
    <div className="w-full flex bg-white relativ">
      {isLoading && <Loading />}
      <NavBar />
      {contents && (
        <div className="w-full min-h-screen p-5 flex flex-col">
          <h1 className=" text-3xl font-bold px-6 py-5 font-header ml-0 tabletSmall:ml-60 mb-5">
            Orders
          </h1>
          <div className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid-cols-[10%,30%,20%,15%,15%] place-items-center gap-3 text-xs phoneLarge:text-sm font-header font-semibold">
            <span className="whitespace-nowrap">Photo</span>
            <span className="whitespace-nowrap">Product Name</span>
            <span className="whitespace-nowrap">Order Price</span>
            <span className="whitespace-nowrap">Order Status</span>
            <span className="whitespace-nowrap">Manage</span>
          </div>
          <div className="flex-grow">
            {contents ? (
              contents.map((items, idx) => (
                <div
                  key={idx}
                  className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid-cols-[10%,30%,20%,15%,15%] place-items-center gap-3 text-xs phoneLarge:text-sm font-bottom font-medium"
                >
                  <div>
                    <img
                      src={items.images}
                      alt="product image"
                      className="w-14 min-w-14 aspect-square object-contain"
                    />
                  </div>
                  <span className="text-center">
                    {items.productName.substring(0, 30) + "..."}
                  </span>
                  <span>{items.baseAmount}</span>
                  <span
                    style={{
                      color:
                        (items.deliveryStatus === "Pending" && "red") ||
                        (items.deliveryStatus === "Processing" &&
                          "orangered") ||
                        (items.deliveryStatus === "Shipped" && "yellowgreen") ||
                        (items.deliveryStatus === "Delivered" && "green"),
                    }}
                  >
                    {items.deliveryStatus}
                  </span>
                  <Link
                    to={`/admin/orders/${items.orderId}/${items._id}`}
                    className="bg-blue-500/40 rounded-lg overflow-hidden py-1 px-2 text-blue-800"
                  >
                    Manage
                  </Link>
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
    </div>
  );
};

export default AdminOrder;
