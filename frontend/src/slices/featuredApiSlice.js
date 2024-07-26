import { apiSlice } from "./apiSlice";
import { FEATURED_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatured: builder.query({
      query: () => ({
        url: FEATURED_URL,
      }),
      providesTags: ["Featured"],
      keepUnusedDataFor: 5,
    }),

    createFeatured: builder.mutation({
      query(body) {
        return {
          url: `${FEATURED_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Featured"],
    }),
  }),
});

export const { useGetFeaturedQuery, useCreateFeaturedMutation } =
  productApiSlice;
