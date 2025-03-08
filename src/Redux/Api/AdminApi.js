import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminApi = createApi({
  reducerPath: "AdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => ({
        url: "/admin/users/all",
        method: "GET",
      }),
    }),
    getSingleUsers: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `/admin/users/update`,
        method: "post",
        body: data,
      }),
    }),
    getAllOrdersAdmin: builder.mutation({
      query: () => ({
        url: "/admin/orders/all",
        method: "GET",
      }),
    }),
    updateOrderAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/orders/update",
        method: "POST",
        body: data,
      }),
    }),
    getAllProductAdmin: builder.mutation({
      query: () => ({
        url: "/admin/product/all",
        method: "GET",
      }),
    }),
    getSingleProductAdmin: builder.mutation({
      query: (id) => ({
        url: `admin/product/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/admin/product/update",
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/admin/product/delete/${_id}`,
        method: "DELETE",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getStats: builder.mutation({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
    }),
    getPieChart: builder.mutation({
      query: () => ({
        url: "/admin/piechart",
        method: "GET",
      }),
    }),
    BestSeller: builder.mutation({
      query: () => ({
        url: "/admin/product/mostsell",
        method: "GET",
      }),
    }),
    NewReleases: builder.mutation({
      query: () => ({
        url: "/admin/product/latest",
        method: "GET",
      }),
    }),
    MensProduct: builder.mutation({
      query: () => ({
        url: "/admin/product/mensproduct",
        method: "GET",
      }),
    }),
    WomensProduct: builder.mutation({
      query: () => ({
        url: "/admin/product/womensproduct",
        method: "GET",
      }),
    }),
    cancelOrder: builder.mutation({
      query: () => ({
        url: "/admin/cancel",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useGetAllOrdersAdminMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductAdminMutation,
  useGetSingleProductAdminMutation,
  useUpdateUserDetailsMutation,
  useGetSingleUsersMutation,
  useUpdateOrderAdminMutation,
  useDeleteUserMutation,
  useGetStatsMutation,
  useGetPieChartMutation,
  useBestSellerMutation,
  useNewReleasesMutation,
  useMensProductMutation,
  useWomensProductMutation,
  useCancelOrderMutation,
} = AdminApi;
