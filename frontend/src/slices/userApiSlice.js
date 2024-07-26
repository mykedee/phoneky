import { apiSlice } from "./apiSlice";
import {
  LOGIN_URL,
  LOGOUT_URL,
  PROFILE_URL,
  UPDATE_USERDETAILS_URL,
  
} from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({ url: `${PROFILE_URL}` }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  
    updateUserDetails: builder.mutation({
      query: ({ updateDetails }) => ({
        url: `${UPDATE_USERDETAILS_URL}`,
        method: "PUT",
        body: updateDetails,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query(body) {
        return {
          url: `${LOGIN_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Login"],
    }),

  
    logout: builder.mutation({
      query() {
        return {
          url: `${LOGOUT_URL}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Logout"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateUserDetailsMutation,
} = userApiSlice;
