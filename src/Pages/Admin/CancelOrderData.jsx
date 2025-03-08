import React, { useEffect, useState } from "react";
import { useCancelOrderMutation } from "../../Redux/Api/AdminApi";
import Loading from "../../Components/Loader/Loading";

const CancelOrderData = () => {
  const [cancleOrderReq, { isLoading }] = useCancelOrderMutation();
  const [data, setdata] = useState("");
  const [data2, setdata2] = useState("");
  useEffect(() => {
    (async () => {
      const res = await cancleOrderReq();
      setdata(res.data.numberofOrderCancledToday);
      setdata2(res.data.numberofOrdersToday);
    })();
  }, []);
  return (
    <div>
      {isLoading && <Loading />}
      <div className="text-2xl bg-red-500 p-5 rounded-lg m-10 text-white">{`total number of orders cancelled today : ${data}`}</div>
      <div className="text-2xl bg-blue-500 p-5 rounded-lg m-10 text-white ">{`total number of orders today : ${data2}`}</div>
    </div>
  );
};

export default CancelOrderData;
