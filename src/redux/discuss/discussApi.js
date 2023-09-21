import apiSlice from "../api/apiSlice";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `/comments/create-comment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    getAllComment: builder.query({
      query: ({ page, limit, sortOrder }) =>
        `/comments?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
      providesTags: ["test-yourself"],
    }),
    getSingleComment: builder.query({
      query: (id) => `/comments/${id}`,
      providesTags: ["test-yourself"],
    }),
    deleteComment: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/comments/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["test-yourself"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentQuery,
  useGetSingleCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
