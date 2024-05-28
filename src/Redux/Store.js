import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./Api/ProductApi";
import { ProductSlice } from "./Reducers/ProductSlice";
import { CartSlice } from "./Reducers/CartSlice";
import { userApi } from "./Api/UserApi";
import { userSlice } from "./Reducers/UserSlice";
import { AddressSlice } from "./Reducers/AddressSlice";
import { AdminApi } from "./Api/AdminApi";
import { RenderSlice } from "./Reducers/RenderSlice";
import { ProductStoreSlice } from "./Reducers/ProductStoreSlice";
import { ProductFilterSlice } from "./Reducers/ProductFilterSlice";

export const store = configureStore({
  reducer: {
    productApi: productApi.reducer,
    userApi: userApi.reducer,
    AdminApi: AdminApi.reducer,
    ProductSlice: ProductSlice.reducer,
    CartSlice: CartSlice.reducer,
    userSlice: userSlice.reducer,
    AddressSlice: AddressSlice.reducer,
    RenderSlice: RenderSlice.reducer,
    ProductStoreSlice: ProductStoreSlice.reducer,
    ProductFilterSlice: ProductFilterSlice.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    productApi.middleware,
    userApi.middleware,
    AdminApi.middleware,
  ],
});
