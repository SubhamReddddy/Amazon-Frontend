import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "admin/product/all",
    }),
    getSingleProduct: builder.query({
      query: (id) => `admin/product/${id}`,
    }),
    getProductsByCategory: builder.query({
      query: (productCategories) =>
        `/admin/product/category/${productCategories}`,
    }),
    getAllProductAdminFiltered: builder.mutation({
      query: ({ categoryProduct, search, currentPage, price }) => {
        let basequery = `/admin/product/filter?currentPage=${currentPage}&productCategories=`;
        if (categoryProduct !== "All") {
          basequery = basequery + categoryProduct;
        }
        if (search !== "") {
          basequery = basequery + `&search=${search}`;
        }
        if (price < 100000) {
          basequery = basequery + `&less=${price}`;
        }
        return {
          url: basequery,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
  useGetAllProductAdminFilteredMutation,
} = productApi;
