import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductStore } from "../../Redux/Reducers/ProductSlice";
import { addToCart } from "../../Redux/Reducers/CartSlice";
import Hart from "../../Hart";
import toast from "react-hot-toast";
import ImageStack from "./ImageStack";
import { useGetSingleProductAdminMutation } from "../../Redux/Api/AdminApi";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { useAddRatingMutation } from "../../Redux/Api/UserApi";
const SingleProduct = () => {
  const { cart } = useSelector((State) => State.CartSlice);
  const { _id } = useSelector((State) => State.userSlice.user);
  const myref = useRef();

  const dispatch = useDispatch();
  const { id } = useParams();

  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState("IN STOCK");
  const [product, setProduct] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [addRating, setAddRating] = useState(0);
  const [review, setReview] = useState("");

  const [getSingleProductAdmin, { isLoading }] =
    useGetSingleProductAdminMutation();

  const [AddRating, { isLoading: Load }] = useAddRatingMutation();

  useEffect(() => {
    const func = async () => {
      const res = await getSingleProductAdmin(id);
      if (res.data) {
        dispatch(SingleProductStore({ product: { ...res.data.product } }));
        const userrating = res.data.product.rating.reviews.find(
          (item) => item.userId === _id
        );

        if (userrating) {
          setAddRating(userrating.rating);
          setReview(userrating.message);
        }
        setProduct(res.data.product);
        if (res.data.product.productStock > 0) {
          let Cartitem = null;
          cart.forEach((item) => {
            if (item._id === res.data.product._id) {
              Cartitem = item;
            }
          });
          if (!Cartitem) {
            setMessages("IN STOCK");
            setDisable(false);
          } else {
            if (res.data.product.productStock - Cartitem.quantity === 0) {
              setMessages(
                "YOU HAVE REACHED THE MAXIMUM STOCK LIMIT OF " +
                  res.data.product.productStock
              );
              setDisable(true);
            }
          }
        } else {
          setMessages("OUT OF STOCK");
          setDisable(true);
        }
      }
    };
    func();
  }, [id]);

  const addToCartHandler = async () => {
    const res = await getSingleProductAdmin(id);
    if (res.data) {
      setProduct(res.data.product);
      if (res.data.product.productStock > 0) {
        let Cartitem = null;
        cart.forEach((item) => {
          if (item._id === res.data.product._id) {
            Cartitem = item;
          }
        });
        if (!Cartitem) {
          dispatch(addToCart({ ...product, quantity: 1 }));
          setMessages("IN STOCK");
          setDisable(false);
        } else {
          if (res.data.product.productStock - Cartitem.quantity === 0) {
            setMessages(
              "YOU HAVE REACHED THE MAXIMUM STOCK LIMIT OF " +
                res.data.product.productStock
            );
            setDisable(true);
          } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
            toast.success("added to cart");
            setMessages("IN STOCK");
            setDisable(false);
          }
        }
      } else {
        setMessages("OUT OF STOCK");
        toast.error("OUT OF STOCK");
        setDisable(true);
      }
    }
  };
  const submitReview = async (e) => {
    e.preventDefault();
    if (addRating === 0 || review === "") {
      toast.error("Please fill all the fields");
      return;
    } else {
      const res = await AddRating({ id, data: { review, addRating } });
      if (res.data) {
        toast.success(res.data.message);
        setShowReview(false);
        dispatch(SingleProductStore({ product: { ...res.data.product } }));
        setProduct(res.data.product);
      } else {
        toast.error(res.error.data.message);
        setShowReview(false);
      }
    }
  };

  const fun = (e) => {
    if (e.target.contains(myref.current)) {
      setShowReview(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", fun);
    return () => {
      document.body.removeEventListener("click", fun);
    };
  });
  return (
    <div className="mt-36 mb-8 h-fit w-full overflow-hidden phoneLarge:mt-24 text-black">
      {(isLoading || Load) && <Loading />}
      {product && (
        <div className="block tabletSmall:grid grid-cols-2">
          <div className="p-5  relative">
            <ImageStack images={product.images} />
            <div className="absolute right-5 top-5 ">
              <Hart />
            </div>
          </div>

          <div className="h-full w-full p-5 text-black">
            <p className="text-xl font-header font-semibold">
              {product.productName}
            </p>
            <p className="text-sm font-bottom pt-2 font-medium">
              {product.productDiscription}
            </p>
            <div className="flex h-10 items-center ">
              <Rating
                name="controlled-rating"
                value={product.rating.rate}
                precision={0.5}
                size="large"
                readOnly
              />
              <p className="ml-2">{`${product.rating.count} Reviews`}</p>
            </div>
            <p className="font-header text-lg mb-5">{`Price : ₹${product.productPrice}`}</p>

            <Button
              variant="outlined"
              size="large"
              style={{ marginRight: "20px" }}
              endIcon={<ShoppingCartIcon />}
              onClick={addToCartHandler}
              disabled={disable}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              size="large"
              endIcon={<RateReviewIcon />}
              onClick={() => {
                setShowReview(true);
              }}
            >
              Add Review
            </Button>
            {messages === "OUT OF STOCK" && (
              <div className="font-bottom text-red-500 font-medium mt-5">
                {messages}
              </div>
            )}
            {messages === "IN STOCK" && (
              <div className="font-bottom text-green-500 font-medium mt-5">
                {messages}
              </div>
            )}
            {messages !== "IN STOCK" && messages !== "OUT OF STOCK" && (
              <div className="font-bottom text-yellow-500 font-medium mt-5">
                {messages}
              </div>
            )}
          </div>

          {/* review part */}
          {showReview && (
            <div className="fixed top-0 left-0 bg-gray-800/30 w-screen h-screen flex justify-center items-center z-50">
              <div
                ref={myref}
                className="bg-[#fff] w-96 h-80 p-3 flex flex-col gap-2 rounded-lg shadow-admin"
              >
                <h1 className="text-xl font-header font-bold text-gray-800">
                  ADD REVIEW
                </h1>
                <div className="flex gap-5 items-center">
                  <Rating
                    precision={0.5}
                    size="large"
                    className="scale-110"
                    value={addRating}
                    onChange={(e) => {
                      setAddRating(Number(e.target.value));
                    }}
                  />
                  <p className="font-bottom text-lg">{addRating}</p>
                </div>
                <form>
                  <textarea
                    className="w-full h-full border border-gray-600 outline-none p-3 rounded focus:shadow-inputbox mt-2"
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                  />
                  <div className="flex gap-5 mt-4">
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<DoneIcon />}
                      onClick={submitReview}
                    >
                      save
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ClearIcon />}
                      onClick={() => {
                        setShowReview(false);
                        setAddRating(0);
                        setReview("");
                      }}
                    >
                      cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
