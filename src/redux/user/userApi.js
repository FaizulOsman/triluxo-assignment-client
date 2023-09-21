import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ headers }) => ({
        url: `/users`,
        headers: headers,
      }),
    }),
    getAllUsersByQuery: builder.query({
      query: ({ headers, limit, page, sortOrder }) => ({
        url: `/users?limit=${limit}&page=${page}&sortOrder=${sortOrder}`,
        headers: headers,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: headers,
      }),
    }),
    getMyProfile: builder.query({
      query: ({ headers }) => ({
        url: `/users/my-profile`,
        headers: headers,
      }),
    }),
    updateMyProfile: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/users/my-profile`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useGetAllUsersByQueryQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
