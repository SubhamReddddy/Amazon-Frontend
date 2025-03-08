import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import SignUp from "./Pages/User/SingUp";
import Home from "./Pages/User/Home";
import ProductDetailsPage from "./Pages/User/ProductDetailsPage";
import CartItems from "./Components/Cart/CartItems";
import SignIn from "./Pages/User/SignIn";
import { useGetUserDetailsMutMutation } from "./Redux/Api/UserApi";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./Redux/Reducers/UserSlice";
import { Toaster } from "react-hot-toast";
import NotFound from "./Components/Loader/NotFound";
import UserAdress from "./Pages/User/UserAdress";
import UserAccount from "./Pages/User/UserAccount";
import AddUserAddress from "./Pages/User/AddUserAddress";
import UpdateUserAddress from "./Pages/User/UpdateUserAddress";
import UserProfile from "./Pages/User/UserProfile";
import UserNameUpdate from "./Pages/User/UserNameUpdate";
import EmailUpdate from "./Pages/User/EmailUpdate";
import PhoneNoUpdate from "./Pages/User/PhoneNoUpdate";
import PasswordChange from "./Pages/User/PasswordChange";
import ForgotPassword from "./Pages/User/ForgotPassword";
import { addAddress } from "./Redux/Reducers/AddressSlice";
import CheckOutPage from "./Pages/User/CheckOutPage";
import PaymentSuccessPage from "./Pages/User/PaymentSuccessPage";
import AdminRoute from "./Components/Admin/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProductPage from "./Pages/Admin/AdminProductPage";
import AdminProductAddPage from "./Pages/Admin/AdminProductAddPage";
import OrdersPage from "./Pages/User/OrdersPage";
import SingleOrderPage from "./Pages/User/SingleOrderPage";
import AdminUserPage from "./Pages/Admin/AdminUserPage";
import AdminOrder from "./Pages/Admin/AdminOrder";
import AdminProductManagePage from "./Pages/Admin/AdminProductManagePage";
import AdminUserManage from "./Pages/Admin/AdminUserManage";
import AdminOrderManage from "./Pages/Admin/AdminOrderManage";
import UserRoute from "./Components/UserAccount/UserRoute";
import Barchat from "./Pages/Admin/Barchart";
import PieChart from "./Pages/Admin/PieChart";
import LineChart from "./Pages/Admin/LineChart";
import ServiceComingSoon from "./Pages/User/ServiceComingSoon";
import AllProductWithFilter from "./Pages/User/AllProductWithFilter";
import MensProductPage from "./Pages/User/MensProductPage";
import WomensProductpage from "./Pages/User/WomensProductpage";
import BestSellerProductPage from "./Pages/User/BestSellerProductPage";
import NewProductsPage from "./Pages/User/NewProductsPage";
import WishList from "./Pages/User/WishList";
import CancelOrderData from "./Pages/Admin/CancelOrderData";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Common Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/servicecomingsoon" element={<ServiceComingSoon />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="*" element={<NotFound />} />

      {/* User Routes */}
      <Route element={<UserRoute />}>
        <Route index element={<Home />} />
        <Route path="/me/account" element={<UserAccount />} />
        <Route path="/me/account/profile" element={<UserProfile />} />
        <Route path="/me/account/orders" element={<OrdersPage />} />
        <Route path="/me/products/wishlist" element={<WishList />} />
        <Route
          path="/product/category/mensfashion"
          element={<MensProductPage />}
        />
        <Route
          path="/product/category/womensfashion"
          element={<WomensProductpage />}
        />
        <Route
          path="/product/category/bestsellers"
          element={<BestSellerProductPage />}
        />
        <Route
          path="/product/category/newreleases"
          element={<NewProductsPage />}
        />
        <Route
          path="/me/account/orders/:id1/:id2"
          element={<SingleOrderPage />}
        />
        <Route
          path="/me/account/profile/update/name"
          element={<UserNameUpdate />}
        />
        <Route
          path="/me/account/profile/update/email"
          element={<EmailUpdate />}
        />
        <Route
          path="/me/account/profile/update/phone"
          element={<PhoneNoUpdate />}
        />
        <Route
          path="/me/account/profile/update/password"
          element={<PasswordChange />}
        />
        <Route path="/me/account/address" element={<UserAdress />} />
        <Route path="/me/account/address/add" element={<AddUserAddress />} />
        <Route path="/product/cart" element={<CartItems />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route
          path="/me/account/address/update/:id"
          element={<UpdateUserAddress />}
        />
        <Route path="/products" element={<AllProductWithFilter />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>

      {/* Admin Routes  */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProductPage />} />
        <Route path="/admin/product/add" element={<AdminProductAddPage />} />
        <Route path="/admin/customers" element={<AdminUserPage />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
        <Route path="/admin/barchart" element={<Barchat />} />
        <Route path="/admin/piechart" element={<PieChart />} />
        <Route path="/admin/linechart" element={<LineChart />} />
        <Route path="/admin/ordercancel" element={<CancelOrderData />} />
        <Route
          path="/admin/products/:id"
          element={<AdminProductManagePage />}
        />
        <Route path="/admin/customers/:id" element={<AdminUserManage />} />
        <Route path="/admin/orders/:id1/:id2" element={<AdminOrderManage />} />
      </Route>
    </Route>
  )
);
function App() {
  const [getUserDetailsMut] = useGetUserDetailsMutMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await getUserDetailsMut();
      if (res.data) {
        dispatch(getUserDetails(res.data.user));
      }
    })();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/me/address`,
          {
            withCredentials: true,
          }
        );
        if (res.data.address) {
          dispatch(addAddress({ sucess: true, address: res.data.address }));
        }
      } catch (error) {
        if (error.response.data.message !== "Please add a delivery address !")
          toast.error(error.response.data.message);
      }
    };
    getAddress();
  }, []);
  return (
    <div className="overflow-hidden">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
