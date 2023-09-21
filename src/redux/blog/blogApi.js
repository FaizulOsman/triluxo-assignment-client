import apiSlice from "../api/apiSlice";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/blogs/create-blog`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllBlog: builder.query({
      query: ({ headers }) => ({
        url: `/blogs`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
