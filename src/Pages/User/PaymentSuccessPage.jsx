import React, { useEffect, useState } from "react";
import { tick } from "../../assets/imagePath";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { usePaymentSuccessMutMutation } from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loader/Loading";
import { removeAllItems } from "../../Redux/Reducers/CartSlice";
const PaymentSuccessPage = () => {
  let id = localStorage.getItem("paymentID");
  const { user } = useSelector((State) => State.userSlice);
  const [paymentSuccessMut, { isLoading }] = usePaymentSuccessMutMutation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fun = async () => {
      const res = await paymentSuccessMut(id);
      if (res.data) {
        if (res.data.paymentStatus === "paid") {
          toast.success("Payment Successful");
          dispatch(removeAllItems());
          setShow(true);
        } else {
          toast.error("payment failed");
          setShow(false);
        }
      } else if (res.error) {
        toast.error(res.error.data.message);
        setShow(false);
      }
    };
    if (id) {
      fun();
      localStorage.removeItem("paymentID");
      id = null;
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const funFunction = () => {
    navigate("/me/account/orders");
  };
  return (
    <div className="h-screen w-full overflow-hidden bg-[#fff] flex justify-center items-center">
      {isLoading && <Loading />}
      {show ? (
        <div className="bg-[#fff] h-64 w-96 p-5 rounded-lg">
          <div className="flex justify-center mb-5">
            <img src={tick} alt="tick" className="h-20" />
          </div>
          <div>
            <p className="text-sm font-header text-center">
              Hey {user.username},
            </p>
            <p className="text-lg font-bottom font-semibold text-center">
              Your Order is Confirmed
            </p>
          </div>
          <div className="flex justify-center mt-5">
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={funFunction}
            >
              check status
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-sm font-header font-bold text-center pb-2">
            Expired link
          </h1>
          <h2 className="text-xs font-bottom text-center w-96">
            This link has expired. This means that your payment has already been
            processed or your session has expired.
          </h2>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
