import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (user) => ({
        url: "user/signup",
        method: "POST",
        body: user,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: () => "user/me",
    }),
    getUserDetailsMut: builder.mutation({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
    }),
    phoneNumberVarify: builder.mutation({
      query: (phoneno) => ({
        url: "user/mobileauth",
        method: "POST",
        body: phoneno,
      }),
    }),
    phoneOTPSend: builder.mutation({
      query: (phoneno) => ({
        url: "/user/mobileauth/forgot/password",
        method: "POST",
        body: phoneno,
      }),
    }),
    phoneNumberOtpVarify: builder.mutation({
      query: (data) => ({
        url: "user/mobilevarify",
        method: "POST",
        body: data,
      }),
    }),
    emailOtp: builder.mutation({
      query: (email) => ({
        url: "user/sendotpemail",
        method: "POST",
        body: email,
      }),
    }),
    emailVarify: builder.mutation({
      query: (data) => ({
        url: "user/emailvarify",
        method: "POST",
        body: data,
      }),
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "user/address",
        method: "POST",
        body: data,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/delete/${id}`,
        method: "DELETE",
      }),
    }),
    AddressDetails: builder.mutation({
      query: (id) => ({
        url: `user/address/details/${id}`,
        method: "GET",
      }),
    }),
    AddressUpdate: builder.mutation({
      query: (data) => ({
        url: "user/address/update",
        method: "PUT",
        body: data,
      }),
    }),
    AvtarUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/me/update/avtar",
        method: "PUT",
        body: data,
      }),
    }),
    nameUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/me/update/username",
        method: "PUT",
        body: data,
      }),
    }),
    emailUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/me/update/email",
        method: "PUT",
        body: data,
      }),
    }),
    phoneUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/me/update/phone",
        method: "PUT",
        body: data,
      }),
    }),
    passwordUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/me/update/password",
        method: "PUT",
        body: data,
      }),
    }),
    passwordForgot: builder.mutation({
      query: (data) => ({
        url: "/user/me/forgot/password",
        method: "PUT",
        body: data,
      }),
    }),
    paymentMut: builder.mutation({
      query: (data) => ({
        url: "/user/me/payment",
        method: "POST",
        body: data,
      }),
    }),
    paymentSuccessMut: builder.mutation({
      query: ({ cart, id }) => ({
        url: `/user/me/paymentstatus/${id}`,
        method: "POST",
        body: { cart },
      }),
    }),
    defaultAddressUpdateMut: builder.mutation({
      query: (data) => ({
        url: "/user/me/defaultAddressUpdate",
        method: "PUT",
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/admin/product/add",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: () => "/user/me/Orders",
    }),
    getSingleOrders: builder.query({
      query: (data) => `/user/me/Orders/${data.id1}/${data.id2}`,
      providesTags: ["SingleProduct"],
    }),
    getSingleOrdersMut: builder.mutation({
      query: (data) => ({
        url: `/user/me/Orders/${data.id1}/${data.id2}`,
        method: "GET",
      }),
    }),
    AddRating: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/me/rating/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    cancleOrderReq: builder.mutation({
      query: (data) => ({
        url: `/user/me/orders/cancel/${data.id1}/${data.id2}`,
        method: "GET",
      }),
      invalidatesTags: ["SingleProduct"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useGetUserDetailsQuery,
  usePhoneNumberVarifyMutation,
  usePhoneOTPSendMutation,
  usePhoneNumberOtpVarifyMutation,
  useUserLoginMutation,
  useEmailOtpMutation,
  useEmailVarifyMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useAddressDetailsMutation,
  useAddressUpdateMutation,
  useGetUserDetailsMutMutation,
  useNameUpdateMutation,
  useEmailUpdateMutation,
  usePhoneUpdateMutation,
  usePasswordUpdateMutation,
  usePasswordForgotMutation,
  usePaymentMutMutation,
  usePaymentSuccessMutMutation,
  useDefaultAddressUpdateMutMutation,
  useAddProductMutation,
  useGetAllOrdersQuery,
  useGetSingleOrdersQuery,
  useGetSingleOrdersMutMutation,
  useAvtarUpdateMutation,
  useAddRatingMutation,
  useCancleOrderReqMutation,
} = userApi;

//
