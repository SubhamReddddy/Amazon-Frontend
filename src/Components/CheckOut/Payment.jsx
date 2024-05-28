import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { usePaymentMutMutation } from "../../Redux/Api/UserApi";
import Loading from "../Loader/Loading";
import toast from "react-hot-toast";
const Payment = () => {
  const { cart } = useSelector((State) => State.CartSlice);
  const { address } = useSelector((State) => State.AddressSlice);
  const data = { cart, address };
  const [paymentMut, { isLoading }] = usePaymentMutMutation();
  const [load, setLoading] = useState(false);

  const makePayment = async () => {
    try {
      setLoading(true);
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

      const res = await paymentMut({ data });
      if (res.data) {
        localStorage.setItem("paymentID", res.data.id);
        stripe.redirectToCheckout({ sessionId: res.data.id });
      } else if (res.error) {
        toast.error(res.error.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="mt-10 flex justify-center">
      {isLoading && <Loading />}
      <Button
        onClick={makePayment}
        variant="contained"
        size="small"
        style={{
          backgroundColor: "#ffdf00",
          color: "black",
          width: "16rem",
          marginRight: "10%",
        }}
        disabled={load}
      >
        proceed to pay
      </Button>
    </div>
  );
};

export default Payment;
