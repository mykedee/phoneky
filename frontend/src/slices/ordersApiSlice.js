import { apiSlice } from "./apiSlice";
import {
  ORDERS_URL,
  PAYSTACK_URL,
  LOCATION_URL,
} from "../constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payStackUrl: builder.mutation({
      query(body) {
        return {
          url: `${PAYSTACK_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),

    getOrders: builder.query({
      query: (page = 1) => ({
        url: `${ORDERS_URL}?page=${page}`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    getLocation: builder.query({
      query: () => ({
        url: `${LOCATION_URL}`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useGetOrdersQuery,
  useGetLocationQuery,
  usePayStackUrlMutation,
} = orderApiSlice;
