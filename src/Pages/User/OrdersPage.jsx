import React, { useEffect } from "react";
import { useGetAllOrdersQuery } from "../../Redux/Api/UserApi";
import Loading from "../../Components/Loader/Loading";
import { emptyOrder } from "../../assets/imagePath";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { data, isLoading } = useGetAllOrdersQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      {isLoading && <Loading />}
      {data ? (
        data.orders.length > 0 ? (
          <div>
            <div className="pt-5 pl-[10%]">
              <h1 className="text-3xl font-header mb-5">Your Orders</h1>
            </div>
            <div className="flex flex-col-reverse gap-5">
              {data.orders.map((items, idx) =>
                items.orderItems.map((elements, idx) => (
                  <Link
                    to={`/me/account/orders/${items._id}/${elements._id}`}
                    key={idx}
                    className="border border-gray-400 rounded-md mx-[10%] overflow-hidden"
                  >
                    <div className="flex justify-between items-center text-sm font-bottom bg-[#ddd] px-5 py-2 text-gray-800 border-b border-b-gray-400">
                      <span className="flex flex-col">
                        <span className="text-xs">ORDER #</span>
                        <span>{elements._id}</span>
                      </span>
                    </div>

                    <div className="flex flex-col phoneLarge:flex-row">
                      <div className="w-full phoneLarge:w-fit p-5 flex justify-center items-center">
                        <img
                          src={elements.images}
                          alt="product image"
                          className="w-40 min-w-40 aspect-square object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-5">
                        <div className="font-header">
                          {elements.productName}
                        </div>
                        <div className="text-xs">
                          {elements.productDiscription.substring(0, 200) +
                            "..."}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={emptyOrder} alt="NOT ORDERED YET" />
            <p className="text-5xl text-red-500 font-semibold absolute top-5 right-5">
              NO ORDERS
            </p>
          </div>
        )
      ) : (
        <div className="relative">
          <img src={emptyOrder} alt="NOT ORDERED YET" />
          <p className="text-5xl text-red-500 font-semibold absolute top-5 right-5">
            NO ORDERS
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
