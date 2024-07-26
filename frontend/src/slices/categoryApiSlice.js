import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query(body) {
        return {
          url: `${CATEGORY_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query({
      query: (page = 1) => ({
        url: `${CATEGORY_URL}?page=${page}`,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (Id) => ({ url: `${CATEGORY_URL}/${Id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
