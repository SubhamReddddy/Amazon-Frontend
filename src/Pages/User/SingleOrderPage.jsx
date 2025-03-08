import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCancleOrderReqMutation,
  useGetSingleOrdersQuery,
} from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import Loading from "../../Components/Loader/Loading";

const SingleOrderPage = () => {
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
  const { data, error, isLoading } = useGetSingleOrdersQuery({ id1, id2 });
  const [cancleOrderReq, { isLoading: Load }] = useCancleOrderReqMutation();
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      {(isLoading || Load) && <Loading />}
      {data && (
        <div>
          {/* header */}
          <div className="pt-5 pl-[10%] flex justify-between mb-10">
            <h1 className="text-3xl font-header mb-5">Order Details</h1>
            {data.data.Item.deliveryStatus !== "Cancelled" && (
              <button
                className="bg-red-500 text-white px-5 border rounded text-xl mr-36"
                onClick={async () => {
                  const res = await cancleOrderReq({ id1, id2 });
                  if (res.data) {
                    toast.success(res.data.message);
                    navigate("/me/account/orders");
                  } else {
                    toast.error(res.error.data.message);
                    navigate("/me/account/orders");
                  }
                }}
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* main div  */}
          <div className="mx-[10%] border border-gray-400 rounded-lg overflow-hidden">
            {/* header */}
            <div className="flex flex-col gap-2 phoneLarge:flex-row phoneLarge:gap-0 justify-between text-sm font-bottom p-5 bg-[#ddd] border-b border-b-gray-400">
              <div className="flex flex-col">
                <span>ORDER #</span>
                <span>{data.data.Item._id}</span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase">Shipping Status</span>
                <span
                  className="font-medium text-base"
                  style={{
                    color:
                      (data.data.Item.deliveryStatus === "Pending" && "red") ||
                      (data.data.Item.deliveryStatus === "Processing" &&
                        "orangered") ||
                      (data.data.Item.deliveryStatus === "Shipped" &&
                        "yellowgreen") ||
                      (data.data.Item.deliveryStatus === "Delivered" &&
                        "green") ||
                      (data.data.Item.deliveryStatus === "Cancelled" && "red"),
                  }}
                >
                  {data.data.Item.deliveryStatus}
                </span>
              </div>
            </div>

            {/* product details */}
            <div className="flex flex-col phoneLarge:flex-row">
              <div className="w-full phoneLarge:w-fit p-5 flex justify-center items-center">
                <img
                  src={data.data.Item.images}
                  alt="product image"
                  className="w-52 min-w-52 aspect-square object-contain"
                />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <div className="font-header">{data.data.Item.productName}</div>
                <div className="text-xs">
                  {data.data.Item.productDiscription.substring(0, 200) + "..."}
                </div>
              </div>
            </div>

            {/* shipping and price information */}
            <div className="py-5 flex flex-col gap-5 tabletSmall:grid grid-cols-3 border-t border-t-gray-400">
              {/* shipping address */}
              <div className="px-5 tabletSmall:px-0 tabletSmall:pl-5">
                <span className="font-header font-medium">
                  Shipping Address
                </span>
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
              <div className="flex flex-col border-y border-gray-400 p-5 tabletSmall:p-0 tabletSmall:border-none">
                <span className="font-header font-medium">Payment Status</span>
                <span className="font-bottom text-green-600">
                  {data.data.paymentStatus}
                </span>
              </div>

              {/* order summary */}
              <div className="flex flex-col px-5 tabletSmall:px-0 tabletSmall:pr-5">
                <span className="font-header font-medium">Order Summary</span>
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
  );
};

export default SingleOrderPage;
