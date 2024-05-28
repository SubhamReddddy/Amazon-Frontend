import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loading from "../../Components/Loader/Loading";
import NavBar from "../../Components/Admin/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleOrdersMutMutation } from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import { useUpdateOrderAdminMutation } from "../../Redux/Api/AdminApi";
const AdminOrderManage = () => {
  const { id1, id2 } = useParams();
  const [getSingleOrdersMut, { isLoading }] = useGetSingleOrdersMutMutation();
  const [updateOrderAdmin, { isLoading: Load }] = useUpdateOrderAdminMutation();
  const [data, setData] = useState(null);
  const [processing, setProcessing] = useState("Pending");
  const [newProcessing, setNewProcessing] = useState("Pending");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getSingleOrdersMut({ id1, id2 });
      if (res.data) {
        setData(res.data);
        setProcessing(res.data.data.Item.deliveryStatus);
        setNewProcessing(res.data.data.Item.deliveryStatus);
      } else {
        toast.error(res.error.data.message);
      }
    })();
  }, [id1, id2]);

  const submitHandler = async () => {
    if (newProcessing === processing) {
      toast.error(`Order is already in ${processing}`);
    } else {
      const res = await updateOrderAdmin({ id1, id2, newProcessing });
      if (res.data) {
        toast.success(res.data.message);
        navigate("/admin/orders");
      } else {
        toast.error(res.error.data.message);
      }
    }
  };

  return (
    <div className="bg-gray-700">
      <NavBar />
      <div className="h-fit w-full bg-white/90  overflow-hidden pl-5 tabletSmall:flex justify-center">
        <div className="ml-0 pb-5 bg-[#fff] tabletSmall:ml-60 h-fit w-full overflow-hidden">
          {(isLoading || Load) && <Loading />}
          {data && (
            <div>
              {/* header */}
              <div className="pt-5 mb-5 mr-5 pl-5 flex justify-between items-center">
                <h1 className="text-3xl font-header">Order Details</h1>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#ffdf00",
                    color: "ButtonText",
                    width: "10rem",
                    height: "2.5rem",
                    fontWeight: "normal",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={submitHandler}
                >
                  Update Status
                </Button>
              </div>

              {/* main div  */}
              <div className="mx-5 border border-gray-400 rounded-lg overflow-hidden">
                {/* header */}
                <div className="flex justify-between text-sm font-bottom p-5 bg-[#ddd] border-b border-b-gray-400">
                  <div className="flex flex-col">
                    <span>ORDER #</span>
                    <span>{data.data.Item._id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="uppercase">Shipping Status</span>
                    <span className="font-medium text-base mt-2">
                      <select
                        className="h-10 p-2 rounded-md bg-transparent border-2 border-white hover:shadow-inputbox outline-none"
                        style={{
                          color:
                            (newProcessing === "Pending" && "red") ||
                            (newProcessing === "Processing" && "orangered") ||
                            (newProcessing === "Shipped" && "yellowgreen") ||
                            (newProcessing === "Delivered" && "green"),
                        }}
                        value={newProcessing}
                        onChange={(e) => {
                          setNewProcessing(e.target.value);
                        }}
                      >
                        {processing === "Pending" && (
                          <option value="Pending">Pending</option>
                        )}
                        {(processing === "Pending" ||
                          processing === "Processing") && (
                          <option value="Processing">Processing</option>
                        )}
                        {(processing === "Shipped" ||
                          processing === "Processing") && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {(processing === "Shipped" ||
                          processing === "Delivered") && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </span>
                  </div>
                </div>

                {/* product details */}
                <div className="flex flex-col tabletLarge:flex-row">
                  <div className="w-full tabletLarge:w-fit p-5 flex justify-center items-center">
                    <img
                      src={data.data.Item.images}
                      alt="product image"
                      className="w-52 min-w-52 aspect-square object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <div className="font-header">
                      {data.data.Item.productName}
                    </div>
                    <div className="text-xs">
                      {data.data.Item.productDiscription.substring(0, 200) +
                        "..."}
                    </div>
                  </div>
                </div>

                {/* shipping and price information */}
                <div className="py-5 flex flex-col gap-5 tabletLarge:grid grid-cols-[25%,20%,50%] border-t border-t-gray-400">
                  {/* shipping address */}
                  <div className="px-5 tabletLarge:px-0 tabletLarge:pl-5 text-start tabletLarge:text-center">
                    <div className="font-header font-semibold mb-2">
                      Shipping Address
                    </div>
                    <div className="flex flex-col font-bottom text-gray-600">
                      <span>
                        {data.data.shippingAddress.flatNo},
                        {data.data.shippingAddress.area},
                        {data.data.shippingAddress.landmark},
                      </span>
                      <span>
                        {data.data.shippingAddress.city},
                        {data.data.shippingAddress.state},
                      </span>
                      <span>{data.data.shippingAddress.pinCode}</span>
                    </div>
                  </div>

                  {/* payment */}
                  <div className="flex flex-col border-y border-gray-400 p-5 tabletLarge:p-0 tabletLarge:border-none text-start tabletLarge:text-center">
                    <span className="font-header font-semibold mb-2">
                      Payment Status
                    </span>
                    <span className="font-bottom text-green-600">Paid</span>
                  </div>

                  {/* order summary */}
                  <div className="flex flex-col px-5 tabletLarge:px-0 tabletLarge:pr-5 ">
                    <span className="font-header font-semibold mb-2">
                      Order Summary
                    </span>
                    <div className="font-bottom text-gray-600">
                      <div className="flex justify-between">
                        <span>{`Item(${data.data.Item.quantity}) Subtotal:`}</span>
                        <span>₹{data.data.Item.baseAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>₹0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax(28%)</span>
                        <span>
                          ₹{((data.data.Item.baseAmount / 100) * 28).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span>
                          ₹
                          {(
                            data.data.Item.baseAmount +
                            (data.data.Item.baseAmount / 100) * 28
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Grand Total:</span>
                      <span>
                        ₹
                        {(
                          data.data.Item.baseAmount +
                          (data.data.Item.baseAmount / 100) * 28
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManage;
