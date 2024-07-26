import { apiSlice } from "./apiSlice";
import {
  FEATURED_PRODUCTS_URL,
  PRODUCTS_URL,
  RELATED_PRODUCTS_URL,
} from "../constants";


const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query(body) {
        return {
          url: `${PRODUCTS_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: ({ keyword, page = 1 }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          page,
        },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    getFeaturedProducts: builder.query({
      query: () => ({
        url: `${FEATURED_PRODUCTS_URL}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    
    getProductDetails: builder.query({
      query: (slug) => ({ url: `${PRODUCTS_URL}/${slug}` }),
      keepUnusedDataFor: 5,
    }),
    getRelatedProducts: builder.query({
      query: (Id) => ({ url: `${RELATED_PRODUCTS_URL}/${Id}` }),
      keepUnusedDataFor: 5,
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    setFeaturedProduct: builder.mutation({
      query: (Id) => ({
        url: `${PRODUCTS_URL}/featured/${Id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    setUnFeaturedProduct: builder.mutation({
      query: (Id) => ({
        url: `${PRODUCTS_URL}/unfeatured/${Id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (Id) => ({ url: `${PRODUCTS_URL}/${Id}`, method: "DELETE" }),
    }),
  }),
});


export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useSetFeaturedProductMutation,
  useSetUnFeaturedProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
