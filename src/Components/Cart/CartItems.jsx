import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem, updateItem } from "../../Redux/Reducers/CartSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { emptyCart } from "../../assets/imagePath";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userUpdate } from "../../Redux/Reducers/UserSlice";
import { useGetSingleProductAdminMutation } from "../../Redux/Api/AdminApi";
import Loading from "../Loader/Loading";
import { filterProduct } from "../../Redux/Reducers/ProductFilterSlice";
const CartItems = () => {
  const { cart } = useSelector((state) => state.CartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const { address } = useSelector((State) => State.AddressSlice);
  const [getSingleProductAdmin, { isLoading }] =
    useGetSingleProductAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [quant, setQuant] = useState(0);
  const [selectOption, setSelectOption] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (cart) {
      //updateing cart items beased on database data
      cart.forEach(async (item, idx) => {
        const res = await getSingleProductAdmin(item._id);
        if (res.data) {
          const diff = res.data.product.productStock - cart[idx].quantity;
          // console.log(`product[${idx}]` + diff);
          if (diff < 0) {
            toast.error("we don't have that much stock");
            dispatch(
              updateItem({
                ...res.data.product,
                quantity: res.data.product.productStock,
              })
            );
          } else if (
            cart[idx].quantity === 0 &&
            res.data.product.productStock !== 0
          ) {
            toast.success("out of stock product is now available");
            dispatch(
              updateItem({
                ...res.data.product,
                quantity: 1,
              })
            );
          } else {
            dispatch(
              updateItem({
                ...res.data.product,
                quantity: cart[idx].quantity,
              })
            );
          }
        } else if (res.error) {
          if (res.error.data.message === "Product Not Found!") {
            toast.error(res.error.data.message);
            dispatch(removeItem(item._id));
          } else {
            toast.error(res.error.data.message);
          }
        }
      });

      // createing option for select tag
      let outerArray = [];
      cart.map(async (item, j) => {
        const res = await getSingleProductAdmin(item._id);
        if (res.data.product.productStock === 0) {
          outerArray.push(
            <option key={j} value={0}>
              {"OUT OF STOCK"}
            </option>
          );
        } else {
          let innerArray = [];
          for (let i = 0; i < res.data.product.productStock; i++) {
            innerArray.push(
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            );
          }
          outerArray.push(innerArray);
          // console.log(outerArray[0].props.value);
        }
      });

      // saveing the options for later use
      setSelectOption(outerArray);
    }
    dispatch(filterProduct({ categoryProduct: "All" }));
  }, [render]);

  useEffect(() => {
    //calculating the price,gst and total
    let qu = 0;
    let sub = 0;
    let gs = 0;
    let tot = 0;
    cart.forEach((item) => {
      qu += item.quantity;
      tot += item.productPrice * item.quantity;
    });

    setQuant(qu);
    setTotal(tot);
    gs = (tot / 100) * 28;
    setGst(gs);
    sub = tot + gs;
    setSubTotal(sub);
  }, [cart]);

  //item remove function
  const remove = (_id) => {
    dispatch(removeItem(_id));
    toast.success("Item removed successfully");
    setRender(!render);
  };

  //quantity update function
  const update = async (_id, value) => {
    const id = _id;
    const res = await getSingleProductAdmin(id);
    if (res.error) {
      if (res.error.data.message === "Product Not Found!") {
        dispatch(removeItem(_id));
        toast.error(res.error.data.message);
      } else {
        toast.error(res.error.data.message);
      }
    } else {
      dispatch(updateItem({ ...res.data.product, quantity: value }));
      setRender(!render);
    }
  };

  //payment method
  const Proceed_to_payment = async () => {
    let errorCount = 0;
    if (address.length === 0) {
      toast.error("please add an delivery address first!");
      setRender(!render);
      errorCount++;
      return;
    }
    const promises = cart.map(async (items) => {
      const res = await getSingleProductAdmin(items._id);
      if (res.data) {
        if (items.quantity === 0) {
          toast.error("please remove the out of stock item from the cart");
          errorCount++;
          setRender(!render);
          return;
        } else if (res.data.product.productStock - items.quantity < 0) {
          errorCount++;
          setRender(!render);
          return;
        }
      } else if (res.error) {
        if (res.error.data.message === "Product Not Found!") {
          dispatch(removeItem(items._id));
          toast.error(res.error.data.message);
          errorCount++;
          setRender(!render);
          return;
        } else {
          toast.error(res.error.data.message);
          errorCount++;
          setRender(!render);
          return;
        }
      }
    });
    await Promise.all(promises);

    if (errorCount === 0) {
      dispatch(
        userUpdate({ success: true, user, update: false, payment: true })
      );
      navigate("/checkout");
    }
  };

  return cart.length === 0 ? (
    <div className="flex justify-center items-center flex-col mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24 bg-[#EAEDED] p-5">
      {isLoading && <Loading />} <img src={emptyCart} alt={`${emptyCart}`} />{" "}
      <p className="text-rose-700 text-3xl">EmptyCart</p>{" "}
    </div>
  ) : (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24 bg-[#EAEDED] p-5 tabletSmall:grid grid-cols-[60%,38%] gap-5">
      <div>
        <div className="w-full bg-[#ffffff] shadow-productcard px-5 pt-3 text-2xl font-semibold font-header">
          Shopping Cart
          <hr className="mt-3" />
        </div>
        {cart.map((item, idx) => (
          <div key={item._id} className="bg-[#ffffff]">
            {isLoading && <Loading />}
            <div className="grid grid-cols-[40%,40%,20%] bg-[#ffffff] px-5">
              <div className="h-52 flex justify-center items-center">
                <img
                  src={item.images[0].url}
                  alt="product"
                  className="w-32 max-h-48"
                />
              </div>

              <div className="pt-5 px-2">
                <p className="text-xs font-header font-semibold mb-5">
                  {item.productName.substring(0, 50) + "..."}
                </p>

                <div className="bg-[#ffffff] shadow-productcard hover:shadow-searchbar  w-fit flex p-1 border hover:border-black rounded-lg text-xs mt-2 mb-5">
                  <p>{item.quantity === 0 ? "" : "Qty:"}</p>
                  <select
                    value={item.quantity}
                    className="bg-transparent outline-none font-header font-semibold"
                    style={{
                      color: item.quantity === 0 ? "red" : "black",
                    }}
                    onChange={(e) => {
                      update(item._id, Number(e.target.value));
                    }}
                  >
                    {selectOption[idx]}
                  </select>
                </div>

                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    remove(item._id);
                  }}
                >
                  Delete
                </Button>
              </div>

              <div className="pt-5 pr-1">
                <p className="font-header text-sm text-end">Price</p>
                <p className="font-header text-end font-semibold">{`₹${
                  item.productPrice * item.quantity
                }`}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <hr className="w-[95%]" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#ffffff] h-fit mt-5 p-5 flex flex-col gap-5 tabletSmall:mt-0">
        <p className="text-green-500 h-7 flex items-center text-sm">
          <CheckCircleOutlineIcon fontSize="small" />
          Your order is eligible for FREE Delivery.
        </p>
        <div>
          <div className="flex justify-between">
            <p>Total({`${quant}`} items):</p>
            <p>{`₹${total.toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax(28%):</p>
            <p>{`₹${gst.toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{`₹${subTotal.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={Proceed_to_payment}
            variant="contained"
            size="small"
            style={{
              backgroundColor: "#ffdf00",
              color: "black",
              width: "16rem",
            }}
          >
            proceed to buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
